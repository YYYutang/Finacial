import React, { useEffect, useState } from 'react';
import { queryAnalyseResultByIdUsingGET} from '@/services/bigdata/analyse';
import { Card, Col, Divider, message, Row } from 'antd';
import { useParams } from 'umi';
import StatisticBoard from '@/pages/AnalyseManager/Result/StatisticBoard';
import ComparePie from './Chart/Pie/compare';
import CompareLineMap from './Chart/Line/compare';
import SimpleLineMap from './Chart/Line/simple';
import ResultShow from './ResultShow';
import CPie from './Chart/Pie/cpie';
import ResultBasicInfo from "@/pages/AnalyseManager/Result/BasicInfo";

const RuleResultBoard: React.FC = () => {
  const [analyseResult, setAnalyseResult] = useState<API.AnalyseResponse>({});
  const params = useParams<any>();
  useEffect(() => {
    queryAnalyseResultByIdUsingGET({ id: params.id })
      .then((x) => {
        setAnalyseResult(x);
      })
      .catch(() => {
        message.error('读取信息失败');
      });
  }, [params.id]);
  return (
    <Card>
      <ResultBasicInfo key={1} analyseResult={analyseResult || {}} />
      <Divider />
      <StatisticBoard key={2} analyseResult={analyseResult || {}} />
      <Divider />
      <ResultShow
        data={analyseResult.analyseResult?.basicRow || {}}
        columns={analyseResult.analyseResult?.columnNames || []}
      />
      <Divider />
      <Row>
        {analyseResult.analyseResult?.customerDefinitionCharts?.map(
          (x: API.CustomerDefinitionChart, index: number) => {
            return (
              <Col span={8} key={x.chartName}>
                <Card title={x.chartName}>
                  {x.chartType == 'pie' && x.includeLabel && (
                    <ComparePie width={200} height={500} id={'customerChart' + index} data={x} />
                  )}
                  {x.chartType == 'pie' && !x.includeLabel && (
                    <CPie width={200} height={500} id={'customerChart' + index} data={x} />
                  )}
                  {x.chartType == 'bar' && x.includeLabel && (
                    <CompareLineMap
                      width={200}
                      height={500}
                      id={'customerChart' + index}
                      data={x}
                    />
                  )}
                  {x.chartType == 'bar' && !x.includeLabel && (
                    <SimpleLineMap width={200} height={500} id={'customerChart' + index} data={x} />
                  )}
                </Card>
              </Col>
            );
          },
        )}
      </Row>
    </Card>
  );
};
export default RuleResultBoard;
