import React, { useState } from 'react';
import { Breadcrumb, Button, Card, Col, Divider, Form, message, Row, Space } from 'antd';
import { HomeOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import BasicInfo from '@/pages/AnalyseManager/Add/BasicInfo';
import RuleLabel from '@/pages/AnalyseManager/Add/Rule/RuleLabel';
import { createRuleAnalyseUsingPOST } from '@/services/bigdata/analyse';
import RuleOpt from '@/pages/AnalyseManager/Add/ChartInfo';

const CreateRuleAnalyse: React.FC = () => {
  const analyseForm = useForm<API.RuleAnalyseRequest>()[0];
  const [tableInfo, setTableInfo] = useState<API.TableSchemaResponse>({});
  const handlerSubmit = (value: API.RuleAnalyseRequest) => {
    const params: API.RuleAnalyseRequest = {
      ...value,
      tableName: tableInfo.tableName,
    };
    createRuleAnalyseUsingPOST(params)
      .then((x) => {
        if (x > 0) {
          message.success('创建成功');
          history.back();
        }
      })
      .catch((reason) => {
        message.error(reason);
      });
  };
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href={'/analyse'}>分析任务</Breadcrumb.Item>
        <Breadcrumb.Item>创建规则分析</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Form form={analyseForm} onFinish={handlerSubmit} name={'analyseForm'} layout="vertical">
          <Divider />
          <BasicInfo setTableInfo={setTableInfo} />
          <Divider />
          <Card title={'配置信息'}>
            <Form.List name="labels">
              {(fields, { add, remove }) => (
                <>
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                      icon={<PlusOutlined />}
                    >
                      添加标签
                    </Button>
                  </Form.Item>
                  <Row>
                    {fields.map(({ key, name }) => {
                      return (
                        <Col key={key} span={24}>
                          <Card key={key}>
                            <Space
                              key={key}
                              style={{ display: 'flex', marginBottom: 8 }}
                              align="baseline"
                            >
                              <RuleLabel key={key} name={name} tableInfo={tableInfo} />
                              <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </>
              )}
            </Form.List>
          </Card>
          <Divider />
          <Card title={'统计分析与结果可视化'}>
            <RuleOpt tableInfo={tableInfo} />
          </Card>
          <Divider />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Divider />
        </Form>
      </Card>
    </div>
  );
};

export default CreateRuleAnalyse;
