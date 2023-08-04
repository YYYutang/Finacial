import { useEffect, useState, useRef } from "react";
import { Link } from "@umijs/preset-dumi/lib/theme";
import { HomeOutlined } from "@ant-design/icons";

import { Breadcrumb, Divider, Radio, Form, Table, Input, Button, Tag } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { getInitialState } from '@//app'
import type { RadioChangeEvent } from 'antd';
import './index.less';
import { userPrefrencesUsingGet } from "@/services/bigdata/userPreferences";
const UserPreferences = () => {
    interface DataType {
        code: number;
        type: string;
        name: string;
        description: string;
    }
    const [form] = Form.useForm();
    const [value, setValue] = useState<any>(null);
    const [columnData, setColumnData] = useState<any>(null);
    const [nowColumnData, setNowColumnData] = useState<any>(null);


    const columns: ColumnsType<DataType> = [
        {
            title: '编码',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: (_, { type }) => (
                <>
                    {

                        function (type) {
                            let color = type == '基金' ? 'green' : 'red';
                            return (
                                <Tag color={color} key={type}>
                                    {type}
                                </Tag>
                            )
                        }(type)

                    }
                </>

            ),

        },
        {
            title: '名称',
            key: 'name',
            dataIndex: 'name',

        },
        {
            title: '描述',
            key: 'description',
            dataIndex: 'description',
        }]
    const onFinish = async (values: any) => {
        let user: any = '';
        if (values) {
            user = values['username']
        }
        else {
            const currentUser = await getInitialState()
            user = currentUser.currentUser?.adminName


        }
        await userPrefrencesUsingGet({ username: user }).then((x) => {
            setColumnData(x);
            setNowColumnData(x);

        })
    };

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
        let tempArray = [];
        if (e.target.value == "全部") {
            setNowColumnData(columnData)
        }
        else {
            columnData.forEach(element => {
                if (element.type == e.target.value) {
                    tempArray.push(element);
                }
            });
            setNowColumnData(tempArray)
        }
    };
    useEffect(() => {
        onFinish('');
    }, [])
    return (
        <div className="user-preference-container">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={"/"}><HomeOutlined /></Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    客户偏好推荐</Breadcrumb.Item>
            </Breadcrumb>
            <Divider />
            <div className="preference-input">
                <Form
                    layout="inline"
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item name="username" label="请输入要查询的用户名称" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            搜索
                        </Button>
                    </Form.Item>
                    <div className="preference-choose">
                        {nowColumnData ?

                            <Form.Item  >
                                请选择类型：
                                <Radio.Group onChange={onChange} value={value}>
                                    <Radio value={"基金"}>基金</Radio>
                                    <Radio value={"股票"}>股票</Radio>
                                    <Radio value={"全部"}>全部</Radio>
                                </Radio.Group>
                            </Form.Item> : null

                        }
                    </div>
                </Form>
            </div>
            <Divider />
            <div className="preference-info-container">
                {
                    nowColumnData ? <Table columns={columns} dataSource={nowColumnData} /> : null
                }

            </div>

        </div>
    )

}
export default UserPreferences;