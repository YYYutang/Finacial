// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** modelQueryByPage GET /api/v1/model/ */
export async function modelQueryByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.modelQueryByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.PageInfoModelResponse>('/api/v1/model/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** createModel POST /api/v1/model/ */
export async function createModelUsingPOST(
  body: API.ModelCreateRequest,
  options?: { [key: string]: any },
) {
  return request<number>('/api/v1/model/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** modelQueryById GET /api/v1/model/${param0} */
export async function modelQueryByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.modelQueryByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ModelResponse>(`/api/v1/model/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
