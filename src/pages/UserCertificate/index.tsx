import {Breadcrumb, Button, Card, Col, Divider, Form, InputNumber, Radio, Row, Select} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import React from "react";
import {history, useParams} from "umi";
import {modelServingUsingPOST} from "@/services/bigdata/bus";
import {useForm} from "antd/es/form/Form";
import Input from "antd/es/input/Input";
import {Link} from "@umijs/preset-dumi/lib/theme";

const {Option} = Select;
const UserCertificate: React.FC = () => {
  const form = useForm<any>()[0];
  form.setFieldsValue({
    user_age:1,
    user_sex:'男',
    user_work:'计算机/互联网/通信',
    user_income:1,
    user_exceed_count:1,
    user_certificate_card_num:1,
    user_certificate_card_quota:1,
    is_user_certificate_card_exceed:"true",
    user_loan:1,
    user_loan_num:1,
    is_user_load_exceed:"true",
    is_user_disease:"false",
    family_members:3,
    family_income_year:1,
    family_disposable_income:1,
    family_disease:"false",
    label:1
  })
  const params = useParams<any>();
  const handlerSubmit = (value:any) => {
    modelServingUsingPOST({busId: params.id, form: JSON.stringify(value)}).then(x => {
     history.push("/userCertificate/result/"+params.id+"/"+x)
    })
  }

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/"}><HomeOutlined/></Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          客户信用分数据分析</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        form={form}
        onFinish={handlerSubmit}
      >
        <Card title={"用户基本信息"}>
          <Row>
            <Col span={12}>
              <Form.Item label={"客户年龄"} name={"user_age"}>
                <InputNumber style={{width: 200}} min={1}/>
              </Form.Item>
              <Form.Item label={"客户性别"} name={"user_sex"}>
                <Radio.Group key={1} value={"男"} defaultValue={"男"}>
                  <Radio key={2} value={"男"}>男</Radio>
                  <Radio key={3} value={"女"}>女</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label={"客户行业"} name={"user_work"}>
                <Select defaultValue={'计算机/互联网/通信'} style={{width: 200}}>
                  <Option key={1} value={'计算机/互联网/通信'}>
                    计算机/互联网/通信
                  </Option>
                  <Option key={2} value={'生产/工艺/制造'}>
                    生产/工艺/制造
                  </Option>
                  <Option key={3} value={'医疗/护理/制药'}>
                    医疗/护理/制药
                  </Option>
                  <Option key={4} value={'金融/银行/投资/保险'}>
                    金融/银行/投资/保险
                  </Option>
                  <Option key={5} value={'商业/服务业/个人经营'}>
                    商业/服务业/个人经营
                  </Option>
                  <Option key={6} value={'文化/广告/传媒'}>
                    文化/广告/传媒
                  </Option>
                  <Option key={7} value={'娱乐/艺术/表演'}>
                    娱乐/艺术/表演
                  </Option>
                  <Option key={8} value={'律师/法务'}>
                    律师/法务
                  </Option>
                  <Option key={9} value={'教育/培训'}>
                    教育/培训
                  </Option>
                  <Option key={10} value={'公务员/行政/事业单位'}>
                    公务员/行政/事业单位
                  </Option>
                  <Option key={11} value={'模特/空姐'}>
                    模特/空姐
                  </Option>
                  <Option key={12} value={'学生'}>
                    学生
                  </Option>
                  <Option key={13} value={'其他'}>
                    其他
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item label={"客户收入"} name={"user_income"}>
                <InputNumber style={{width: 200}} min={1}/>
              </Form.Item>
              <Form.Item label={"客户信用卡逾期次数"} name={"user_exceed_count"}>
                <InputNumber style={{width: 200}} min={1}/>
              </Form.Item>
              <Form.Item label={"客户信用卡数量"} name={"user_certificate_card_num"}>
                <InputNumber style={{width: 200}} min={1}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"客户信用卡总额度"} name={"user_certificate_card_quota"}>
                <InputNumber style={{width: 200}} min={1}/>
              </Form.Item>
              <Form.Item label={"客户当前是否逾期"} name={"is_user_certificate_card_exceed"}>
                <Radio.Group key={14} value={"false"} defaultValue={"false"}>
                  <Radio key={15} value={"true"}>是</Radio>
                  <Radio key={16} value={"false"}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label={"客户贷款逾期次数"} name={"user_loan"}>
                <InputNumber style={{width: 200}} min={1}/>
              </Form.Item>
              <Form.Item label={"客户当前贷款额度"} name={"user_loan_num"}>
                <InputNumber style={{width: 200}} min={1}/>
              </Form.Item>
              <Form.Item label={"客户当前是否存在贷款逾期"} name={"is_user_load_exceed"}>
                <Radio.Group key={17} value={"false"} defaultValue={"false"}>
                  <Radio key={18} value={"true"}>是</Radio>
                  <Radio key={19} value={"false"}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label={"客户是否有重大疾病"} name={"is_user_disease"}>
                <Radio.Group key={20} value={"false"} defaultValue={"false"}>
                  <Radio key={21} value={"true"}>是</Radio>
                  <Radio key={22} value={"false"}>否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title={"用户家庭情况"}>
          <Row>
            <Col span={12}>
              <Form.Item label={"家庭成员数量"} name={"family_members"}>
                <InputNumber style={{width: 200}} min={1}/>
              </Form.Item>
              <Form.Item label={"家庭年收入"} name={"family_income_year"}>
                <InputNumber style={{width: 200}} min={1}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"家庭可支配收入"} name={"family_disposable_income"}>
                <InputNumber style={{width: 200}} min={1}/>
              </Form.Item>
              <Form.Item label={"家庭成员是否有重大疾病"} name={"family_disease"}>
                <Radio.Group key={23} value={"false"} defaultValue={"false"}>
                  <Radio key={24} value={"true"}>是</Radio>
                  <Radio key={25} value={"false"}>否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Divider/>
        <Form.Item name={"label"} hidden={true}>
          <Input value={1}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UserCertificate;
