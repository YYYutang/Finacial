import React, {useEffect, useState} from 'react';
import {Breadcrumb, Button, Card, Divider, Form, Input, Pagination, Space, Table, Tag, Tooltip} from 'antd';
import moment from 'moment';
import {CheckCircleTwoTone, CloseCircleTwoTone, HomeOutlined, SyncOutlined} from '@ant-design/icons';
import { Link } from '@umijs/preset-dumi/lib/theme';
import {modelQueryByPageUsingGET} from "@/services/bigdata/modelController";

const ModelManager: React.FC = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const searchForm = Form.useForm()[0];

  const queryDate = () => {
    modelQueryByPageUsingGET(searchForm.getFieldsValue()).then((value) => {
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
        <Breadcrumb.Item>模型管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Form layout="inline" form={searchForm} name={'search'}>
          <Form.Item name={'pageNo'} initialValue={1}>
            <Input type={'hidden'} />
          </Form.Item>
          <Form.Item name={'pageSize'} initialValue={10}>
            <Input type={'hidden'} />
          </Form.Item>
          <Form.Item name={'total'}>
            <Input type={'hidden'} />
          </Form.Item>
          <Form.Item name={'modelName'} initialValue={""}>

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
          <Link to={'/model/add'}>添加模型</Link>
        </Button>
        <Button onClick={queryDate}>
         刷新
        </Button>

        </Space>
        <Divider />
        <Table
          columns={[
            {
              title: '模型ID',
              dataIndex: 'modelId',
              key: 'modelId',
              width:80,
              fixed: 'left',
            },
            {
              title: '模型状态',
              dataIndex: 'modelState',
              key: 'modelState',
              render: (value: string) => {
                switch (value) {
                  case 'training':
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
              title: '模型名称',
              dataIndex: 'modelName',
              key: 'modelName',
            },
            {
              title: '模型训练表',
              dataIndex: 'modelTrainTable',
              key: 'modelTrainTable',
              render(x:API.TableSchemaResponse){
                return x.tableName
              }
            },
            {
              title: '模型Jar包',
              dataIndex: 'modelJar',
              key: 'modelJar',
              width:180,
              render(x:string){
                return (<Tooltip title={x}>{x&&x.length>20&& x.substring(0,20)+"..."||x}</Tooltip>)
              }
            },
            {
              title: '模型训练类名',
              dataIndex: 'modelTrainClassName',
              width:180,
              key: 'modelTrainClassName',render(x:string){
                return (<Tooltip title={x}>{x&&x.length>20&& x.substring(0,20)+"..."||x}</Tooltip>)
              }
            },
            {
              title: '模型推理类名',
              dataIndex: 'modelInferenceClassName',
              width:180,
              key: 'modelInferenceClassName',render(x:string){
                return (<Tooltip title={x}>{x&&x.length>20&& x.substring(0,20)+"..."||x}</Tooltip>)
              }
            },{
              title: '模型在线服务类名',
              dataIndex: 'modelServingInferenceClassName',
              width:180,
              key: 'modelInferenceClassName',render(x:string){
                return (<Tooltip title={x}>{x&&x.length>20&& x.substring(0,20)+"..."||x}</Tooltip>)
              }
            },{
              title: '模型保存路径',
              dataIndex: 'modelSavePath',
              key: 'modelSavePath',
              width:180,
              render(x:string){
                return (<Tooltip title={x}>{x&&x.length>20&& x.substring(0,20)+"..."||x}</Tooltip>)
              }
            },
            {
              title: '创建时间',
              dataIndex: 'modelCreateTime',
              key: 'modelCreateTime',
              width:180,
              render: (value: string) => {
                return moment(value).format('YYYY-MM-DD HH:mm:ss');
              },
            },{
              title: '特征列',
              dataIndex: 'featureColumns',
              key: 'featureColumns',
              width:180,
              render: (value: API.FeatureColumn[]) => {
                return <Space>{value.map(x=>{return x.columnName})}</Space>;
              },
            },{
              title: '模型标签列',
              dataIndex: 'modelLabel',
              key: 'modelState',
              fixed:'right',
              width:120,
              render:(value:API.TableColumnResponse)=>{
                return value.columnName
              }
            },
          ]}
          dataSource={dataSource}
          scroll={{  x: 'max-content', y: 350 }}
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
          defaultPageSize={10}
          current={searchForm.getFieldValue('pageNo')}
          showTotal={(t) => `共 ${t} 条数据`}
        />
      </Card>
    </div>
  );
};

export default ModelManager;
