import React from 'react';
import {Breadcrumb, Button, Card, Col, Divider, Form, message, Row, Space} from 'antd';
import {HomeOutlined, MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {useForm} from 'antd/es/form/Form';
import ColumnInfo from '@/pages/MockData/Column';
import Input from 'antd/es/input/Input';
import {createMockDataTableUsingPOST} from '@/services/bigdata/table';
import BasicInfo from "@/pages/TableManager/BasicInfo";

const MockDataTable: React.FC = () => {
  const mockDataTableCreateForm = useForm<API.MockDataTableCreateRequest>()[0];
  const handlerSubmit = (value: API.MockDataTableCreateRequest) => {
    const tableColumns = mockDataTableCreateForm.getFieldValue('tableColumns');

    const cs = Array();
    tableColumns.forEach((item: any) => {
      const columnName = item['columnName'];
      const columnType = item['columnType'];
      const columnDescription = item['columnDescription'];
      let columnGenerator;
      switch (columnType) {
        case 'cinteger': {
          columnGenerator = 'rand_int';
          break;
        }
        case 'cdouble': {
          columnGenerator = 'rand_double';
          break;
        }
        case 'cenum': {
          columnGenerator = 'rand_enum';
          break;
        }
        case 'cdata': {
          columnGenerator = 'rand_date';
          break;
        }
        default: {
          columnGenerator = 'pk';
          break;
        }
      }
      let columnGeneratorParams;
      switch (item['params']) {
        case 'range': {
          if (columnType == 'cinteger') {
            columnGeneratorParams = 'range,' + item['rangeNumber1'] + ',' + item['rangeNumber2'];
          } else if (columnType == 'cdata') {
            columnGeneratorParams = 'range,' + item['rangeData1'] + ',' + item['rangeData2'];
          } else if (columnType == 'cdouble') {
            columnGeneratorParams = 'range,' + item['rangeDouble1'] + ',' + item['rangeDouble2'];
          }
          break;
        }
        case 'constant': {
          if (columnType == 'cinteger') {
            columnGeneratorParams = 'constant,' + item['constantNumber'];
          } else if (columnType == 'cdata') {
            columnGeneratorParams = 'constant,' + item['constantData'];
          } else if (columnType == 'cdouble') {
            columnGeneratorParams = 'constant,' + item['constantDouble'];
          }
          break;
        }
        case 'custom': {
          columnGeneratorParams = 'custom,' + item['customEnum'];
          break;
        }
        default:
          columnGeneratorParams=item['params']
          break;
      }
      cs.push({
        columnGeneratorParams: columnGeneratorParams,
        columnGenerator: columnGenerator,
        columnName: columnName,
        columnDescription: columnDescription,
        columnType: columnType,
      });
      console.log(cs);
    });
    createMockDataTableUsingPOST({
      ...value,
      tableType: "mock",
      tableColumns: cs,
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
        <Breadcrumb.Item>添加模拟数据表</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Form layout={"vertical"} form={mockDataTableCreateForm} onFinish={handlerSubmit} name={'templateAddForm'}>
          <Divider/>
            <BasicInfo/>
          <Divider/>
          <Card title={"配置信息"}>
            <Form.Item label={'生成数据量'} name={'dataCount'}>
              <Input placeholder={'生成数据量'} type={"number"}/>
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
          <Divider/>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>

          <Divider/>
        </Form>
      </Card>
    </div>
  );
};
export default MockDataTable;
