import {useParams} from "umi";
import React, {useEffect, useState} from "react";
import {queryResultUsingGET} from "@/services/bigdata/bus";
import {Breadcrumb, Card, Col, Divider, Row, Space, Spin, Typography} from "antd";
import GResult from "@/pages/UserCertificate/Result/GResult";
import {toNumber} from "lodash";
import RadarChartResult from "@/pages/UserCertificate/Result/RadarChartResult";
import {HomeOutlined} from "@ant-design/icons";
import {Link} from "@umijs/preset-dumi/lib/theme";

const {Paragraph, Text} = Typography;
type resultType = {
  prediction: number,
  family_disposable_income: number,
  user_certificate_card_num: number,
  user_certificate_card_quota: number,
  user_exceed_count: number,
  user_income: number,
  user_loan: number
}
const UserCertificateResult:React.FC = () => {

  const params = useParams<any>();
  const [result, setResult] = useState<resultType>()
  const [loading, setLoading] = useState<boolean>(true);
  const queryData = () => {
    let timer = setInterval(() => {
      queryResultUsingGET(
        {taskId: params.taskId}).then(
        x => {
          if (x) {
            setLoading(false)
            setResult({
              prediction: x.prediction,
              family_disposable_income: x.family_disposable_income,
              user_certificate_card_num: x.user_certificate_card_num,
              user_certificate_card_quota: x.user_certificate_card_quota,
              user_exceed_count: x.user_exceed_count,
              user_income: x.user_income,
              user_loan: x.user_loan
            })
            clearInterval(timer)
          }
        })
    }, 1000)

  }
  useEffect(() => {
    queryData()
  }, [params])

  return (
    <Spin spinning={loading} tip={"计算中请稍后"}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/"}>
            <HomeOutlined/></Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item><Link to={"/userCertificate/"+params.busId}>客户信用分数据分析</Link></Breadcrumb.Item>
        <Breadcrumb.Item>客户信用分析结果</Breadcrumb.Item>
      </Breadcrumb>
      <Card style={{height: "80vh"}}>
        {result && <Row>
          <Col span={12}>
              {result && <GResult data={[{value: toNumber(result.prediction.toFixed(0))}]}/>}
          </Col>
          <Col span={6}>
            <Paragraph>
              用户信用分:
              <Paragraph strong>{result.prediction.toFixed(0)}</Paragraph>
              用户信用等级:
              <Paragraph strong>{
                result.prediction <= 1000 && result.prediction > 800 && "AAA" ||
                result.prediction <= 800 && result.prediction > 700 && "AA" ||
                result.prediction <= 700 && result.prediction > 600 && "A" ||
                result.prediction <= 600 && result.prediction > 500 && "BBB" ||
                result.prediction <= 500 && result.prediction > 400 && "BB" ||
                result.prediction <= 400 && result.prediction > 300 && "B" ||
                result.prediction <= 300 && result.prediction > 200 && "CCC" ||
                result.prediction <= 200 && result.prediction > 100 && "CC" ||
                result.prediction <= 100 && result.prediction > 0 && "C"
              }</Paragraph>
              用户信用记录:
              <Paragraph strong>{
                result.prediction <= 1000 && result.prediction > 800 && "信用极好" ||
                result.prediction <= 800 && result.prediction > 700 && "信用优良" ||
                result.prediction <= 700 && result.prediction > 600 && "信用较好" ||
                result.prediction <= 600 && result.prediction > 500 && "信用一般" ||
                result.prediction <= 500 && result.prediction > 400 && "信用欠佳" ||
                result.prediction <= 400 && result.prediction > 300 && "信用较差" ||
                result.prediction <= 300 && result.prediction > 200 && "信用很差" ||
                result.prediction <= 200 && result.prediction > 100 && "信用极差" ||
                result.prediction <= 100 && result.prediction > 0 && "没有信用"
              }</Paragraph>
              用户信用能力:
              <Paragraph strong>{
                result.prediction <= 1000 && result.prediction > 800 && "很强" ||
                result.prediction <= 800 && result.prediction > 700 && "可靠" ||
                result.prediction <= 700 && result.prediction > 600 && "较稳定" ||
                result.prediction <= 600 && result.prediction > 500 && "基本稳定" ||
                result.prediction <= 500 && result.prediction > 400 && "不稳定" ||
                result.prediction <= 400 && result.prediction > 300 && "较低" ||
                result.prediction <= 300 && result.prediction > 200 && "很低" ||
                result.prediction <= 200 && result.prediction > 100 && "基本无能力" ||
                result.prediction <= 100 && result.prediction > 0 && "无能力"
              }</Paragraph>
              用户风险程度:
              <Paragraph strong>{
                result.prediction <= 1000 && result.prediction > 800 && "几乎无风险" ||
                result.prediction <= 800 && result.prediction > 700 && "基本无风险" ||
                result.prediction <= 700 && result.prediction > 600 && "可能有波动，风险较小" ||
                result.prediction <= 600 && result.prediction > 500 && "有一定风险" ||
                result.prediction <= 500 && result.prediction > 400 && "有较大风险" ||
                result.prediction <= 400 && result.prediction > 300 && "有很大风险" ||
                result.prediction <= 300 && result.prediction > 200 && "有重大风险" ||
                result.prediction <= 200 && result.prediction > 100 && "有极大风险" ||
                result.prediction <= 100 && result.prediction > 0 && "充满风险"
              }</Paragraph>
            </Paragraph>
          </Col>
          <Divider/>
          <Col span={12}>
              <Typography>
                <Paragraph>
                  <ul>
                    <li>
                      <Space direction="vertical">
                        <Text strong>可支配收入</Text>
                        考察消费者个人收入情况和家庭条件等环境因素对个人收入的影响程度。</Space>
                    </li>
                    <li><Space direction="vertical">
                      <Text strong>信用历史</Text>
                      各类信贷产品当前和历史的还款情况、逾期还款的细节、按时还款的次数、拥有良好还款记录的信贷账户个数等等。</Space>
                    </li>
                    <li><Space direction="vertical">
                      <Text strong>逾期情况</Text>
                      各类信贷产品的信贷额度、当前余额；当前总负债额度和比例；有贷款余额的产品数量等等。</Space>
                    </li>
                    <li><Space direction="vertical">
                      <Text strong>负债水平</Text>
                      所有信贷产品的平均账龄、某特定类型产品的账龄等等。相较前两类信息而言，此类信息在总体评估中占的比重较轻。</Space>
                    </li>
                    <li><Space direction="vertical">
                      <Text strong>贷款情况</Text>
                      最近一段时期有多少新开立的信贷产品；最近申请了多少次信贷产品等等。相较前两类信息而言，此类信息在总体评估中占的比重较轻。</Space>
                    </li>
                  </ul>
                </Paragraph>
              </Typography>
          </Col> <Col span={12}>
            {result && <RadarChartResult data={[
              {item: "可支配收入", value: result.family_disposable_income},
              {item: "信用历史", value: result.user_certificate_card_num},
              {item: "逾期情况", value: result.user_certificate_card_quota},
              {item: "负债水平", value: result.user_income},
              {item: "贷款情况", value: result.user_loan}
            ]}/>}
        </Col>

        </Row>}
      </Card>
    </Spin>
  )

}
export default UserCertificateResult;
