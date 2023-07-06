// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** fileDownload GET /api/v1/file/ */
export async function fileDownloadUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.fileDownloadUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/file/', {
    responseType:"blob",
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** uploadChunk POST /api/v1/file/chunk/ */
export async function uploadChunkUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadChunkUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/api/v1/file/chunk/', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** checkChunk GET /api/v1/file/chunk/${param0}/${param1} */
export async function checkChunkUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkChunkUsingGETParams,
  options?: { [key: string]: any },
) {
  const { hash: param0, chunkIdx: param1, ...queryParams } = params;
  return request<boolean>(`/api/v1/file/chunk/${param0}/${param1}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** mergeFile POST /api/v1/file/merge */
export async function mergeFileUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.mergeFileUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/v1/file/merge', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
