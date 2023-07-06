import {Button, Card, Col, Form, Row, Switch} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import AnalyseChartInfo from "@/pages/AnalyseManager/Add/ChartInfo/Column";

type prop = {
  tableInfo: API.TableSchemaResponse
}
export default function (p: prop) {
  return (
    <>
      <Card>
          <Form.Item label={"基础数据展示"} tooltip={"根据各标签展示10条基础数据"} name={"includeBasicInfo"}>
            <Switch/>
          </Form.Item>
      </Card>
      <Card title={"下钻分析"}>
        <Form.List name={"charts"}>
          {(fields, {add, remove}) => (
            <>
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                  icon={<PlusOutlined/>}
                >
                  添加统计图
                </Button>
              </Form.Item>
              <Row gutter={[20, 20]}>
                {fields.map(({key, name}) => {
                  return (

                    <Col span={24}>
                      <AnalyseChartInfo name={name} key={key} tableInfo={p.tableInfo}/>
                      <Button onClick={
                        () => {
                          remove(name)
                        }
                      }>删除</Button>
                    </Col>
                  )
                })
                }
              </Row>
            </>
          )}
        </Form.List>
      </Card>
    </>
  )
}
