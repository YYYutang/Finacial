import { Breadcrumb, Button, Card, Col, Form, Row, Input, Descriptions, Empty } from "antd";
import { Link } from "@umijs/preset-dumi/lib/theme";
import { HomeOutlined } from "@ant-design/icons";
import { userPersonaUsingGet } from "@/services/bigdata/user";
import { useEffect, useState, useRef } from "react";
import { Chart, registerShape } from '@antv/g2';
import { clearConfigCache } from "prettier";
import './index.less'

const UserPersona = () => {
    const [form] = Form.useForm();
    const [userInfo, setUserInfo] = useState<any>(null);
    const chartRef = useRef<any>(null);
    const onFinish = (values: any) => {
        console.log(values);
        userPersonaUsingGet({ username: values['username'] }).then((x: any) => {
            setUserInfo(x);
            if(!chartRef.current) {
                if(x) {
                renderChart(x.creditScore)
                }
            }else {
                if(!x) {
                    chartRef.current.changeVisible(false);
                }else {
                    chartRef.current.changeVisible(true);
                chartRef.current.changeData([{ value: x.creditScore }]);
                }
            }
        })
    };

    const renderChart = (score: any) => {
        // 自定义Shape 部分
        registerShape('point', 'pointer', {
            draw(cfg, container) {
                const group = container.addGroup();
                const center = this.parsePoint({ x: 0, y: 0 }); // 获取极坐标系下画布中心点
                // 绘制指针
                group.addShape('line', {
                    attrs: {
                        x1: center.x,
                        y1: center.y,
                        x2: cfg.x,
                        y2: cfg.y,
                        stroke: cfg.color,
                        lineWidth: 5,
                        lineCap: 'round',
                    },
                });
                group.addShape('circle', {
                    attrs: {
                        x: center.x,
                        y: center.y,
                        r: 9.75,
                        stroke: cfg.color,
                        lineWidth: 4.5,
                        fill: '#fff',
                    },
                });

                return group;
            },
        });

        const data = [{ value: score }];
        const chart = new Chart({
            container: 'chartGauge',
            autoFit: true,
            height: 500,
            padding: [0, 0, 30, 0],
        });
        chartRef.current = chart
        console.log(chart)
        chart.data(data);
        chart.scale('value', {
            // min: 0,
            // max: 10,
            ticks: [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360],
            tickInterval: 1,
            nice: false
        });
        chart.coordinate('polar', {
            startAngle: (-8.5 / 8) * Math.PI,
            endAngle: (1 / 8) * Math.PI,
            radius: 0.75,
        });

        chart.axis('1', false);
        chart.axis('value', {
            line: null,
            label: {
                offset: -36,
                style: {
                    fontSize: 18,
                    textAlign: 'center',
                    textBaseline: 'middle',
                },
            },
            subTickLine: {
                count: 4,
                length: -15,
            },
            tickLine: {
                length: -24,
            },
            grid: null,
        });
        chart.legend(false);
        chart
            .point()
            .position('value*1')
            .shape('pointer')
            .color('#1890FF')
            .animate({
                appear: {
                    animation: 'fade-in'
                }
            });

        // 绘制仪表盘背景
        chart.annotation().arc({
            top: false,
            start: [0, 1],
            end: [9, 1],
            style: {
                // 底灰色
                stroke: '#CBCBCB',
                lineWidth: 18,
                lineDash: null,
            },
        });

        // 绘制指标
        chart.annotation().arc({
            start: [0, 1],
            end: [data[0].value, 1],
            style: {
                stroke: '#1890FF',
                lineWidth: 18,
                lineDash: null,
            },
        });
        // 绘制指标数字
        chart.annotation().text({
            position: ['50%', '85%'],
            content: '信用分数',
            style: {
                fontSize: 20,
                fill: '#545454',
                textAlign: 'center',
            },
        });
        chart.annotation().text({
            position: ['50%', '90%'],
            content: `${data[0].value}`,
            style: {
                fontSize: 36,
                fill: '#545454',
                textAlign: 'center',
            },
            offsetY: 15,
        });

        chart.render();

      
    }


    useEffect(() => {
    }, [])

    return (
        <div className="user-persona-container">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={"/"}><HomeOutlined /></Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    用户画像</Breadcrumb.Item>
            </Breadcrumb>
            <div className="persona-input">
                <Form

                    layout="inline"
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item name="username" label="请输入用户名称" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            搜索
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <div className="persona-info-container">
               
                <div id="chartGauge" className="gauge-container"></div>
                {
                    userInfo?
                <>
                <div className="persona-description">
                            <Descriptions title="用户画像" bordered>
                                <Descriptions.Item label="用户名">{userInfo.userName || ''}</Descriptions.Item>
                                <Descriptions.Item label="性别">{userInfo.gender || ''}</Descriptions.Item>
                                <Descriptions.Item label="年龄">{userInfo.age}</Descriptions.Item>
                                <Descriptions.Item label="婚姻状况">{userInfo.marital}</Descriptions.Item>
                                <Descriptions.Item label="职位">
                                    {userInfo.occupation}
                                </Descriptions.Item>
                                <Descriptions.Item label="学位">
                                   {userInfo.schooling}
                                </Descriptions.Item>
                                <Descriptions.Item label="信用分">
                                   {userInfo.creditScore}
                                </Descriptions.Item>
                                <Descriptions.Item label="信用描述">
                                   {userInfo.creditDescription}
                                </Descriptions.Item>
                                <Descriptions.Item label="风险等级">
                                   {userInfo.riskRating+1}
                                </Descriptions.Item>
                                <Descriptions.Item label="风险描述">
                                    {userInfo.riskDescription}
                                </Descriptions.Item>
                            </Descriptions>
                </div>
                </> :   <div className="empty-div"> <Empty description="搜索用户数据后展示用户画像"/></div>
                }
            </div>

        </div>
    )

}
export default UserPersona;

