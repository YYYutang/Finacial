// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** tableQueryByPage GET /api/v1/table/ */
export async function tableQueryByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableQueryByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.PageInfoTableSchemaResponse>('/api/v1/table/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** createDataImportTable POST /api/v1/table/dataImport */
export async function createDataImportTableUsingPOST(
  body: API.DataImportTableCreateRequest,
  options?: { [key: string]: any },
) {
  return request<number>('/api/v1/table/dataImport', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** createFETable POST /api/v1/table/featureExtract */
export async function createFETableUsingPOST(
  body: API.FETableCreateRequest,
  options?: { [key: string]: any },
) {
  return request<number>('/api/v1/table/featureExtract', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** createMockDataTable POST /api/v1/table/mockData */
export async function createMockDataTableUsingPOST(
  body: API.MockDataTableCreateRequest,
  options?: { [key: string]: any },
) {
  return request<number>('/api/v1/table/mockData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** convertFile2Schema GET /api/v1/table/schema/${param0} */
export async function convertFile2SchemaUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.convertFile2SchemaUsingGETParams,
  options?: { [key: string]: any },
) {
  const { dfsFilePath: param0, ...queryParams } = params;
  return request<API.TableSchemaResponse>(`/api/v1/table/schema/${param0}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** tableQueryById GET /api/v1/table/${param0} */
export async function tableQueryByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tableQueryByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.TableSchemaResponse>(`/api/v1/table/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
