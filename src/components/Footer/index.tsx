import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const defaultMessage ='重庆邮电大学 大数据智能计算创新研发团队';

  const currentYear = new Date().getFullYear();

  return <DefaultFooter style={{minHeight:"0.5vh"} } copyright={`2015-${currentYear} ${defaultMessage}`} links={[]} />;
};

export default Footer;
