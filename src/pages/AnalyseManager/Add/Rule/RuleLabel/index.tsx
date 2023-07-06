import {Button, Card, Col, Form, message, Space} from "antd";
import React from "react";
import {MinusCircleOutlined} from "@ant-design/icons";
import ColumnInfo from "@/pages/AnalyseManager/Add/Rule/RuleLabel/Column";
import Input from "antd/es/input/Input";

type prop = {
  name: number,
  key: number,
  tableInfo: API.TableSchemaResponse
}
const RuleLabel: React.FC<prop> = (p) => {
  const usingRules = Array()
  const rules = new Set<string>()
  const updateUsingRule = () => {
  }
  return (
    <Space>

      <Form.Item
        label={"标签"}
        name={[p.name, 'ruleLabel']}
        rules={[{required: true, message: '请输入标签'}]}
      >
        <Input type={"text"} placeholder={"请输入标签"}/>
      </Form.Item>
      <Card>
        <Form.List name={[p.name, "ruleItems"]}>
          {(fields, {add, remove}) => (
            <>
              <Form.Item>
                <Button onClick={() => {
                  add()
                }}>添加规则</Button>
              </Form.Item>
                {
                  fields.map((key, name) => {
                      rules.add("rule" + name)
                      return (
                        <Col span={24}>
                          <Card>
                            <Space
                              style={{display: 'flex', marginBottom: 8}}
                              align="baseline"
                            >
                              <ColumnInfo
                                name={name}
                                tableColumns={p.tableInfo.tableColumns || []}
                                rule={Array.from<string>(rules.values())}
                                updateUsingRule={updateUsingRule}
                              />
                              <MinusCircleOutlined onClick={
                                () => {
                                  if ("rule" + name in usingRules) {
                                    message.error("该规则使用中，不允许删除!")
                                    return
                                  }
                                  rules.delete("rule" + name)
                                  remove(name)
                                }
                              }/>
                            </Space>

                          </Card>
                        </Col>
                      );
                    }
                  )
                }
            </>

          )


          }
        </Form.List>

      </Card>
    </Space>
  )
}

export default RuleLabel;
