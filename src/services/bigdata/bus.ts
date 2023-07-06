// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** busQueryByPage GET /api/v1/bus/ */
export async function busQueryByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.busQueryByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.PageInfoBusResponse>('/api/v1/bus/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateBus PUT /api/v1/bus/ */
export async function updateBusUsingPUT(
  body: API.BusUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<number>('/api/v1/bus/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** createBus POST /api/v1/bus/ */
export async function createBusUsingPOST(
  body: API.BusCreateRequest,
  options?: { [key: string]: any },
) {
  return request<number>('/api/v1/bus/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** modelServing POST /api/v1/bus/task/ */
export async function modelServingUsingPOST(
  body: API.BusModelServingRequest,
  options?: { [key: string]: any },
) {
  return request<string>('/api/v1/bus/task/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** queryResult GET /api/v1/bus/task/${param0} */
export async function queryResultUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryResultUsingGETParams,
  options?: { [key: string]: any },
) {
  const { taskId: param0, ...queryParams } = params;
  return request<Record<string, any>>(`/api/v1/bus/task/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** offLine DELETE /api/v1/bus/${param0} */
export async function offLineUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.offLineUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { busId: param0, ...queryParams } = params;
  return request<number>(`/api/v1/bus/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** publish GET /api/v1/bus/${param1}/publish */
export async function publishUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.publishUsingGETParams,
  options?: { [key: string]: any },
) {
  const { publish: param0, busId: param1, ...queryParams } = params;
  return request<number>(`/api/v1/bus/${param1}/publish`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** busQueryById GET /api/v1/bus/${param0} */
export async function busQueryByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.busQueryByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BusResponse>(`/api/v1/bus/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
