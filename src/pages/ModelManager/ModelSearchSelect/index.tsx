import React from 'react';
import DebounceSelect from "@/components/DebounceSelect";
import {modelQueryByIdUsingGET, modelQueryByPageUsingGET} from "@/services/bigdata/modelController";



async function fetchModelList(modelName: string): Promise<any[]> {
  console.info("fetch model " + modelName)
  return modelQueryByPageUsingGET({
    pageNo: 1,
    pageSize: 10,
    modelName: modelName,
  }).then((x) => {
    if (x.list) {
      return x.list.map((y: API.ModelResponse) => {
        return {
          label: y.modelName + ':' + y.modelState,
          value: y.modelId,
        };
      });
    }
    return [{}];
  });
}

interface props {
  key: number
  setModelInfo: Function;
}

const ModelSearchSelect: React.FC<props> = (p) => {
  const [value, setValue] = React.useState<API.ModelResponse[]>([]);
  return (
    <DebounceSelect
      showSearch={true}
      value={value}
      placeholder="选择模型"
      fetchOptions={fetchModelList}
      onChange={(newValue) => {
        setValue(newValue);
      }}
      onSelect={(v: any) => {
        modelQueryByIdUsingGET({id: v.value}).then(x => {
          p.setModelInfo(x)
        })
      }}
      style={{width: '100%'}}
    />
  );
};

export default ModelSearchSelect;
