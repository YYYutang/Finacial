import React, {useEffect} from "react";
import {Col, Row} from "antd";
import {DualAxes, Pie, G2} from '@antv/g2plot';
import moment from "moment";


type trendData = {
  trendChartData: API.DateValue[],
  typeTrendChartData: API.DateCountType[],
  pieChartData: API.TypeValue[],
  title: string,
  idx: number
}

const Trend: React.FC<trendData> = (props) => {
  let dualAxes = null;
  let piePlot = null;
  const G = G2.getEngine('canvas');
  const initPieMap = () => {
    piePlot = new Pie('pieChart' + props.idx, {
      appendPadding: 10,
      data: props.pieChartData,
      angleField: 'value',
      colorField: 'type',
      radius: 0.5,
      legend: false,
      autoFit: false,
      label: {
        type: 'spider',
        labelHeight: 40,
        formatter: (data, mappingData) => {
          const group = new G.Group({});
          group.addShape({
            type: 'circle',
            attrs: {
              x: 0,
              y: 0,
              width: 40,
              height: 50,
              r: 5,
              fill: mappingData.color
            },
          });
          group.addShape({
            type: 'text',
            attrs: {
              x: 10,
              y: 8,
              text: `${data.type}`,
              fill: mappingData.color,
            },
          });
          group.addShape({
            type: 'text',
            attrs: {
              x: 0,
              y: 25,
              text: `${data.value}个 ${(data.percent * 100).toFixed(2)}%`,
              fill: 'rgba(0, 0, 0, 0.65)',
              fontWeight: 700,
            },
          });

          return group;
        },
      },
      interactions: [{type: 'element-selected'}, {type: 'element-active'}],
    });
    piePlot.render();
  }
  const initTrendMap = () => {
    dualAxes = new DualAxes('trendChart' + props.idx, {
      data: [props.trendChartData.map(({date,value})=>{
        let dateStr=new Date(parseInt(date||""))
        return {date:moment(dateStr).format("YYYY-MM-DD"),总数:value}
      }), props.typeTrendChartData.map(({date,count,type})=>{
        let dateStr=new Date(parseInt(date||""))
        return {date:moment(dateStr).format("YYYY-MM-DD"),count:count,type:type}
      })],
      xField: 'date',
      yField: ['总数', 'count'],
      limitInPlot: false,
      autoFit: false,
      height: 400,
      meta: {
        time: {
          sync: false, // 开启之后 slider 无法重绘
        },
      },
      geometryOptions: [
        {
          geometry: 'column',
        },
        {
          geometry: 'line',
          seriesField: "type"
        },
      ],
    });
    dualAxes.render();
  }

  useEffect(() => {
    initTrendMap()
    initPieMap()
  }, [])

  return (
    <Row gutter={[16, 8]}>
      <Col span={16}>
        <div id={"trendChart" + props.idx}/>
      </Col>
      <Col span={8}>
        <div id={"pieChart" + props.idx}/>
      </Col>
    </Row>
  )
}

export default Trend;
