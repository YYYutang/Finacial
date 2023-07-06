
import React from 'react';
import { tableQueryByIdUsingGET, tableQueryByPageUsingGET } from '@/services/bigdata/table';
import DebounceSelect from "@/components/DebounceSelect";

async function fetchTableList(tableName: string): Promise<any[]> {
  console.log('fetching tableName', tableName);
  return tableQueryByPageUsingGET({
    pageNo: 1,
    pageSize: 10,
    tableName: tableName,
  }).then((x) => {
    if (x.list) {
      return x.list.map((y: API.TableSchemaResponse) => {
        return {
          label: y.tableName + ':' + y.tableType + ':' + y.tableState,
          value: y.tableId,
        };
      });
    }
    return [{}];
  });
}

interface props {
  key:number,
  setTableInfo: Function;
}

const TableSearchSelect: React.FC<props> = (p) => {
  const [value, setValue] = React.useState<API.TableSchemaResponse[]>([]);
  return (
    <DebounceSelect
      showSearch={true}
      value={value}
      placeholder="选择数据表"
      fetchOptions={fetchTableList}
      onChange={(newValue) => {
        setValue(newValue);
        console.log('change');
      }}
      onSelect={(v: any) => {
        tableQueryByIdUsingGET({ id: v.value }).then((x: API.TableSchemaResponse) => {
          p.setTableInfo(x);
        });
      }}
      style={{ width: '100%' }}
    />
  );
};

export default TableSearchSelect;
