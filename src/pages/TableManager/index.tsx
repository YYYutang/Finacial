import React, {useEffect, useState} from 'react';
import {
  Breadcrumb,
  Button,
  Card,
  Divider,
  Form,
  Input,
  Pagination,
  Space,
  Table,
  Tag,
} from 'antd';
import {Modal} from 'antd';
import moment from 'moment';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  HomeOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import {Link} from '@umijs/preset-dumi/lib/theme';
import {tableQueryByIdUsingGET, tableQueryByPageUsingGET} from '@/services/bigdata/table';

const TemplateManager: React.FC = () => {
  const [dataSource, setDataSource] = useState<API.TableSchemaResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const searchForm = Form.useForm<API.tableQueryByPageUsingGETParams>()[0];

  const queryDate = () => {
    tableQueryByPageUsingGET(searchForm.getFieldsValue()).then((value) => {
      setDataSource(value.list || []);
      setTotal(value.total || 0);
      setLoading(false);
    });
  };

  const handlerPage = (page: number, pageSize: number) => {
    setLoading(true);
    searchForm.setFieldsValue({
      pageNo: page,
      pageSize: pageSize,
    });
    queryDate();
  };
  useEffect(() => {
    queryDate();
  }, [searchForm]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showSchema, setShowSchema] = useState<API.TableSchemaResponse>({});
  const handlerSchema = (tableId: number) => {
    tableQueryByIdUsingGET({id: tableId}).then((x) => {
      setIsModalVisible(true);
      setShowSchema(x);
    });
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const schemaColumn = [
    {
      title: '列名',
      dataIndex: 'columnName',
      key: 'columnName',
    },
    {
      title: '列类型',
      dataIndex: 'columnType',
      key: 'columnType',
      render: (x: string) => {
        switch (x) {
          case 'cstring':
            return 'String';
          case 'cdouble':
            return 'Double';
          case 'cinteger':
            return 'Integer';
          case 'cenum':
            return 'String';
          default:
            return 'Unknow';
        }
      },
    },
    {
      title: '列简介',
      dataIndex: 'columnDescription',
      key: 'columnDescription',
    },
  ];

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          <HomeOutlined/>
        </Breadcrumb.Item>
        <Breadcrumb.Item>表管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Form layout="inline" form={searchForm} name={'search'} onFinish={queryDate}>
          <Form.Item name={'pageNo'} initialValue={1}>
            <Input type={'hidden'} />
          </Form.Item>
          <Form.Item name={'pageSize'} initialValue={10}>
            <Input type={'hidden'} />
          </Form.Item>
          <Form.Item name={'total'}>
            <Input type={'hidden'}/>
          </Form.Item>
          <Form.Item name={'tableName'}>
            <Input type={'text'}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
        <Divider/>
        <Space>
          <Button type={'primary'}>
            <Link to={'/mockData/tableCreate'}>创建随机数据表</Link>
          </Button>
          <Button type={'primary'}>
            <Link to={'/fe/tableCreate'}>创建特征提取表</Link>
          </Button>
          <Button type={'primary'}>
          <Link to={'/dataImport/tableCreate'}>导入文件数据表</Link>
        </Button>
          <Button onClick={queryDate}>刷新</Button>
        </Space>
        <Divider/>

        <Table<API.TableSchemaResponse>
          columns={[
            {
              title: '表ID',
              dataIndex: 'tableId',
              key: 'tableId',
              fixed: 'left',
            },
            {
              title: '表名',
              dataIndex: 'tableName',
              key: 'tableName',
            },
            {
              title: '表创建时间',
              dataIndex: 'tableCreateTime',
              key: 'tableCreateTime',
              render: (value: string) => {
                return moment(value).format('YYYY-MM-DD HH:mm:ss');
              },
            },
            {
              title: '表格类型',
              dataIndex: 'tableType',
              key: 'tableType',
              render: (value: string) => {
                switch (value) {
                  case 'mock':
                    return '随机数据';
                  case 'feature_extract':
                    return '特征处理';
                  case 'data_import':
                    return '导入数据表';
                  default:
                    return '未分类';
                }
              },
            },
            {
              title: '表格状态',
              dataIndex: 'tableState',
              key: 'tableState',
              render: (value: string) => {
                switch (value) {
                  case 'running':
                    return (
                      <Tag icon={<SyncOutlined spin/>} color={'blue'}>
                        {value}
                      </Tag>
                    );
                  case 'error':
                    return (
                      <Tag icon={<CloseCircleTwoTone twoToneColor="#eb2f96"/>} color={'red'}>
                        {value}
                      </Tag>
                    );
                  default:
                    return (
                      <Tag icon={<CheckCircleTwoTone twoToneColor="#52c41a"/>} color={'green'}>
                        {value}
                      </Tag>
                    );
                }
              },
            },
            {
              title: '操作',
              fixed: 'right',
              render: (row: API.TableSchemaResponse) => {
                return (
                  <Space>
                    <a onClick={() => handlerSchema(row.tableId || 0)}>查看</a>
                  </Space>
                );
              },
            },
          ]}
          dataSource={dataSource}
          scroll={{y: 350}}
          loading={loading}
          pagination={false}
          bordered={true}
        />
        <Divider/>
        <Pagination
          total={total}
          showSizeChanger
          showQuickJumper
          onChange={handlerPage}
          onShowSizeChange={handlerPage}
          defaultCurrent={1}
          defaultPageSize={6}
          current={searchForm.getFieldValue('pageNo')}
          showTotal={(t) => `共 ${t} 条数据`}
        />
        <Modal
          title={showSchema.tableName}
          visible={isModalVisible}
          closable={false}
          footer={[
            <Button key={1} onClick={handleCancel}>
              关闭
            </Button>,
          ]}
        >
          <Table columns={schemaColumn} dataSource={showSchema.tableColumns} pagination={false}/>
        </Modal>
      </Card>
    </div>
  );
};

export default TemplateManager;
