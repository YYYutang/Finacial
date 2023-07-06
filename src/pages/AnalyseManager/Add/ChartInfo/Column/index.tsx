import React from 'react';
import { Card, Form, Select, Space, Switch } from 'antd';
import Input from 'antd/es/input/Input';
const { Option } = Select;

type prop = {
  tableInfo: API.TableSchemaResponse;
  name: number;
  key: number;
};

const AnalyseChartInfo: React.FC<prop> = (p) => {
  const columnOption = p.tableInfo.tableColumns
    ?.filter((x) => x.columnType == 'cstring' || x.columnType == 'cenum')
    .map((x) => {
      return { label: x.columnName + ':' + x.columnDescription, value: x.columnName };
    });
  return (
    <Card>
      <Form.Item label={'包含标签字段'} name={[p.name, 'includeLabel']}>
        <Switch />
      </Form.Item>

      <Space>
        <Form.Item name={[p.name, 'chartName']} label={'统计图标签'}>
          <Input style={{ width: 150 }} />
        </Form.Item>
        <Form.Item name={[p.name, 'chartType']} label={'图像类型'}>
          <Select style={{ width: 150 }}>
            <Option value={'pie'}>饼图</Option>
            <Option value={'bar'}>柱状图</Option>
          </Select>
        </Form.Item>
        <Form.Item name={[p.name, 'drillAnalyse']} label={'下钻字段'}>
          <Select style={{ width: 150 }} options={columnOption} />
        </Form.Item>
      </Space>
    </Card>
  );
};
export default AnalyseChartInfo;
