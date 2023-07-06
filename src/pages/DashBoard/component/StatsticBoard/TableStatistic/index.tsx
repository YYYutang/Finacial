import React, {useEffect} from "react";
import {Col, Row, Statistic} from "antd";
import {ArrowUpOutlined, TableOutlined} from "@ant-design/icons";
import {Column} from '@antv/g2plot';



const TableStatistic: React.FC<API.TableStatistic> = (props) => {
  useEffect(
    () => {
      const columnPlot = new Column('tableStatistic', {
        data: props.chartData||[],
        padding:2,
        xField: 'idx',
        yField: 'value',
        label: false,
        xAxis:{
          min:0,
          max:12,
        },
        tooltip:false,
        yAxis: false,
        height:30,
      });
      columnPlot.render();
    }, []
  )
  return (
    <Row  gutter={[16,16]}>
      <Col span={12}>
        <Statistic title="历史表格总量" value={props.total} prefix={<TableOutlined/>}/>
      </Col>
      <Col span={12}>
        <Statistic
          title="今日新增"
          value={props.increase}
          precision={0}
          valueStyle={{color: 'red'}}
          prefix={<ArrowUpOutlined/>}
        />
      </Col>
      <Col span={24}>
        <div id={"tableStatistic"}/>
      </Col>
    </Row>
  )
}
export default TableStatistic;
