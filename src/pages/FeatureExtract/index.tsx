import React, {useState} from 'react';
import {Breadcrumb, Button, Card, Col, Divider, Form, message, Row, Space} from 'antd';
import {HomeOutlined, MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {useForm} from 'antd/es/form/Form';
import {createFETableUsingPOST} from '@/services/bigdata/table';
import TableSearchSelect from "@/pages/TableManager/TableSearchSelect";
import ColumnInfo from "@/pages/FeatureExtract/Column";
import BasicInfo from "@/pages/TableManager/BasicInfo";

const FETable: React.FC = () => {
  const feTableCreateForm = useForm<API.FETableCreateRequest>()[0];
  const [tableInfo, setTableInfo] = useState<API.TableSchemaResponse>();
  const handlerSubmit = (value: API.FETableCreateRequest) => {
    const operator_type = {
      "log": "cdouble",
      "add": "cdouble",
      "div": "cdouble",
      "one_hot": "cstring",
      "label_encoder": "cinteger",
      "direct": "cstring"
    }
    const tableColumns=value.tableColumns?.map((x:API.FEColumnCreateRequest)=>{
      console.info(x.feOperator)
      return {
        ...x,
        columnType:operator_type[x.feOperator||""]
      }
    })
    feTableCreateForm.setFieldsValue({
      tableColumns:tableColumns
    })
    value=feTableCreateForm.getFieldsValue()
    console.info(value)
    createFETableUsingPOST({
      ...value,
      fromTableId:tableInfo?.tableId,
      fromTableName:tableInfo?.tableName,
      tableType: "feature_extract",
    })
      .then((x) => {
        if (x > 0) {
          history.back();
          message.success('创建成功');
        } else {
          message.error('创建失败');
        }
      })
      .catch((x) => {
        message.error(x.message);
      });
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          <HomeOutlined/>
        </Breadcrumb.Item>
        <Breadcrumb.Item href={'/tableManager'}>表管理</Breadcrumb.Item>
        <Breadcrumb.Item>创建特征处理数据表</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Form form={feTableCreateForm} onFinish={handlerSubmit} name={'feTableCreateForm'} layout={"vertical"}>
          <Divider/>
          <BasicInfo/>
          <Divider/>
          <Card title={"配置信息"}>
            <Form.Item
              name={"fromTableId"}
              label={"原始表"}
            >
              <TableSearchSelect setTableInfo={setTableInfo} key={1}/>
            </Form.Item>
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
                          <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                            <ColumnInfo key={key} name={name} tableColumns={tableInfo?.tableColumns || []}/>
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
          <Divider/>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
          <Divider/>
        </Form>
      </Card>
    </div>
  );
};
export default FETable;
