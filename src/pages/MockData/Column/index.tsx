import { Card, Form, Select, Space } from 'antd';
import Input from 'antd/es/input/Input';
import React, { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
type props = {
  name: number;
  key: number;
};

const ColumnInfo: React.FC<props> = (p) => {
  const columnType = [
    { label: '整型', value: 'cinteger' },
    { label: '浮点型', value: 'cdouble' },
    { label: '枚举型', value: 'cenum' },
    { label: '日期', value: 'cdata' },
  ];

  const generator = {
    cinteger: [
      { label: '范围', value: 'range' },
      { label: '常数', value: 'constant' },
    ],
    cdouble: [
      { label: '范围', value: 'range' },
      { label: '常数', value: 'constant' },
    ],
    cenum: [
      { label: '性别', value: 'sex' },
      { label: '教育', value: 'education' },
      { label: '地区', value: 'area' },
      { label: '自定义', value: 'custom' },
    ],
    cdata: [
      { label: '范围', value: 'range' },
      { label: '常数', value: 'constant' },
    ],
  };
  const [columnTypeC, setColumnTypeC] = useState('cinteger');
  const [genertorOption, setGenertorOption] = useState([{}]);
  const [rangeNumber, setRangeNumber] = useState(false);
  const [rangeDouble, setRangeDouble] = useState(false);
  const [rangeData, setRangeData] = useState(false);
  const [constantNumber, setConstantNumber] = useState(false);
  const [constantData, setConstantData] = useState(false);
  const [constantDouble, setConstantDouble] = useState(false);
  const [customEnum, setCustomEnum] = useState(false);
  return (
    <Card>
      <Space style={{ display: 'flex', marginBottom: 8 }} key={p.key} align="baseline">
        <Form.Item
          label={'列' + (p.name + 1)}
          name={[p.name, 'columnName']}
          rules={[{ required: true, message: '请输入列名' }]}
          key={p.key}
        >
          <Input placeholder="列名" style={{ width: 150 }} />
        </Form.Item>

        <Form.Item
          name={[p.name, 'columnType']}
          label={'数据类型'}
          rules={[{ required: true, message: '请选择数据类型' }]}
          key={p.key}
        >
          <Select
            style={{ width: 150 }}
            options={columnType}
            defaultActiveFirstOption={true}
            onChange={(value) => {
              setGenertorOption(generator[value]);
              setColumnTypeC(value);
            }}
          />
        </Form.Item>

        <Form.Item
          name={[p.name, 'params']}
          label={'数据生成器'}
          rules={[{ required: true, message: '请选择生成器' }]}
          key={p.key}
        >
          <Select
            style={{ width: 150 }}
            options={genertorOption}
            onChange={(value) => {
              setCustomEnum(false);
              setRangeDouble(false);
              setRangeData(false);
              setRangeNumber(false);
              setConstantDouble(false);
              setConstantNumber(false);
              setConstantData(false);
              switch (value) {
                case 'range': {
                  if (columnTypeC == 'cinteger') {
                    setRangeNumber(true);
                  } else if (columnTypeC == 'cdata') {
                    setRangeData(true);
                  } else if (columnTypeC == 'cdouble') {
                    setRangeDouble(true);
                  }
                  break;
                }
                case 'constant': {
                  if (columnTypeC == 'cinteger') {
                    setConstantNumber(true);
                  } else if (columnTypeC == 'cdata') {
                    setConstantData(true);
                  } else if (columnTypeC == 'cdouble') {
                    setConstantDouble(true);
                  }
                  break;
                }
                case 'custom': {
                  setCustomEnum(true);
                  break;
                }
              }
            }}
          />
        </Form.Item>

        {rangeNumber ? (
          <Space style={{ display: 'flex', marginBottom: 8 }} key={p.key} align="baseline">
            <Form.Item
              label={'最小值'}
              name={[p.name, 'rangeNumber1']}
              rules={[{ required: rangeNumber, message: '请输入最小值' }]}
              key={p.key}
            >
              <Input
                style={{ width: 150 }}
                type={'number'}
                placeholder={'请输入最小值'}
                value={0}
              />
            </Form.Item>
            <Form.Item
              label={'最大值'}
              name={[p.name, 'rangeNumber2']}
              rules={[{ required: rangeNumber, message: '请输入最大值' }]}
              key={p.key}
            >
              <Input
                style={{ width: 150 }}
                type={'number'}
                placeholder={'请输入最大值'}
                value={100}
              />
            </Form.Item>
          </Space>
        ) : null}

        {rangeDouble ? (
          <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
            <Form.Item
              label={'最小值'}
              name={[p.name, 'rangeDouble1']}
              rules={[{ required: rangeDouble, message: '请输入最小值' }]}
              key={p.key}
            >
              <Input
                style={{ width: 150 }}
                type={'number'}
                placeholder={'请输入最小值'}
                value={0}
              />
            </Form.Item>
            <Form.Item
              label={'最大值'}
              name={[p.name, 'rangeDouble2']}
              rules={[{ required: rangeDouble, message: '请输入最大值' }]}
              key={p.key}
            >
              <Input
                style={{ width: 150 }}
                type={'number'}
                placeholder={'请输入最大值'}
                value={100}
              />
            </Form.Item>
          </Space>
        ) : null}
        {rangeData ? (
          <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
            <Form.Item
              label={'起始日期'}
              name={[p.name, 'rangeData1']}
              rules={[{ required: rangeData, message: '请输入起始日期' }]}
              key={p.key}
            >
              <Input style={{ width: 150 }} type={'date'} placeholder={'请输入起始日期'} />
            </Form.Item>
            <Form.Item
              label={'结束日期'}
              name={[p.name, 'rangeData2']}
              rules={[{ required: rangeData, message: '请输入结束日期' }]}
              key={p.key}
            >
              <Input style={{ width: 150 }} type={'date'} placeholder={'请输入结束日期'} />
            </Form.Item>
          </Space>
        ) : null}

        {constantNumber ? (
          <Form.Item
            label={'常数'}
            name={[p.name, 'constantNumber']}
            rules={[{ required: constantNumber, message: '请输入一个常数' }]}
            key={p.key}
          >
            <Input style={{ width: 150 }} type={'number'} placeholder={'请输入一个常数'} />
          </Form.Item>
        ) : null}
        {constantDouble ? (
          <Form.Item
            label={'常数'}
            name={[p.name, 'constantDouble']}
            rules={[{ required: constantDouble, message: '请输入一个常数' }]}
            key={p.key}
          >
            <Input style={{ width: 150 }} type={'number'} placeholder={'请输入一个常数'} />
          </Form.Item>
        ) : null}

        {constantData ? (
          <Form.Item
            label={'固定日期'}
            name={[p.name, 'constantData']}
            rules={[{ required: constantData, message: '请选择一个日期' }]}
            key={p.key}
          >
            <Input style={{ width: 150 }} type={'date'} placeholder={'请选择一个日期'} />
          </Form.Item>
        ) : null}

        {customEnum ? (
          <Form.Item
            label={'自定义枚举'}
            name={[p.name, 'customEnum']}
            tooltip='请输入自定义枚举，以英文逗号 "," 分割'
            rules={[{ required: customEnum, message: '请输入自定义枚举，以英文逗号(",")分割' }]}
            key={p.key}
          >
            <TextArea
              style={{ width: 200 }}
              placeholder={'请输入自定义枚举，以英文逗号(",")分割'}
            />
          </Form.Item>
        ) : null}

        <Form.Item
          name={[p.name, 'columnDescription']}
          label={'列注释'}
          rules={[{ required: true, message: '请输入列注释' }]}
          key={p.key}
        >
          <Input placeholder="列注释" style={{ width: 100 }} />
        </Form.Item>
      </Space>
    </Card>
  );
};

export default ColumnInfo;
