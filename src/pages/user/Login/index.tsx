import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Col, Form, Input, message, Row, Tabs } from 'antd';
import React, { useState } from 'react';
import { history, useModel } from 'umi';
import Footer from '@/components/Footer';
import { useForm } from 'antd/es/form/Form';
import background from './background.jpg';
import { registerUsingPOST } from '@/services/bigdata/userController';
import { loginUsingPOST } from '@/services/bigdata/login';

const { TabPane } = Tabs;

type loginState = {
  status: string;
  type: string;
  msg: string;
};

const Login: React.FC = () => {
  const [formState, setFormState] = useState<loginState>({ status: '', msg: '', type: 'login' });
  const { initialState, setInitialState } = useModel('@@initialState');
  const loginForm = useForm<API.LoginRequest>()[0];
  const registerForm = useForm<API.registerUsingPOSTParams>()[0];

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handlerRegister = async () => {
    try {
      let x = await registerUsingPOST(registerForm.getFieldsValue());
      if (x > 0) {
        message.success('注册成功');
        setFormState({ status: '', msg: '', type: 'login' });
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setFormState({ status: 'error' + '', msg: e.message + '', type: 'register' });
      } else throw e;
    }
  };

  const handleSubmit = async (values: API.LoginRequest) => {
    try {
      // 登录
      const msg = await loginUsingPOST(values);
      if (msg.success) {
        const defaultLoginSuccessMessage = '登陆成功';
        localStorage.setItem('token', msg.data?.token);
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }
      // 如果失败去设置用户错误信息
      setFormState({ status: 'error', msg: msg?.errorMessage || '', type: 'login' });
    } catch (error) {
      if (error instanceof Error) {
        setFormState({ status: 'error' + '', msg: error.message + '' || '', type: 'login' });
      }
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: 'black',
          opacity: 1,
          zIndex: -1,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }}
      >
        <div
          style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            width: '100%',
            height: '100vh',
            zIndex: -2,
          }}
        ></div>
      </div>
      <Row
        align={'middle'}
        justify={'center'}
        style={{
          minHeight: '92.7vh',
        }}
      >
        <Col span={2} />
        <Col span={12} style={{ opacity: 0.6 }}>
          <p
            style={{
              fontSize: '6vh',
              color: 'lightyellow',
              textShadow: 'rgba(255,255,255,0.5) 0 5px 6px, rgba(255,255,255,0.2) 1px 3px 3px',
            }}
          >
            面向金融行业数据的离线分析系统
          </p>
          <p
            style={{
              fontSize: '2vh',
              color: 'lightyellow',
              textShadow: 'rgba(255,255,255,0.5) 0 5px 6px, rgba(255,255,255,0.2) 1px 3px 3px',
            }}
          >
            重庆邮电大学
          </p>
        </Col>
        <Col span={3} />
        <Col span={5}>
          <Card>
            {formState.status == 'error' && <Alert type={'error'} message={formState.msg} />}
            <Tabs
              defaultActiveKey={formState.type}
              activeKey={formState.type}
              onChange={(key) => {
                loginForm.resetFields();
                registerForm.resetFields();
                setFormState({ type: key, msg: '', status: '' });
              }}
            >
              <TabPane tab={'登陆'} key={'login'}>
                <Form form={loginForm} onFinish={handleSubmit}>
                  <Form.Item
                    name={'adminName'}
                    wrapperCol={{ offset: 0, span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: '请输入用户名',
                      },
                      {
                        type: 'email',
                        message: '请遵守邮箱格式！',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="用户名"
                    />
                  </Form.Item>
                  <Form.Item
                    name={'adminPasswd'}
                    wrapperCol={{ offset: 0, span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: '请输入密码',
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="密码"
                    />
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 9, span: 24 }}>
                    <Button type="primary" htmlType="submit">
                      登陆
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
              <TabPane tab={'注册'} key={'register'}>
                <Form form={registerForm} onFinish={handlerRegister}>
                  <Form.Item
                    name={'adminName'}
                    wrapperCol={{ offset: 0, span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: '请输入用户名',
                      },
                      {
                        type: 'email',
                        message: '请遵守邮箱格式！',
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="用户名"
                    />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: '请输入密码!',
                      },
                      {
                        max: 16,
                        message: '密码最多16位',
                      },
                      {
                        min: 6,
                        message: '密码最少6位',
                      },
                    ]}
                    hasFeedback
                    name={'adminPasswd'}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder={'密码'} />
                  </Form.Item>

                  <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: '请再次输入密码!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('adminPasswd') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('两次密码输入不一致'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder={'请再次输入密码'} />
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 9, span: 24 }}>
                    <Button type="primary" htmlType="submit">
                      注册
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
        <Col span={1} />
      </Row>
      <Footer />
    </div>
  );
};

export default Login;
