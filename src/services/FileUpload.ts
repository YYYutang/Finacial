import {request} from "@@/plugin-request/request";

/** uploadChunk POST /api/v1/file/chunk/ */
export async function uploadChunkUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: FormData,
  options?: { [key: string]: any },
) {
  return request<boolean>('/api/v1/file/chunk/', {
    method: 'POST',
    body:params,
    ...(options || {}),
  });
}
