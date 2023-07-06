import {useEffect} from "react";
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';
type item={
  item:string,
  value:number
}
type UserInfoProps={
  data:item[]
}
const RadarChartResult:React.FC<UserInfoProps> = (props) => {
  useEffect(()=>{

    const { DataView } = DataSet;
    const data = props.data;
    const dv = new DataView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['value'], // 展开字段集
      key: 'user', // key字段
      value: 'score', // value字段
    });
    const chart = new Chart({
      container: 'radarChart',
      autoFit: true,
      height: 296,
    });
    chart.data(dv.rows);
    chart.scale('score', {
      min: 0,
      max: 20,
    });
    chart.coordinate('polar', {
      radius: 0.8,
    });
    chart.axis('item', {
      line: null,
      tickLine: null,
      grid: {
        line: {
          style: {
            lineDash: null,
          },
        },
      },
    });
    chart.axis('score', {
      line: null,
      tickLine: null,
      grid: {
        line: {
          type: 'circle',
          style: {
            lineDash: null,
          },
        },
        alternateColor: 'rgba(0, 0, 0, 0.04)',
      },
    });

    chart
      .point()
      .position('item*score')
      .color('user')
      .shape('circle')
      .size(4)
      .style({
        stroke: '#fff',
        lineWidth: 1,
        fillOpacity: 1,
      });
    chart
      .line()
      .position('item*score')
      .color('user')
      .size(2);
    chart.legend(false)
    chart.render();
  },[])
  return (<div id={"radarChart"}/>)
}
export default RadarChartResult;
