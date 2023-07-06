import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const defaultMessage ='重庆邮电大学';

  const currentYear = new Date().getFullYear();

  return <DefaultFooter style={{minHeight:"0.5vh"} } copyright={`2015-${currentYear} ${defaultMessage}`} links={[]} />;
};

export default Footer;
