import {request} from 'umi';

export async function userPrefrencesUsingGet(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.userPersonaGetParams,
    options?: { [key: string]: any },
  ) {
    const { username: param0, ...queryParams } = params;
    return request<API.BusResponse>(`/api/v1/rs/getItemMetadata?username=${param0}`, {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    });
  }