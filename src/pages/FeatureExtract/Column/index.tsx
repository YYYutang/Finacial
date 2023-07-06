import {Form, Select, Space} from "antd";
import Input from "antd/es/input/Input";
import React, {useState} from "react";

type props = {
  name: number;
  key: number;
  tableColumns: API.TableColumnResponse[];
}


const ColumnInfo: React.FC<props> = (p) => {

  const operator = [
    {value: 'log', label: "Log"},
    {value: 'add', label: "加"},
    {value: 'div', label: "除"},
    {value: 'one_hot', label: "OneHot编码"},
    {value: 'label_encoder', label: "Label编码"},
    {value: 'direct', label: "保持"}
  ]

  const operator_type = {
    "log": "cdouble",
    "add": "cdouble",
    "div": "cdouble",
    "one_hot": "cstring",
    "label_encoder": "cinteger",
    "direct": "cstring"
  }

  const accept = {
    log: ["cdouble", "cinteger"],
    add: ["cdouble", "cinteger"],
    div: ["cdouble", "cinteger"],
    one_hot: ["cenum", "cdate"],
    label_encoder: ["cenum", "cdate"],
    direct: ["cdouble", "cinteger", "cenum", "cdate"],
  }

  const allowMultiple = [ "add", "div"]
  const [mode, setMode] = useState(1)
  const [columnOption, setColumnOption] = useState([{}])
  const [columnType, setColumnType] = useState<string>("cstring")

  return (
    <>
      <Space style={{display: 'flex', marginBottom: 8}} key={p.key} align="baseline">
        <Form.Item
          label={"列" + (p.name + 1)}
          name={[p.name, 'columnName']}
          rules={[{required: true, message: '请输入列名'}]} key={p.key}
        >
          <Input placeholder="列名"/>
        </Form.Item>

        <Form.Item

          label={"特征提取算子"}
          name={[p.name, 'feOperator']}
          rules={[{required: true, message: '请选择特征提取算子'}]} key={p.key}
        >
          <Select
            options={operator}
            style={{width: 150}}
            onChange={(value, option) => {
              const acceptType = accept[value]

              if (allowMultiple.includes(value)) {
                console.info(value)
                setMode(10)
              } else {
                setMode(1)
              }
              console.info(operator_type[value])
              setColumnType(operator_type[value])
              setColumnOption(
                p.tableColumns.filter(
                  x => x?.columnType || "" in acceptType
                ).map(
                  x => {
                    return {label: x.columnName + ":" + x.columnDescription, value: x.columnId}
                  }
                )
              )
            }}/>
        </Form.Item>
        {
          columnOption && (
            <Form.Item name={[p.name, "feInputColumns"]} label={"计算列"} rules={[
              {required: true, message: '请选择至少一列'},
              {

                validator:(r,v)=>{
                  if(v.length>mode){
                    return Promise.reject("最多选择"+mode+"列")
                  }
                  return Promise.resolve()
            }
              }
            ]
            }
                       key={p.key}>
              <Select
                mode={"multiple"}
                options={columnOption}
                style={{width: 250}}
              />
            </Form.Item>
          )
        }
        <Form.Item
          label={"列注释"}
          name={[p.name, 'columnDescription']}
          rules={[{required: true, message: '请输入列注释'}]} key={p.key}
        >
          <Input placeholder="列注释" style={{width: 150}}/>
        </Form.Item>
        <Form.Item
          hidden={true}
          name={[p.name, "columnType"]} key={p.key}
        >
          <Input value={columnType} placeholder={columnType}/>
        </Form.Item>
      </Space>
    </>
  )

}

export default ColumnInfo;
