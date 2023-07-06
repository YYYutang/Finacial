import { Chart } from '@antv/g2';
import { useEffect } from 'react';

type prop = {
  data: API.CustomerDefinitionChart;
  height: number;
  width: number;
  id: string;
};
const SimpleLineMap: React.FC<prop> = (p) => {
  useEffect(() => {
    console.info(p.data);
    const data = p.data.chartDates?.map((x) => {
      return { name: x.filed1, value: x.count };
    });
    console.info(data);
    const chart = new Chart({
      container: p.id,
      autoFit: true,
      height: p.height,
    });
    chart.data(data || []);
    chart.scale('value', {
      alias: '统计量',
      nice: true,
    });
    chart.axis('name', {
      tickLine: null,
    });

    chart.tooltip({
      showMarkers: false,
    });
    chart.interaction('active-region');

    chart.interval().position('name*value');

    chart.render();
  }, []);
  return <div id={p.id} />;
};
export default SimpleLineMap;
