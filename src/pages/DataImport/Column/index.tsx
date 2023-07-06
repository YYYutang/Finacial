import { Card, Form, Select, Space } from 'antd';
import Input from 'antd/es/input/Input';
import React from 'react';
type props = {
  name: number;
  key: number;
};

const ColumnInfo: React.FC<props> = (p) => {


  const columnType = [
    { label: '整型', value: 'cinteger' },
    { label: '浮点型', value: 'cdouble' },
    { label: '字符型', value: 'cstring' },
    { label: '日期', value: 'cdata' },
  ];

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
          />
        </Form.Item>

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
