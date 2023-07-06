// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** AnalyseQueryByPage GET /api/v1/analyse/ */
export async function AnalyseQueryByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AnalyseQueryByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.PageInfoBasicAnalyseResponse>('/api/v1/analyse/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateAnalyseResult POST /api/v1/analyse/ */
export async function updateAnalyseResultUsingPOST(
  body: API.UpdateAnalyseRequest,
  options?: { [key: string]: any },
) {
  return request<number>('/api/v1/analyse/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** createModelAnalyse POST /api/v1/analyse/model/ */
export async function createModelAnalyseUsingPOST(
  body: API.ModelAnalyseRequest,
  options?: { [key: string]: any },
) {
  return request<number>('/api/v1/analyse/model/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** createRuleAnalyse POST /api/v1/analyse/rule/ */
export async function createRuleAnalyseUsingPOST(
  body: API.RuleAnalyseRequest,
  options?: { [key: string]: any },
) {
  return request<number>('/api/v1/analyse/rule/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** queryAnalyseResultById GET /api/v1/analyse/${param0} */
export async function queryAnalyseResultByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryAnalyseResultByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.AnalyseResponse>(`/api/v1/analyse/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
