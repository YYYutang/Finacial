import {Card, Form} from "antd";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";

const BasicInfo = () => {
  return(
    <Card title={"基础信息"}>
      <Form.Item label={'表名'} name={'tableName'}>
        <Input placeholder={'表名'}/>
      </Form.Item>
      <Form.Item label={'表简介'} name={'tableDesc'}>
        <TextArea showCount={true} placeholder={'表简介'}/>
      </Form.Item>
    </Card>
  )
}

export default BasicInfo;
