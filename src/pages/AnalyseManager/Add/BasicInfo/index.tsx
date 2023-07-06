import {Card, Form, Input} from "antd";
import TableSearchSelect from "@/pages/TableManager/TableSearchSelect";
import TextArea from "antd/es/input/TextArea";
import React from "react";


type props={
  setTableInfo:Function
}

const BasicInfo: React.FC<props> = (p) => {
  return (
    <Card title={"基础信息"} style={{display: 'flow'}}>
      <Form.Item label={'分析名称'} name={'analyseName'}>
        <Input placeholder={'分析名称'}/>
      </Form.Item>
      <Form.Item label={'分析表'} name={'tableId'}>
        <TableSearchSelect key={1} setTableInfo={p.setTableInfo}/>
      </Form.Item>
      <Form.Item label={'分析介绍'} name={'analyseDesc'}>
        <TextArea showCount={true} placeholder={'分析介绍'}/>
      </Form.Item>
    </Card>
  )
}

export default BasicInfo;
