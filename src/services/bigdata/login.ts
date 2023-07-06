// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前用户信息 POST /api/v1/ */
export async function getCurrentUserInfoUsingPOST(body: string, options?: { [key: string]: any }) {
  return request<API.ResponseResultCommon>('/api/v1/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 跳转至login页面 GET /api/v1/login */
export async function loginUsingGET(options?: { [key: string]: any }) {
  return request<API.ResponseResultCommon>('/api/v1/login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登陆接口 POST /api/v1/login */
export async function loginUsingPOST(body: API.LoginRequest, options?: { [key: string]: any }) {
  return request<API.ResponseResultCommon>('/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 登出接口 DELETE /api/v1/${param0} */
export async function loginOutUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loginOutUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { token: param0, ...queryParams } = params;
  return request<API.ResponseResultCommon>(`/api/v1/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
