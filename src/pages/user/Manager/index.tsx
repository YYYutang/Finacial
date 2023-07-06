import React, { useEffect, useState } from 'react';
import {
  Breadcrumb,
  Button,
  Card,
  Divider,
  Form,
  Input,
  message,
  Pagination,
  Popconfirm,
  Radio,
  Select, Space,
  Table,
} from 'antd';
import moment from 'moment';
import { HomeOutlined } from '@ant-design/icons';
import {
  activeUserUsingPUT,
  disableUserUsingDELETE,
  postponeUsingPUT,
  userQueryByPageUsingGET,
} from '@//services/bigdata/userController';
import { ModalForm } from '@ant-design/pro-form';
import { useForm } from 'antd/es/form/Form';

const UserManager: React.FC = () => {
  const [dataSource, setDataSource] = useState<API.AdminUserResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [postponeFormVisible, setPostponeFormVisible] = useState<boolean>(false);
  const postponeForm = useForm<API.postponeUsingPUTParams>()[0];
  const [total, setTotal] = useState<number>(0);
  const searchForm = Form.useForm<API.userQueryByPageUsingGETParams>()[0];

  const queryDate = () => {
    userQueryByPageUsingGET(searchForm.getFieldsValue()).then((value) => {
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

  const handlerDisable = (value: API.disableUserUsingDELETEParams) => {
    disableUserUsingDELETE(value).then((x) => {
      if (x > 0) {
        setLoading(true);
        queryDate();
        message.success('停用账号成功！');
      } else {
        message.error('停用账号失败！');
      }
    });
  };

  const handlerActive = (value: API.activeUserUsingPUTParams) => {
    activeUserUsingPUT(value).then((x) => {
      if (x > 0) {
        setLoading(true);
        queryDate();
        message.success('账号启用成功！');
      } else {
        message.error('账号启用失败！');
      }
    }).catch(reason => {
      if (reason instanceof Error){
        message.error(reason.message)
      }
    });
  };

  const handlerPostpone = async (formData: API.postponeUsingPUTParams) => {
    postponeUsingPUT({
      id: formData.id,
      postpone: formData.postpone,
      timeEnum: formData.timeEnum,
    }).then((x) => {
      if (x > 0) {
        setLoading(true);
        setPostponeFormVisible(false);
        queryDate();
        message.success('账号延时成功！');
        return true;
      } else {
        message.error('账号延时失败！');
        return false;
      }
    }).catch(reason => {
      if (reason instanceof Error){
        message.error(reason.message)
      }
    });
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
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
            <Input type={'hidden'} />
          </Form.Item>
          <Form.Item label="用户名" name={'adminName'}>
            <Input type={'text'} />
          </Form.Item>
          <Form.Item label="角色" name={'adminTitle'}>
            <Select
              defaultActiveFirstOption={true}
              defaultValue={'ALL'}
              options={[
                { label: 'ALL', value: '' },
                { value: 'user', label: '普通用户' },
                { value: 'admin', label: '管理员' },
              ]}
            />
          </Form.Item>
          <Form.Item label="过期时限" name={'expiredTime'}>
            <Select
              defaultActiveFirstOption={true}
              defaultValue={'ALL'}
              options={[
                { label: 'ALL', value: '' },
                { value: 1, label: '1天内' },
                { value: 2, label: '2天内' },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
          <Divider/>
          <Form.Item label={"用户状态"}
           name={"userState"}
          >
            <Radio.Group onChange={queryDate}>
              <Radio value={''}>全部</Radio>
              <Radio value={'active'}>已激活</Radio>
              <Radio value={'pending'}>待激活</Radio>
              <Radio value={'disable'}>已禁用</Radio>
              <Radio value={'expired'}>已过期</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
        <Divider />
        <Table<API.AdminUserResponse>
          columns={[
            {
              title: '用户ID',
              dataIndex: 'adminId',
              key: 'adminId',
              fixed: 'left',
            },
            {
              title: '用户名',
              dataIndex: 'adminName',
              key: 'adminName',
            },
            {
              title: '过期时间',
              dataIndex: 'expiredTime',
              key: 'expiredTime',
              render: (value: string) => {
                return moment(value).format('YYYY-MM-DD HH:mm:ss');
              },
            },
            {
              title: '用户角色',
              dataIndex: 'adminTitle',
              key: 'adminTitle',
              render: (value: string) => {
                switch (value) {
                  case 'user':
                    return '普通用户';
                  case 'admin':
                    return '管理员';
                  default:
                    return '未知';
                }
              },
            },
            {
              title: '用户状态',
              dataIndex: 'userState',
              key: 'userState',
              render:(value:string)=>{
                switch (value){
                  case "active": return "已激活"
                  case "pending": return "待激活"
                  case "expired": return "已过期"
                  case "disable": return "已禁用"
                  default:return "未知状态"
                }
              },
            },
            {
              title: '操作',
              fixed: 'right',
              render: (row: API.AdminUserResponse) => {
                return (
                  <Space>
                    {row.adminTitle!='admin'&&row.userState == 'active' && (
                      <Popconfirm
                        title={'确认停用吗?'}
                        onConfirm={() => {
                          handlerDisable({ id: row.adminId || 0 });
                        }}
                      >
                        <a>停用</a>
                      </Popconfirm>
                    )}{' '}
                    {row.userState == 'pending' && (
                      <Popconfirm title={'确认激活吗?'}

                      onConfirm={()=>{
                        handlerActive({id:row.adminId})
                      }}
                      >
                        <a>激活</a>
                      </Popconfirm>
                    )}
                    {row.userState == 'disable' && (
                      <Popconfirm
                        title={'确认启用吗?'}
                        onConfirm={() => {
                          handlerActive({ id: row.adminId });
                        }}
                      >
                        <a>启用</a>
                      </Popconfirm>
                    )}
                    {
                      <a
                        onClick={() => {
                          setPostponeFormVisible(true);
                          postponeForm.setFieldsValue({
                            id: row.adminId || 0,
                            timeEnum: 'day',
                            postpone: 1,
                          });
                        }}
                      >
                        延时
                      </a>
                    }
                  </Space>
                );
              },
            },
          ]}
          dataSource={dataSource}
          scroll={{ y: 350 }}
          loading={loading}
          pagination={false}
          bordered={true}
        />
        <Divider />
        <Pagination
          total={total}
          showSizeChanger
          showQuickJumper
          onChange={handlerPage}
          onShowSizeChange={handlerPage}
          defaultCurrent={1}
          defaultPageSize={10}
          current={searchForm.getFieldValue('pageNo')}
          showTotal={(t) => `共 ${t} 条数据`}
        />
      </Card>

      {
        <ModalForm<API.postponeUsingPUTParams>
          visible={postponeFormVisible}
          form={postponeForm}
          title={'用户延时'}
          onFinish={handlerPostpone}
          modalProps={{
            onCancel: () => {
              setPostponeFormVisible(false);
            },
          }}
        >
          <Form.Item name={'id'} hidden={true}>
            <Input type={'hidden'} readOnly={true} />
          </Form.Item>
          <Form.Item label={'延时单位'} name={'timeEnum'}>
            <Radio.Group value={'sec'}>
              <Radio value={'sec'}>秒</Radio>
              <Radio value={'min'}>分</Radio>
              <Radio value={'hour'}>时</Radio>
              <Radio value={'day'}>天</Radio>
              <Radio value={'mon'}>月</Radio>
              <Radio value={'year'}>年</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label={'延长时间'} name={'postpone'}>
            <Input type={'number'} />
          </Form.Item>
        </ModalForm>
      }
    </div>
  );
};

export default UserManager;
