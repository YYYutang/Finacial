// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** dashBoard GET /api/v1/chart/dashBoard */
export async function dashBoardUsingGET(options?: { [key: string]: any }) {
  return request<API.MonitorChartResponse>('/api/v1/chart/dashBoard', {
    method: 'GET',
    ...(options || {}),
  });
}
