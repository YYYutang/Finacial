import React, { useEffect } from 'react';
import { Chart } from '@antv/g2';
import { round } from 'lodash';
type prop = {
  data: API.CustomerDefinitionChart;
  height: number;
  width: number;
  id: string;
};
const RangePie: React.FC<prop> = (p) => {
  let count = 0;
  p.data.chartDates?.forEach((x) => (count += x.count || 0));
  const data = p.data.chartDates?.map((x: API.ChartDate) => {
    return { type: x.filed1, value: round((x.count || 0) / count, 3) * 100 };
  });
  useEffect(() => {
    const chart = new Chart({
      container: p.id,
      autoFit: true,
      height: p.height,
      padding: [40, 0],
    });

    chart.coordinate('theta', {
      startAngle: Math.PI, // 起始角度
      endAngle: Math.PI * (3 / 2), // 结束角度
    });

    chart.data(data || []);

    chart.tooltip({
      showTitle: false,
      showMarkers: false,
    });

    chart.interval().adjust('stack').position('value').color('type').label('type');

    chart.interaction('element-active');

    chart.render();
  }, []);
  return <div id={p.id} />;
};
export default RangePie;
