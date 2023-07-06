import React, {useState} from 'react';
import {Breadcrumb, Button, Card, Col, Divider, Form, message, Row, Space} from 'antd';
import {HomeOutlined, MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {useForm} from 'antd/es/form/Form';
import BasicInfo from "@/pages/TableManager/BasicInfo";
import FileUpload from "@/components/FileUpload";
import ColumnInfo from "@/pages/DataImport/Column";
import {createDataImportTableUsingPOST} from "@/services/bigdata/table";

const DataImport: React.FC = () => {
  const dataImportForm = useForm<API.DataImportTableCreateRequest>()[0];
  const [filePath, setFilePath] = useState<string>("");
  const [disable, setDisable] = useState(true)
  const handlerSubmit = (value: API.DataImportTableCreateRequest) => {
    setDisable(true)
    console.info(value)
    if(filePath){
      createDataImportTableUsingPOST({
        ...value,
        fileUrl: filePath
      }).then(x => {
        console.info(x)
        if (x > 0) {
          message.success("创建成功")
          history.back()
        }
      }).catch(reason => {
        if (reason instanceof Error){
          message.error(reason)
        }
      }).finally(()=>setDisable(false))
    }else{
      message.error("请上传数据文件")
    }

  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          <HomeOutlined/>
        </Breadcrumb.Item>
        <Breadcrumb.Item href={'/tableManager'}>表管理</Breadcrumb.Item>
        <Breadcrumb.Item>导入文件数据表</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Form form={dataImportForm} onFinish={handlerSubmit} name={'dataImportForm'} layout={"vertical"}
        >
          <Divider/>
          <BasicInfo/>
          <Divider/>
          <Card title={"数据文件"}>
            <FileUpload accept={".csv"} chunkSize={1024 * 1024} setFilePath={setFilePath} setDisable={setDisable}/>
          </Card>
          <Divider/>
          <Card title={"数据列"}>
            <Form.List name="tableColumns">
              {(fields, {add, remove}) => (
                <>
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                      icon={<PlusOutlined/>}
                    >
                      添加列
                    </Button>
                  </Form.Item>
                  <Row>
                    {fields.map(({key, name, ...restField}) => {
                      return (
                        <Col span={24}>
                          <Space
                            key={key}
                            style={{display: 'flex', marginBottom: 8}}
                            align="baseline"
                          >
                            <ColumnInfo key={key} name={name}/>
                            <MinusCircleOutlined onClick={() => remove(name)}/>
                          </Space>
                        </Col>
                      );
                    })}
                  </Row>
                </>
              )}
            </Form.List>

          </Card>
          <Form.Item>
            <Button disabled={disable} type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>

          <Divider/>
        </Form>
      </Card>
    </div>
  );
};
export default DataImport;
