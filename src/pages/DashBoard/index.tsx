import {Card, Col, Row} from "antd";
import TaskStatistic from "@/pages/DashBoard/component/StatsticBoard/TaskStatistic";
import TableStatistic from "@/pages/DashBoard/component/StatsticBoard/TableStatistic";
import Trend from "@/pages/DashBoard/component/Trend";
import {Tabs} from 'antd';
import TaskTypeRateBoard from "@/pages/DashBoard/component/TaskTypeRateBoard";
import {useEffect, useState} from "react";
import {dashBoardUsingGET} from "@/services/bigdata/chartController";

const {TabPane} = Tabs;
const DashBoard = () => {
  const [dashBoardDate, setDashBoardDate] = useState<API.MonitorChartResponse>();
  const queryData = () => {
    dashBoardUsingGET().then(
      x => {
        setDashBoardDate(x)
      }
    )
  }
  useEffect(() => {
    queryData()
    let timer = setInterval(queryData, 12000);
    return () => {
      clearInterval(timer)
    }
  }, [])


  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Card>
          {
            dashBoardDate && dashBoardDate.taskStatistic &&
            (
              <TaskStatistic
                total={dashBoardDate.taskStatistic.total}
                success={dashBoardDate.taskStatistic.success}
                error={dashBoardDate.taskStatistic.error}
                chartData={dashBoardDate.taskStatistic.chartData}
              />
            )
          }

        </Card>
      </Col>

      <Col span={12}>
        <Card>
          {
            dashBoardDate && dashBoardDate.tableStatistic && (
              <TableStatistic
                total={dashBoardDate.tableStatistic.total}
                chartData={dashBoardDate.tableStatistic.chartData}
                increase={dashBoardDate.tableStatistic.increase}
              />
            )
          }
        </Card>
      </Col>
      <Col span={24}>
        <Card>
          <Tabs defaultActiveKey="1">
            <TabPane tab={"任务执行趋势"} key={"1"}>
              {dashBoardDate && dashBoardDate.taskTrend && (
                <Trend
                  idx={2}
                  title={"任务执行趋势"}
                  pieChartData={dashBoardDate.taskTrend.pieChartData || []}
                  trendChartData={dashBoardDate.taskTrend.trendChartData || []}
                  typeTrendChartData={dashBoardDate.taskTrend.typeTrendChartData || []}
                />)}
            </TabPane>
            <TabPane tab="表格存量" key="2">
              {dashBoardDate && dashBoardDate.tableTrend && (
                <Trend
                  idx={1}
                  title={"表格存量"}
                  pieChartData={dashBoardDate.tableTrend.pieChartData || []}
                  trendChartData={dashBoardDate.tableTrend.trendChartData || []}
                  typeTrendChartData={dashBoardDate.tableTrend.typeTrendChartData || []}
                />
              )}

            </TabPane>

          </Tabs>
        </Card>
      </Col>
      <Col span={24}>
        <Card title={"各类型任务成功率"}>
          <Row gutter={[120, 16]}>
            {
              dashBoardDate && dashBoardDate.taskTypeRate && dashBoardDate.taskTypeRate.map((x, idx) => {
                return (
                  <Col span={4} key={idx}>
                    <TaskTypeRateBoard rate={x.rate || 0} title={x.type || ""} idx={idx}/>
                  </Col>
                )
              })
            }
          </Row>
        </Card>
      </Col>
    </Row>
  )
}
export default DashBoard;
