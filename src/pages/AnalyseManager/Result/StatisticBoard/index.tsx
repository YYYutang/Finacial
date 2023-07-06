import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';
import SimplePie from '@/pages/AnalyseManager/Result/Chart/Pie/simple';
import RangePie from '../Chart/Pie/range';

type prop = {
  analyseResult: API.RuleAnalyseResponse;
  key: number;
};
const StatisticBoard: React.FC<prop> = (p) => {
  return (
    <>
      {p.analyseResult.analyseResult?.baseCharts?.map((x) => {
        return (
          <Card title={'基础标签分析'} key={x.chartName}>
            <Card title="各标签样本数量">
              <Row>
                {x.chartDates?.map((y) => {
                  return (
                    <Col key={p.key} span={2}>
                      <Statistic title={y.filed1} value={y.count} />
                    </Col>
                  );
                })}
              </Row>
            </Card>
            <Row>
              <Col span={12}>
                <Card>
                  <SimplePie id="base_chart1" width={400} height={500} data={x} />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <RangePie id="base_chart2" width={400} height={500} data={x} />
                </Card>
              </Col>
            </Row>
          </Card>
        );
      })}
    </>
  );
};
export default StatisticBoard;
