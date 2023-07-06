import React, {useEffect, useState} from 'react';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input, message, Modal,
  Pagination,
  Row,
  Skeleton,
  Space,
} from 'antd';
import {
  HomeOutlined,
} from '@ant-design/icons';
import {
  busQueryByPageUsingGET,
  createBusUsingPOST,
  updateBusUsingPUT
} from "@/services/bigdata/bus";
import ModelSearchSelect from "@/pages/ModelManager/ModelSearchSelect";
import TextArea from "antd/es/input/TextArea";
import Item from "@/pages/BusManager/Item";

const BusManager: React.FC = () => {
  const [dataSource, setDataSource] = useState<API.BusResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false)
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false)
  const [updateBusInfo, setUpdateBusInfo] = useState<API.BusResponse>({})
  const [modelInfo, setModelInfo] = useState<API.ModelResponse>()
  const searchForm = Form.useForm<API.busQueryByPageUsingGETParams>()[0];
  const addForm = Form.useForm<API.BusCreateRequest>()[0];
  const updateForm = Form.useForm<API.BusUpdateRequest>()[0];
  const queryDate = () => {
    busQueryByPageUsingGET(searchForm.getFieldsValue()).then((value) => {
      setDataSource(value.list || []);
      setTotal(value.total || 0);
      setLoading(false);
    });
  };
  const handlerCreate = (value: API.BusCreateRequest) => {
    if (modelInfo) {
      createBusUsingPOST({
        ...value,
        modelId: modelInfo.modelId
      }).then(x => {
        if (x > 0) {
          setAddModalVisible(false)
          message.success("创建成功")
          queryDate()
        } else {
          message.error("创建失败");
        }
      })
    } else {
      message.info("请选择模型!")
    }
  }
  const handlerUpdate = (value: API.BusUpdateRequest) => {
    if (modelInfo) {
      updateBusUsingPUT({
        ...value,
        modelId: modelInfo.modelId,
        busId: updateBusInfo.busId
      }).then(x => {
        if (x > 0) {
          setUpdateModalVisible(false)
          message.success("修改成功")
          queryDate()
        } else {
          message.error("修改失败")
        }
      })
    }
  }
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
          <HomeOutlined/>
        </Breadcrumb.Item>
        <Breadcrumb.Item>业务管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Form layout="inline" form={searchForm} name={'search'} onFinish={queryDate}>
          <Form.Item name={'pageNo'} initialValue={1}>
            <Input type={'hidden'}/>
          </Form.Item>
          <Form.Item name={'pageSize'} initialValue={6}>
            <Input type={'hidden'}/>
          </Form.Item>
          <Form.Item name={'total'}>
            <Input type={'hidden'}/>
          </Form.Item>
          <Form.Item name={'busName'}>
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
          <Button type={'primary'} onClick={() => setAddModalVisible(true)}>新增业务域
          </Button>

          <Button onClick={queryDate}>
            刷新
          </Button>
        </Space>
        <Divider/>
        <Card>
          {loading && <Skeleton/>}
          {dataSource && (
            <Row gutter={[10, 10]}>
              {dataSource.map((item) => {
                return (
                  <Col key={item.busName} span={24}>
                    <Item value={item} queryData={queryDate}/>
                  </Col>
                );
              })}
            </Row>
          )}
        </Card>
        <Pagination
          style={{textAlign: 'center', margin: 8}}
          total={total}
          showQuickJumper
          onChange={handlerPage}
          onShowSizeChange={handlerPage}
          defaultCurrent={1}
          defaultPageSize={2}
          current={searchForm.getFieldValue('pageNo')}
          showTotal={(t) => `共 ${t} 条数据`}
        />
      </Card>

      <Modal visible={addModalVisible} title={"添加业务"}
             closable={false}
             onCancel={() => setAddModalVisible(false)}
             onOk={addForm.submit}
      >

        <Form
          form={addForm}
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          onFinish={handlerCreate}
        >
          <Form.Item name={"busName"} label={"业务名称"} rules={[{required: true, message: "请输入业务名称"}]}>
            <Input/>
          </Form.Item>
          <Form.Item name={"modelId"} label={"模型"}>
            <ModelSearchSelect key={1} setModelInfo={setModelInfo}/>
          </Form.Item>
          <Form.Item name={"busUri"} label={"业务Uri"} rules={[{required: true, message: "请输入业务URI"}]}>
            <Input/>
          </Form.Item>
          <Form.Item name={"busDescription"} label={"业务简介"} rules={[{required: true, message: "请输入业务简介"}]}>
            <TextArea/>
          </Form.Item>
        </Form>
      </Modal>


      <Modal
        visible={updateModalVisible} title={"更新业务信息"}
        closable={false}
        onCancel={() => setUpdateModalVisible(false)}
        onOk={updateForm.submit}
      >
        <Form
          form={updateForm}
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          onFinish={handlerUpdate}
        >
          <Form.Item name={"busName"} label={"业务名称"} rules={[{required: true, message: "请输入业务名称"}]}>
            <Input value={updateBusInfo.busName}/>
          </Form.Item>
          <Form.Item name={"modelId"} label={"模型"}>
            <ModelSearchSelect key={1} setModelInfo={setModelInfo}/>
          </Form.Item>
          <Form.Item name={"busUri"} label={"业务Uri"} rules={[{required: true, message: "请输入业务URI"}]}>
            <Input value={updateBusInfo.busUri}/>
          </Form.Item>
          <Form.Item name={"busDescription"} label={"业务简介"} rules={[{required: true, message: "请输入业务简介"}]}>
            <TextArea value={updateBusInfo.busDescription}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BusManager;
