import { Form, Select, Space } from 'antd';
import Input from 'antd/es/input/Input';
import React, { useState } from 'react';
import { Option } from 'antd/es/mentions';

type props = {
  name: number;
  tableColumns: API.TableColumnResponse[];
  rule: string[];
  updateUsingRule: Function;
};

const ColumnInfo: React.FC<props> = (p) => {
  const ruleOperators = [
    { label: '介于', value: 'between' },
    { label: '小于', value: 'lt' },
    { label: '大于', value: 'gt' },
    {
      label: '小于等于',
      value: 'le',
    },
    { label: '大于等于', value: 'ge' },
    { label: '不等于', value: 'ne' },
    { label: '等于', value: 'eq' },
  ];
  const ruleOptions = p.rule
    .filter((x: string) => x != 'rule' + p.name)
    .map((x: string) => {
      return { label: x, value: x };
    });
  const columnOptions = p.tableColumns.map((x: API.TableColumnResponse) => {
    return {
      label: x.columnName + ':' + x.columnType + ':' + x.columnDescription,
      value: x.columnName,
    };
  });
  const [ruleType, setRunType] = useState('rule');
  const [ruleOperator, setRuleOperator] = useState();
  return (
    <>
      {'rule' + p.name}
      <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
        <Form.Item name={[p.name, 'ruleName']} hidden={true} initialValue={'rule' + p.name}>
          <Input style={{ width: 150 }} type={'hidden'} value={'rule' + p.name} />
        </Form.Item>
        <Form.Item
          label={'规则标志'}
          name={[p.name, 'ruleSym']}
          rules={[{ required: true, message: '请选择规则标志' }]}
        >
          <Select
            style={{ width: 150 }}
            onChange={(value) => {
              setRunType(value);
            }}
          >
            <Option value={'rule'}>已有规则</Option>
            <Option value={'column'}>数据列</Option>
          </Select>
        </Form.Item>
        {ruleType == 'rule' && (
          <Form.Item label={'并列条件'} name={[p.name, 'ruleCondition']}>
            <Select style={{ width: 150 }}>
              <Option key={'and'} value={'and'}>
                并且
              </Option>
              <Option key={'or'} value={'or'}>
                或
              </Option>
            </Select>
          </Form.Item>
        )}
        {ruleType == 'rule' && (
          <>
            <Form.Item label={'规则1'} name={[p.name, 'ruleFiled1']}>
              <Select
                style={{ width: 150 }}
                options={ruleOptions}
                onChange={() => p.updateUsingRule}
              />
            </Form.Item>
            <Form.Item label={'规则2'} name={[p.name, 'ruleFiled2']}>
              <Select
                style={{ width: 150 }}
                options={ruleOptions}
                onChange={() => p.updateUsingRule}
              />
            </Form.Item>
          </>
        )}

        {ruleType == 'column' && (
          <>
            <Form.Item label={'列'} name={[p.name, 'ruleFiled']}>
              <Select style={{ width: 150 }} options={columnOptions} />
            </Form.Item>
            <Form.Item label={'规则表达符'} name={[p.name, 'rule']}>
              <Select options={ruleOperators} onChange={(x) => setRuleOperator(x)} />
            </Form.Item>
            {(ruleOperator == 'between' && (
              <>
                <Form.Item label={'起始值'} name={[p.name, 'ruleParam1']}>
                  <Input style={{ width: 150 }} type={'text'} />
                </Form.Item>
                <Form.Item label={'结束值'} name={[p.name, 'ruleParam2']}>
                  <Input style={{ width: 150 }} type={'text'} />
                </Form.Item>
              </>
            )) || (
              <>
                <Form.Item label={'值'} name={[p.name, 'ruleParam1']}>
                  <Input style={{ width: 150 }} type={'text'} />
                </Form.Item>
              </>
            )}
          </>
        )}
      </Space>
    </>
  );
};

export default ColumnInfo;
