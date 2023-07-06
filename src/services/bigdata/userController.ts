// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** userQueryByPage GET /api/v1/user/ */
export async function userQueryByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userQueryByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.PageInfoAdminUserResponse>('/api/v1/user/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** activeUser PUT /api/v1/user/active */
export async function activeUserUsingPUT(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.activeUserUsingPUTParams,
  options?: { [key: string]: any },
) {
  return request<number>('/api/v1/user/active', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** postpone PUT /api/v1/user/postpone */
export async function postponeUsingPUT(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postponeUsingPUTParams,
  options?: { [key: string]: any },
) {
  return request<number>('/api/v1/user/postpone', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** register POST /api/v1/user/register */
export async function registerUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.registerUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<number>('/api/v1/user/register', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** disableUser DELETE /api/v1/user/${param0} */
export async function disableUserUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.disableUserUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<number>(`/api/v1/user/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
