import type {MenuDataItem, Settings as LayoutSettings} from '@ant-design/pro-layout';
import {PageLoading} from '@ant-design/pro-layout';
import {history, Link} from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import {BookOutlined, LinkOutlined} from '@ant-design/icons';
import {RunTimeLayoutConfig} from "@@/plugin-layout/layoutExports";
import {RequestConfig} from "@@/plugin-request/request";
import {message} from "antd";
import {getCurrentUserInfoUsingPOST} from "@//services/bigdata/login";
import {busQueryByPageUsingGET} from "@/services/bigdata/bus";

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading/>,
};


class StreamError extends Error {
  code: number
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}


export const request: RequestConfig = {
  errorHandler: (error: unknown) => {
    if (error instanceof StreamError) {
      if (error.code == 403) {
        history.push("/user/login")
      }
      message.error(error.message);
    }
    if (error instanceof Error) {
      throw error
    }
  },
  middlewares: [
    async (ctx, next) => {
      await next();
      const {req, res} = ctx;
      const {options} = req;
      const {getResponse} = options;
      const resData = getResponse ? res.data : res;
      if (resData.success == false) {
        throw new StreamError(resData.errorMessage, resData.errorCode);
      }
    }
  ],
  requestInterceptors: [
    (url: string, options: RequestConfig) => {
      options.headers = {
        ...options.headers,
        "Authorization": localStorage.getItem("token") || ""
      }
      return {url, options: options}
    }
  ]
}

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

type initialStateType={
  settings?: Partial<LayoutSettings>;
  currentUser?: API.AdminUserResponse;
  fetchUserInfo?: () => Promise<API.AdminUserResponse | undefined>;
}
export async function getInitialState(): Promise<initialStateType> {
  const fetchUserInfo = async () => {
    try {
      let localToken = localStorage.getItem("token")
      if(localToken==null || localToken==""){
        history.push(loginPath);
        return
      }
      const msg = await getCurrentUserInfoUsingPOST(localToken || "");
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}


// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({initialState}) => {


  return {
    rightContentRender: () => <RightContent/>,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.adminName,
    },
    footerRender: () => <Footer/>,
    onPageChange: () => {
      const {location} = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    menu:{
      request:async (params: Record<string, any>, defaultMenuData: MenuDataItem[])=>{
        let menus:MenuDataItem[]=[]
        let bus:API.PageInfoBusResponse= await busQueryByPageUsingGET({pageNo:1,pageSize:10})
        bus.list?.forEach(x=>{
          menus.push({
            path:x.busUri+"/"+x.busId,
            name:x.busName,
            exact:true
          })
        })

     
        return defaultMenuData.concat(menus)
        
      }
    },
    links: isDev ? [
        <Link to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined/>
          <span>OpenAPI 文档</span>
        </Link>,
        <Link to="/~docs">
          <BookOutlined/>
          <span>业务组件文档</span>
        </Link>,
      ]:[],
    menuHeaderRender: undefined,
    // // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // // 增加一个 loading 的状态
    // childrenRender: (children) => {
    //   if (initialState.loading) return <PageLoading />;
    //   return children;
    // },
    ...initialState?.settings,
  };
};
