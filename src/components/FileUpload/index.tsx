import {Alert, Button, Col, Input, message, Progress, Row, Space, Spin} from "antd";
import React, {MutableRefObject, useRef, useState} from "react";
import SparkMD5 from "spark-md5"
import {checkChunkUsingGET, mergeFileUsingPOST} from "@/services/bigdata/file";
import {uploadChunkUsingPOST} from "@/services/FileUpload";

type FileUploadProps = {
  chunkSize: number
  setFilePath: Function
  setDisable: Function
  accept:string
}
const FileUpload: React.FC<FileUploadProps> = (props) => {

  const fileInput: MutableRefObject<any> = useRef()
  const [completeFile, setCompleteFile] = useState<number>(0)
  const [totalChunk, setTotalChunk] = useState<number>(1)
  const [fileInputDisabled, setFileInputDisabled] = useState<boolean>(false)
  const [stateMessage, setStateMessage] = useState<string>("分片处理中")
  const [filePath,setFilePath]=useState<string>("")
  const fileMD5 = (file: File) => {
    let fileChunks: any[] = []
    return new Promise<any>(((resolve, reject) => {
        setStateMessage("分片处理中")
        let fileHash = ""
        let blobSlice = File.prototype.slice,
          chunks = Math.ceil(file.size / props.chunkSize),
          currentChunk = 0,
          spark = new SparkMD5(),
          fileReader = new FileReader();

        fileReader.onload = (e) => {
          if (e.target && typeof e.target.result === "string") {
            spark.appendBinary(e.target.result);
          }
          currentChunk++;
          if (currentChunk < chunks) {
            loadNext();
          } else {
            fileHash = spark.end();
            resolve({fileChunks: fileChunks, fileSize: file.size, fileHash: fileHash, chunks: chunks})
          }
        };

        fileReader.onerror = function (e) {
          console.warn('错误');
          reject(e)
        };

        function loadNext() {
          let start = currentChunk * props.chunkSize,
            end = ((start + props.chunkSize) >= file.size) ? file.size : start + props.chunkSize;
          let fileChunk = blobSlice.call(file, start, end)
          fileChunks.push({fileChunk: fileChunk, chunkSize: end - start, chunkIdx: currentChunk})
          fileReader.readAsBinaryString(fileChunk);
        }

        loadNext();
      }
    ))
  }

  const mergeFile = (md5Info: any, fileName: string) => {

    setStateMessage("文件合并中")
    mergeFileUsingPOST({
      chunks: md5Info.chunks,
      fileHash: md5Info.fileHash,
      fileName: fileName
    }).then(x => {
      props.setFilePath(x)
      setFilePath(x)
      message.success("文件上传成功:" + x)
    }).catch(reason => {
      if (reason instanceof Error) {
        message.error(reason.message)
      }
    }).finally(() => {
      setFileInputDisabled(false)
      props.setDisable(false)
    })
  }

  async function handlerUpload() {

    setFileInputDisabled(true)
    props.setDisable(true)
    let file = fileInput.current.input.files[0]
    if(!file){
      message.error("请选择文件")

      setFileInputDisabled(false)
      props.setDisable(false)
      return
    }
    console.info(file)
    let md5Info = await fileMD5(file)

    setStateMessage("文件上传中")
    if (md5Info) {
      setTotalChunk(md5Info.chunks)
      for (const chunk of md5Info.fileChunks) {
        let exist = await checkChunkUsingGET({hash: md5Info.fileHash, chunkIdx: chunk.chunkIdx})
        if (!exist) {
          let formData = new FormData()
          formData.append("fileHash", md5Info.fileHash)
          formData.append("chunk", new File([chunk.fileChunk], chunk.chunkIdx))
          formData.append("chunkSize", chunk.chunkSize)
          formData.append("chunkIdx", chunk.chunkIdx)
          let state = await uploadChunkUsingPOST(formData)
          if (state) {
            setCompleteFile((p) => p + 1)
          } else {
            setFileInputDisabled(false)
            message.error("文件上传错误")
            return
          }
        } else {
          console.info("文件片已存在，跳过")
          setCompleteFile((p) => p + 1)
        }
      }
      mergeFile(md5Info, file.name)
    }
  }

  return (
    <>
      <Row gutter={[16,16]} align={"middle"} justify={"center"}>
        <Col span={6}>
          <Spin spinning={fileInputDisabled} tip={stateMessage}>
            <Space>
              <Input accept={props.accept} multiple={false} ref={fileInput} disabled={fileInputDisabled} onChange={() => {
                setCompleteFile(0)
              }} type={"file"}/>
              <Button onClick={handlerUpload} disabled={fileInputDisabled}>上传</Button>
            </Space>
          </Spin>
          {Math.ceil((completeFile / totalChunk) )!=0&& <Progress
            width={30}
            strokeColor={{
              '0%': '#108ee9',
              "100%": '#87d068',
            }}
            percent={Math.ceil((completeFile / totalChunk) )* 100}/>}
        </Col>
        <Col span={18}>
          {filePath!=""&&<Alert  showIcon={false} message={"文件远程地址："} description={filePath} type="success" />}
        </Col>
      </Row>


    </>
  )
}
export default FileUpload;
