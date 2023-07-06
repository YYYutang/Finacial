import { useEffect, useState, useRef } from "react";
import { Link } from "@umijs/preset-dumi/lib/theme";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Card, Col, Form, Row, Input, Descriptions, Empty } from "antd";
import './index.less';

const UserPreferences = () => {

    return (
        <div className="user-preference-container">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={"/"}><HomeOutlined /></Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    偏好推荐</Breadcrumb.Item>
            </Breadcrumb>
            <h1>test</h1>
            

        </div>
    )

}
export default UserPreferences;