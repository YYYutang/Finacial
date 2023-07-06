import React, {useEffect} from "react";
import {Col, Row, Statistic} from "antd";
import {ProjectOutlined} from "@ant-design/icons";
import { Area } from '@antv/g2plot';




const TaskStatistic: React.FC<API.TaskStatistic> = (props) => {

  useEffect(()=>{
    const area = new Area('taskStatistic', {
      data:props.chartData||[],
      padding:2,
      xField: 'idx',
      yField: 'value',
      xAxis: {
        min:0,
        max:11
      },
      label:false,
      yAxis:false,
      height:30,
      color:'#cb302d',
      tooltip:false,
    });
    area.render();
  },[])

  return (
    <Row gutter={[16,16]} >
      <Col span={12}>
        <Statistic title="任务总量" value={props.total} prefix={<ProjectOutlined/>}/>
      </Col>
      <Col span={12}>
        <Statistic title="任务成功率" value={((props.success||0)/(props.total||1e-9)*100).toFixed(2)} suffix="%"/>
      </Col>
      <Col span={24} >
        <div id={"taskStatistic"}/>
      </Col>
    </Row>
  )
}
export default TaskStatistic;
