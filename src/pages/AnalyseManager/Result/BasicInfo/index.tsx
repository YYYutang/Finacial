import { Card, Descriptions, Divider } from 'antd';
type prop = {
  analyseResult: API.RuleAnalyseResponse;
};
const ResultBasicInfo: React.FC<prop> = (p) => {
  return (
    <Card title={'基本信息'}>
      <Descriptions layout="vertical" bordered={true}>
        <Descriptions.Item label="任务名称">{p.analyseResult.analyseName}</Descriptions.Item>
        <Descriptions.Item label="任务类型">{p.analyseResult.analyseType}</Descriptions.Item>
        <Divider />
        <Descriptions.Item label="任务介绍" style={{ wordBreak: 'break-all' }}>
          {p.analyseResult.analyseDesc}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
export default ResultBasicInfo;
