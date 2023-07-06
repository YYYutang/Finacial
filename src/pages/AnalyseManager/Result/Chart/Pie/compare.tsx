import { Chart } from '@antv/g2';
import React, { useEffect } from 'react';
import { DataView } from '@antv/data-set';
import { round } from 'lodash';
type prop = {
  data: API.CustomerDefinitionChart;
  height: number;
  width: number;
  id: string;
};
const ComparePie: React.FC<prop> = (p) => {
  useEffect(() => {
    let count = 0;
    p.data.chartDates?.forEach((x) => (count += x.count || 0));
    const data = p.data.chartDates?.map((x: API.ChartDate) => {
      return { type: x.filed1, name: x.filed2, value: round((x.count || 0) / count, 3) * 100 };
    });
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'value',
      dimension: 'type',
      as: 'percent',
    });
    const chart = new Chart({
      container: p.id,
      autoFit: true,
      height: p.height,
      padding: 0,
    });
    chart.data(dv.rows);
    chart.scale({
      percent: {
        formatter: (val) => {
          return (val * 100).toFixed(2) + '%';
        },
      },
    });
    chart.coordinate('theta', {
      radius: 0.5,
    });
    chart.tooltip({
      showTitle: false,
      showMarkers: false,
    });
    chart.legend(false);
    chart
      .interval()
      .adjust('stack')
      .position('percent')
      .color('type')
      .label('type', {
        offset: -10,
      })
      .tooltip('type*percent', (item, percent) => {
        return {
          name: item,
          value: (percent * 100).toFixed(2) + '%',
        };
      })
      .style({
        lineWidth: 1,
        stroke: '#fff',
      });

    const outterView = chart.createView();
    const dv1 = new DataView();
    dv1.source(data).transform({
      type: 'percent',
      field: 'value',
      dimension: 'name',
      as: 'percent',
    });

    outterView.data(dv1.rows);
    outterView.scale({
      percent: {
        formatter: (val) => {
          return (val * 100).toFixed(2) + '%';
        },
      },
    });
    outterView.coordinate('theta', {
      innerRadius: 0.5 / 0.75,
      radius: 0.75,
    });
    outterView
      .interval()
      .adjust('stack')
      .position('percent')
      .color('name', ['#BAE7FF', '#7FC9FE', '#71E3E3', '#ABF5F5', '#8EE0A1', '#BAF5C4'])
      .label('name')
      .tooltip('name*percent', (item, percent) => {
        return {
          name: item,
          value: (percent * 100).toFixed(2) + '%',
        };
      })
      .style({
        lineWidth: 1,
        stroke: '#fff',
      });

    chart.interaction('element-highlight');

    chart.render();
  }, [p]);

  return <div id={p.id} />;
};
export default ComparePie;
