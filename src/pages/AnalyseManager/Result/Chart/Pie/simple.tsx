import React, { useEffect } from 'react';
import { Card } from 'antd';
import { Chart, Util } from '@antv/g2';
import { round } from 'lodash';
type prop = {
  data: API.CustomerDefinitionChart;
  height: number;
  width: number;
  id: string;
};
const SimplePie: React.FC<prop> = (p) => {
  useEffect(() => {
    let count = 0;
    p.data.chartDates?.forEach((x) => (count += x.count || 0));
    const data = p.data.chartDates?.map((x: API.ChartDate) => {
      return { type: x.filed1, value: round((x.count || 0) / count, 3) * 100 };
    });
    const chart = new Chart({
      container: p.id,
      autoFit: true,
      height: p.height,
    });
    chart.data(data || []);
    chart
      .interval()
      .adjust('stack')
      .position('value')
      .color('type', ['#063d8a', '#1770d6', '#47abfc', '#38c060'])
      .style({ opacity: 0.4 })
      .state({
        active: {
          style: (element) => {
            const shape = element.shape;
            return {
              matrix: Util.zoom(shape, 1.1),
            };
          },
        },
      })
      .label('type', (val) => {
        const opacity = val;
        return {
          offset: -30,
          style: {
            opacity,
            fill: 'white',
            fontSize: 12,
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)',
          },
          content: (obj) => {
            return obj.type + '\n' + obj.value + '%';
          },
        };
      });

    chart.coordinate('theta', {
      radius: 0.75,
    });
    chart.tooltip({
      showMarkers: false,
    });
    chart.interaction('element-single-selected');

    chart.render();
  }, [p]);
  return <div id={p.id} />;
};
export default SimplePie;
