import {Breadcrumb, Card, Col, Rate, Row, Spin} from "antd";
import {Link} from "@umijs/preset-dumi/lib/theme";
import {HomeOutlined} from "@ant-design/icons";
import {useParams} from "umi";
import {useEffect, useState} from "react";
import {queryResultUsingGET} from "@/services/bigdata/bus";
import {toNumber} from "lodash";
import fundData from "@/pages/Recommend/fund.json"

const RecommendResult = () => {
  const params = useParams<any>();
  const [result, setResult] = useState<any[]>()
  const [loading, setLoading] = useState<boolean>(true);
  const queryData = () => {
    console.info(fundData)
    let timer = setInterval(() => {
      queryResultUsingGET(
        {taskId: params.taskId}).then(
        (x) => {
          if (x) {
            setLoading(false)
            let resultList = x["recommendations"].split("|")
            let results = []
            for (let i = 0; i < resultList.length; i++) {
              let item = resultList[i].split(",")
              results.push({
                fund_id: toNumber(item[0]),
                score: toNumber(item[1])
              });
            }
            console.info(results)
            setResult(results)
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
          <Link to={"/"}><HomeOutlined/></Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={"/recommend/" + params.busId}>客户风险偏好数据分析与推荐系统</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          推荐结果
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card style={{minHeight: "80vh"}}>
        {result &&
        <Row gutter={[16,16]}>
          {
            result.map(
              (x, idx) => {
                return (
                  <Col key={idx} span={6}>
                    <Card style={{height:"28vh"}} title={<div><div>{fundData[x["fund_id"]+""]["fundCode"]+"-"+fundData[x["fund_id"]+""]["fundName"]}</div><div>推荐等級 <Rate allowHalf={true} value={x['score']*5}/></div></div>} hoverable={true}>
                      <Row gutter={[16,15]}>
                        <Col span={24}>
                          基金发行公司:{fundData[x["fund_id"]+""]["trusteeName"]}
                        </Col>
                        <Col span={24}>
                          基金所在板块:{fundData[x["fund_id"]+""]["fundAbbr"]}
                      </Col>
                        <Col span={24}>
                        基金管理公司:{fundData[x["fund_id"]+""]["companyName"]}
                      </Col>
                        {
                          fundData[x["fund_id"]+""]["fundManager"]&&<Col span={24}>
                            基金经理:{fundData[x["fund_id"]+""]["fundManager"]}
                          </Col>
                        }
                      </Row>
                    </Card>
                  </Col>
                )
              }
            )
          }
        </Row>}
      </Card>
    </Spin>
  )
}
export default RecommendResult;
