import {Breadcrumb, Button, Card, Col, Form, InputNumber, Row} from "antd";
import {Link} from "@umijs/preset-dumi/lib/theme";
import {HomeOutlined} from "@ant-design/icons";
import {useForm} from "antd/es/form/Form";
import {useParams} from "umi";
import {modelServingUsingPOST} from "@/services/bigdata/bus";
import {history} from "@@/core/history";
import fundData from "@/pages/Recommend/fund.json"


const Recommend = () => {
  const form = useForm<any>()[0];
  const fund: any = fundData
  console.info(fund)
  form.setFieldsValue({
    fund_id: 0
  })
  const params = useParams<any>();
  const handlerSubmit = (value: any) => {
    modelServingUsingPOST({busId: params.id, form: JSON.stringify(value)}).then(x => {
      history.push("/recommend/result/" + params.id + "/" + x)
    })
  }

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/"}><HomeOutlined/></Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          客户风险偏好数据分析与推荐系统</Breadcrumb.Item>
      </Breadcrumb>
      <Card style={{height: "70vh",width:"100%"}}>
        <Row justify={"center"} align={"middle"} style={{display: "flex",marginTop:"10vh",marginLeft:"10%"}}>
          <Col span={24} style={{alignContent:"center",justifyContent:"center",marginLeft:"45%",marginBottom:"5%"}}>
            <h1 style={{fontSize:36}}>风险偏好数据分析与风险投资产品推荐</h1>
          </Col>
          <Col span={24}>
            <Form form={form} onFinish={handlerSubmit}>
              <Row  justify={"center"} align={"middle"} style={{display: "flex"}}>
                <Col span={24}>
                  <Form.Item name={"user_id"} required={true}>
                    <InputNumber min={1} placeholder={"请输入用户ID进行推荐"} style={{width: "90%",height:"5vh",fontSize:26}}/>
                  </Form.Item>
                </Col>
                <Form.Item name={"fund_id"} hidden={true}><InputNumber/></Form.Item>
                <Col span={24} style={{marginLeft:"65%"}}>
                  <Form.Item style={{alignContent:"center",justifyContent:"center"}}>
                    <Button type={"primary"}  style={{width: "20%",height:"4vh"}} htmlType={"submit"}>推荐</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  )

}
export default Recommend;
