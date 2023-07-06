import React, { useEffect } from 'react';
import { Chart } from '@antv/g2';
import { round } from 'lodash';
type prop = {
  data: API.CustomerDefinitionChart;
  height: number;
  width: number;
  id: string;
};
const CPie: React.FC<prop> = (p) => {
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
    chart.coordinate('polar', {
      innerRadius: 0.2,
    });
    chart.legend('type', {
      position: 'right',
    });
    chart.axis(false);
    chart.tooltip({
      showMarkers: false,
    });
    chart.interaction('element-highlight');
    chart.interval().position('type*value').color('type').style({
      lineWidth: 1,
      stroke: '#fff',
    });
    chart.render();
  }, [p]);
  return <div id={p.id} />;
};
export default CPie;
