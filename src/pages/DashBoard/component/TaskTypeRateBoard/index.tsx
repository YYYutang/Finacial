import React, {useEffect} from "react";
import {Pie} from '@antv/g2plot';
import {Col, Row} from "antd";
import {toNumber} from "lodash";

type TaskTypeRateBoardProps = {
  rate: number,
  title: string,
  idx: number,
}

const TaskTypeRateBoard: React.FC<TaskTypeRateBoardProps> = (props) => {
  useEffect(
    () => {
      const data = [
        {"type": "success", value: toNumber(props.rate.toFixed(4))},
        {"type": "error", value: toNumber((1 - props.rate).toFixed(4))},
      ]
      console.info(data)
      const piePlot = new Pie("TaskTypeRateChart" + props.idx, {
        autoFit: false,
        data: data,
        angleField: 'value',
        colorField: 'type',
        legend: false,
        tooltip: false,
        radius: 1,
        innerRadius: 0.7,
        color: ["#ffcc66", "#CDC9C9"],
        label: false,
        height: 70,
        statistic: {
          title: false,
          content: {
            content: '',
          },
        },
      });
      piePlot.render()
    }, []
  )
  return (
    <Row gutter={[0,16]} justify="space-around"  align={"middle"}>
      <Col span={24}>
        {props.title}
      </Col>
      <Col span={12}>
        <span>成功率<br/>{(props.rate*100).toFixed(2)}%</span>
      </Col>
      <Col span={12}>
        <div id={"TaskTypeRateChart" + props.idx}/>
      </Col>
    </Row>
  )
}
export default TaskTypeRateBoard;
