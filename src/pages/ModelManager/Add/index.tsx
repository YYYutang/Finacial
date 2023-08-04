import React, {useState} from 'react';
import {Breadcrumb, Button, Card, Checkbox, Col, Divider, Form, Input, message, Radio, Row} from 'antd';
import {HomeOutlined} from '@ant-design/icons';
import TableSearchSelect from "@/pages/TableManager/TableSearchSelect";
import {useForm} from "antd/es/form/Form";
import {createModelUsingPOST} from "@/services/bigdata/modelController";
import FileUpload from "@/components/FileUpload";
import ReactJson from "react-json-view";

const ModelAdd: React.FC = () => {
  console.log('in')
  const [tableInfo, setTableInfo] = useState<API.TableSchemaResponse>();
  const [filePath, setFilePath] = useState<string>()
  const [disable, setDisable] = useState<boolean>(false)
  const modelAddForm = useForm<API.ModelCreateRequest>()[0];
  const [checkedFeatureColumns, setCheckedFeatureColumns] = useState<any[]>([]);
  const [checkedLabelColumns, setCheckedLabelColumns] = useState<number>();
  const [modelExtraParams, setModelExtraParams] = useState<any>();
  const handlerSubmit = () => {
    console.info(modelAddForm.getFieldsValue())
    if(!tableInfo){
      message.error("请选择一张训练表")
      return;
    }
    if(!filePath){
      message.error("请上传模型Jar包")
      return;
    }
    if (tableInfo && modelAddForm) {
      createModelUsingPOST(
        {
          ...modelAddForm.getFieldsValue(),
          modelJar: filePath,
          modelExtraParams: modelExtraParams,
          modelTrainTableId: tableInfo.tableId,
          modelLabelId: checkedLabelColumns,
          featureColumnsId: checkedFeatureColumns
        }
      ).then(x => {
        console.info(x)
        if (x != 0) {
          history.back();
        } else {
          message.error("创建模型失败")
        }
      }).catch(
        reason => {
          if (reason instanceof Error) {
            message.error(reason.message)
          }
        }
      )
    }
  }

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          <HomeOutlined/>
        </Breadcrumb.Item>
        <Breadcrumb.Item href={'/modelManager'}>模型管理</Breadcrumb.Item>
        <Breadcrumb.Item>添加模型</Breadcrumb.Item>
      </Breadcrumb>
      <Card >
        <Form name={'modelAddForm'} layout={'vertical'} form={modelAddForm} onFinish={handlerSubmit}>
          <Form.Item name={'modelName'} label="模型名称"
                     rules={[{required: true, message: '请输入模型名称'}]}>
            <Input placeholder="请输入模型名称"/>
          </Form.Item>
          <Divider/>
          <Form.Item label="模型Jar包" tooltip={"请输入HDFS中模型Jar包路径"}>
            <FileUpload chunkSize={1024 * 1024} setFilePath={setFilePath} setDisable={setDisable} accept={".jar"}/>
          </Form.Item>
          <Form.Item name={'modelTrainClassName'} label={"训练类名(Package.ClassName)"}
                     rules={[{required: true, message: '请输入模型训练类名'}]}>
            <Input placeholder="请输入模型训练类名"/>
          </Form.Item>
          <Form.Item name={'modelInferenceClassName'} label={"推理类名(Package.ClassName)"}
                     rules={[{required: true, message: '请输入模型训练类名'}]}>
            <Input placeholder="请输入模型推理类名"/>
          </Form.Item>
          <Form.Item name={'modelServingInferenceClassName'} label={"实时流类名(Package.ClassName)"}
                     rules={[{required: true, message: '请输入实时流类名'}]}>
            <Input placeholder="请输入实时流类名"/>
          </Form.Item>
          <Divider/>
          <Form.Item name={"modelTrainTable"} label={"请选择训练表"}>
            <TableSearchSelect key={1} setTableInfo={setTableInfo}/>
          </Form.Item>
          {
            tableInfo && tableInfo.tableColumns && (
                <Form.Item
                  label={"特征列"}
                  name={"featureColumnsId"}
                  tooltip={"用于模型训练的特征列"}
                >
                  <Checkbox.Group
                    style={{width:"100%"}}
                    defaultValue={checkedFeatureColumns}
                    onChange={
                      checkedValue => {
                        setCheckedFeatureColumns(checkedValue)
                      }
                    }
                  >
                    <Row>
                      {
                        tableInfo.tableColumns.map(
                          x => {
                            return (
                              <Col span={4}>
                                <Checkbox
                                  value={x.columnId}
                                  disabled={x.columnId == checkedLabelColumns}
                                >
                                  {x.columnName}
                                </Checkbox>
                              </Col>
                            )
                          }
                        )

                      }

                    </Row>
                  </Checkbox.Group>
                </Form.Item>
            )
          }
          {
            tableInfo && tableInfo.tableColumns &&
              <Form.Item
                label={"标签列"}
                name={"modelLabelId"}
                tooltip={"用于模型训练的标签列"}
              >
                <Radio.Group
                  style={{width:"100%"}}
                  onChange={
                    (x) => {
                      setCheckedLabelColumns(x.target.value)
                    }
                  }
                >
                  <Row >
                  {
                      tableInfo.tableColumns.map(x => {
                        return (

                          <Col span={4}>
                          <Radio
                              value={x.columnId}
                              disabled={
                                checkedFeatureColumns.indexOf(x.columnId) != -1
                              }
                            >
                              {
                                x.columnName
                              }
                            </Radio>
                          </Col>
                        )
                      })
                    }
                  </Row>

                </Radio.Group>


              </Form.Item>
          }
          <Divider/>
          <Form.Item name={'modelExtraParams'} tooltip={'该参数将会传送模型训练和推理阶段,json格式'} label={"参数"}>
            <Row>
              <Col span={12}>
                <ReactJson
                  src={modelExtraParams}
                  name={false}
                  onAdd={(x) => {
                    setModelExtraParams(x.updated_src)
                  }}
                  onEdit={(x) => {
                    setModelExtraParams(x.updated_src)
                  }}
                  onDelete={(x) => {
                    setModelExtraParams(x.updated_src)
                  }}
                />
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Button disabled={disable} type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
          <Divider/>
        </Form>
      </Card >
    </div>
  );
};
export default ModelAdd;
