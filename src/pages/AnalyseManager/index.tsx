import React, { useEffect, useState } from 'react';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Pagination,
  Row,
  Skeleton,
  Space,
  Tag,
} from 'antd';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  HomeOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { AnalyseQueryByPageUsingGET } from '@/services/bigdata/analyse';
import { Link } from '@umijs/preset-dumi/lib/theme';

const AnalyseManager: React.FC = () => {
  const [dataSource, setDataSource] = useState<API.BasicAnalyseResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const searchForm = Form.useForm<API.tableQueryByPageUsingGETParams>()[0];

  const queryDate = () => {
    AnalyseQueryByPageUsingGET(searchForm.getFieldsValue()).then((value) => {
      setDataSource(value.list || []);
      setTotal(value.total || 0);
      setLoading(false);
    });
  };
  useEffect(() => {
    queryDate();
  }, [searchForm]);
  const handlerPage = (page: number, pageSize: number) => {
    setLoading(true);
    searchForm.setFieldsValue({
      pageNo: page,
      pageSize: pageSize,
    });
    queryDate();
  };
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>分析任务</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Form layout="inline" form={searchForm} name={'search'} onFinish={queryDate}>
          <Form.Item name={'pageNo'} initialValue={1}>
            <Input type={'hidden'} />
          </Form.Item>
          <Form.Item name={'pageSize'} initialValue={6}>
            <Input type={'hidden'} />
          </Form.Item>
          <Form.Item name={'total'}>
            <Input type={'hidden'} />
          </Form.Item>
          <Form.Item name={'analyseName'}>
            <Input type={'text'} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
        <Divider />
        <Space>
          <Button type={'primary'}>
            <Link to={'/analyse/rule/create'}>创建规则分析</Link>
          </Button>
          <Button  type={'primary'}>
            <Link to={'/analyse/model/create'}>创建模型分析</Link>
          </Button>
          <Button onClick={queryDate}>
            刷新
          </Button>
        </Space>
        <Divider />
        <Card>
          <Space>
            {loading && <Skeleton style={{ width: '25vh' }} />}
            {dataSource && (
              <Row gutter={[30, 39]}>
                {dataSource.map((item) => {
                  return (
                    <Col key={item.analyseId} span={4}>
                      <Card
                        hoverable
                        title={
                          <Space>
                            {item.analyseType == 'rule' && <Tag>规则分析</Tag>}
                            {item.analyseType == 'model' && <Tag>模型分析</Tag>}
                            {item.analyseName}
                          </Space>
                        }
                        bordered={true}
                        style={{ width: '25vh' }}
                        actions={[
                          <>
                            <Button disabled={item.analyseState != 'success'}>
                              <Link
                                to={{
                                  pathname: '/analyse/result/' + item.analyseId,
                                }}
                              >
                                查看
                              </Link>
                            </Button>
                          </>,
                        ]}
                      >
                        <>
                          <div style={{ wordBreak: 'break-all', height: '20vh' }}>
                            {item.analyseDesc}
                          </div>
                          <div>
                            {item.analyseState == 'running' && (
                              <Tag icon={<SyncOutlined spin />} color={'blue'}>
                                {item.analyseState}
                              </Tag>
                            )}
                            {item.analyseState == 'error' && (
                              <Tag
                                icon={<CloseCircleTwoTone twoToneColor="#eb2f96" />}
                                color={'red'}
                              >
                                {item.analyseState}
                              </Tag>
                            )}
                            {item.analyseState == 'success' && (
                              <Tag
                                icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
                                color={'green'}
                              >
                                {item.analyseState}
                              </Tag>
                            )}
                          </div>
                        </>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            )}
          </Space>
        </Card>
        <Pagination
          style={{ textAlign: 'center', margin: 8 }}
          total={total}
          showQuickJumper
          onChange={handlerPage}
          onShowSizeChange={handlerPage}
          defaultCurrent={1}
          defaultPageSize={6}
          current={searchForm.getFieldValue('pageNo')}
          showTotal={(t) => `共 ${t} 条数据`}
        />
      </Card>
    </div>
  );
};

export default AnalyseManager;
