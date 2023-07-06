import {Button, Card, Col, Divider, message, Popconfirm, Row, Space, Steps} from "antd";
import moment from "moment";
import {Link} from "@umijs/preset-dumi/lib/theme";
import {LoadingOutlined} from "@ant-design/icons";
import {fileDownloadUsingGET} from "@/services/bigdata/file";
import {offLineUsingDELETE} from "@/services/bigdata/bus";
import React, {useState} from "react";

const {Step} = Steps;

type ItemProps={
  value:API.BusResponse,
  queryData:Function
}
const Item:React.FC<ItemProps> = (props) => {
  const [process,setProcess]=useState<boolean>(false)
  return (
    <Card
      hoverable
      title={
        <Space>
          {props.value.busName}
        </Space>
      }

    >
      <Row>
        <Col span={24}>

          <div style={{wordBreak: 'break-all', height: '10vh'}}>{props.value.busDescription}</div>
        </Col>

        <Divider/>
        <Col span={18}>
          <Space size={"large"}>
            <div>采用模型:<p>{props.value.modelInfo?.modelName}</p></div>
            <div>运行起始时间:<p>{moment(props.value.busCreateTime).format("yyyy-MM-DD HH:mm:ss")}</p></div>
            <div>访问链接:<p><Link to={props.value.busUri+"/"+props.value.busId}>{props.value.busUri+"/"+props.value.busId}</Link></p></div>
          </Space>

        </Col>
        <Col span={6} style={{alignItems:"flex-end"}}>
          <Space>
            <Button icon={process&&(<><LoadingOutlined/>处理中</>)} disabled={process} onClick={()=>{
              setProcess(true)
              fileDownloadUsingGET({filePath:props.value.deployFilePath||""}).then(x=>{
                const link=document.createElement("a");
                link.style.display='none';
                link.href=URL.createObjectURL(new Blob([x]));
                document.body.appendChild(link);
                link.download="deploy.zip"
                link.click();
                URL.revokeObjectURL(link.href);
                document.body.removeChild(link);
                setProcess(false)
              })
            }}>下载独立部署包</Button>
            <Popconfirm
              title="确定要下线该业务吗？"
              onConfirm={()=>{offLineUsingDELETE({busId:props.value.busId||0}).then(x=>{if(x>0)message.success("下线成功!");props.queryData();})}}
              okText="确定"
              cancelText="取消"
            >
              <Button  danger>下线</Button>
            </Popconfirm>
          </Space>
        </Col>

        <Divider/>
        <Col span={24}>
          <Steps direction="horizontal">
            <Step title={"数据输入"}/>
            {props.value.blood?.map((x:API.Blood)=><Step title={<Space><div>{x.tableSchema&&x.task&&x.tableSchema.tableName+":"+x.task.taskType+":"+x.task.taskState}</div><div>{x.task&&x.task.batchResponse&&<a target={"_blank"} href={"http://node1:8999/ui/batch/"+x.task.batchResponse.id+"/log"}>日志</a>}</div></Space>} status={(x.task&&(x.task?.taskState!="killed"&&x.task?.taskState!="dead"&&x.task?.taskState!="error"&&x.task?.taskState!="idle")?"process":"error")} icon={(x.task?.taskState!="killed"&&x.task?.taskState!="dead"&&x.task?.taskState!="error"&&x.task?.taskState!="idle")&&<LoadingOutlined/>} />)}
            <Step status={props.value.busState=="running"||props.value.busState=='starting'?'process':'error'} title={<Space><div>{props.value.modelInfo&&props.value.modelInfo.modelName+":"+props.value.busState}</div></Space>}  icon={props.value.busState!="error"&&<LoadingOutlined/>}/>
            <Step status={"process"} title={"数据输出"}/>
          </Steps>
        </Col>

      </Row>
    </Card>
  )
}
export default Item;
