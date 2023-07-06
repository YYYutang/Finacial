import React from 'react';
import {Card, Collapse, Table, Tooltip} from 'antd';
const { Panel } = Collapse;
type prop = {
  data: Record<string, any>;
  columns: string[];
};

const ResultShow: React.FC<prop> = (p) => {
  const columns = p.columns.map((y) => {
    return { key: y, dataIndex: y, title: y,render(x:any){
      let s=JSON.stringify(x)
        return s&&s.length>20&&<Tooltip title={JSON.stringify(x)}>{s.substring(0,20)+"..."}</Tooltip>||s ;
      } };
  });
  return (
    <Card title={'数据预览'}>
      <Collapse defaultActiveKey={['0']}>
        {Object.keys(p.data).map((x: string, index: number) => {
          return (
            <Panel header={x} key={index}>
              <Table
                scroll={{ y: 350,x:1000 }} style={{maxWidth:"max-content"}} columns={columns} dataSource={p.data[x]} pagination={false} />
            </Panel>
          );
        })}
      </Collapse>
    </Card>
  );
};
export default ResultShow;
