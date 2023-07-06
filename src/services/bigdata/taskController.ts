// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** queryTaskByTaskTypeAndBizId GET /api/v1/task/${param1}/${param0} */
export async function queryTaskByTaskTypeAndBizIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryTaskByTaskTypeAndBizIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { bizId: param0, taskType: param1, ...queryParams } = params;
  return request<API.taskResponse>(`/api/v1/task/${param1}/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
