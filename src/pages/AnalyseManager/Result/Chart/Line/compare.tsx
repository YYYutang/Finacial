import { Chart } from '@antv/g2';
import { useEffect } from 'react';

type prop = {
  data: API.CustomerDefinitionChart;
  height: number;
  width: number;
  id: string;
};
const CompareLineMap: React.FC<prop> = (p) => {
  useEffect(() => {
    console.info(p.data);
    const data = p.data.chartDates?.map((x) => {
      return { name: x.filed1, 下钻字段: x.filed2, 统计量: x.count };
    });
    console.info(data);
    const chart = new Chart({
      container: p.id,
      autoFit: true,
      height: p.height,
    });

    chart.data(data || []);
    chart.scale('统计量', {
      nice: true,
    });
    chart.tooltip({
      showMarkers: false,
      shared: true,
    });

    chart
      .interval()
      .position('下钻字段*统计量')
      .color('name')
      .adjust([
        {
          type: 'dodge',
          marginRatio: 0,
        },
      ]);

    chart.interaction('active-region');
    chart.render();
  }, []);
  return <div id={p.id} />;
};
export default CompareLineMap;
