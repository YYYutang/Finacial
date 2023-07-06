import React, {useState} from 'react';
import {Breadcrumb, Button, Card, Divider, Form, message} from 'antd';
import {HomeOutlined} from '@ant-design/icons';
import {useForm} from 'antd/es/form/Form';
import BasicInfo from '@/pages/AnalyseManager/Add/BasicInfo';
import RuleOpt from '@/pages/AnalyseManager/Add/ChartInfo';
import ModelSearchSelect from "@/pages/ModelManager/ModelSearchSelect";
import {createModelAnalyseUsingPOST} from "@/services/bigdata/analyse";
import {Link} from "@umijs/preset-dumi/lib/theme";

const CreateModelAnalyse: React.FC = () => {
  const analyseForm = useForm<API.RuleAnalyseRequest>()[0];
  const [tableInfo, setTableInfo] = useState<API.TableSchemaResponse>({});
  const [modelInfo, setModelInfo] = useState<API.ModelResponse>()
  const handlerSubmit = (value: API.ModelAnalyseRequest) => {
    if(!modelInfo){
      message.error("请选择模型")
      return
    }
    if(!tableInfo){
      message.error("请选择分析表")
    return;
    }
      createModelAnalyseUsingPOST(
        {
          modelParams: {modelId:modelInfo.modelId},
          analyseParams: {...value,tableName:tableInfo.tableName}
        }
      ).then(x => {
        if (x > 0) {
          message.success("创建成功")
          history.back()
        } else {
          message.error("创建失败")
        }
      }).catch(reason => {
        if (reason instanceof Error) {
          message.error(reason.message)
        }
      })


  };
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
         <Link to={"/"}> <HomeOutlined/></Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item >
          <Link to={'/analyse'}>分析任务</Link></Breadcrumb.Item>
        <Breadcrumb.Item>创建模型分析</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Form form={analyseForm} onFinish={handlerSubmit} name={'analyseForm'} layout="vertical">
          <Divider/>
          <BasicInfo setTableInfo={setTableInfo}/>
          <Divider/>
          <Card title={"模型配置"}>
            <Form.Item name={"modelId"}>
              <ModelSearchSelect key={2} setModelInfo={setModelInfo}/>
            </Form.Item>
          </Card>
          <Divider/>
          <Card title={'统计分析与结果可视化'}>
            <RuleOpt tableInfo={tableInfo}/>
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

export default CreateModelAnalyse;
