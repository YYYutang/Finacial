declare namespace API {
  type AdminUser = {
    adminId?: number;
    adminName?: string;
    adminPasswd?: string;
    adminTitle?: string;
    expiredTime?: string;
    lastLoginIp?: string;
    lastLoginTime?: string;
    userState?: 'active' | 'disable' | 'expired' | 'pending';
  };

  type AdminUserResponse = {
    adminId?: number;
    adminName?: string;
    adminTitle?: string;
    expiredTime?: string;
    userState?: 'active' | 'disable' | 'expired' | 'pending';
  };

  type AnalyseRequest = {
    analyseDesc?: string;
    analyseId?: number;
    analyseName?: string;
    charts?: Record<string, any>[];
    includeBasicInfo?: boolean;
    resultSynUrl?: string;
    tableName?: string;
    token?: string;
  };

  type AnalyseResponse = {
    analyseDesc?: string;
    analyseId?: number;
    analyseName?: string;
    analyseResult?: AnalyseResult;
    analyseState?: 'error' | 'running' | 'success';
    analyseType?: 'model' | 'rule';
  };

  type AnalyseResult = {
    baseCharts?: CustomerDefinitionChart[];
    basicRow?: Record<string, any>;
    columnNames?: string[];
    customerDefinitionCharts?: CustomerDefinitionChart[];
    rowCount?: number;
  };

  type AppInfo = {
    driverLogUrl?: string;
    sparkUiUrl?: string;
  };

  type BasicAnalyseResponse = {
    analyseDesc?: string;
    analyseId?: number;
    analyseName?: string;
    analyseResult?: Record<string, any>;
    analyseState?: 'error' | 'running' | 'success';
    analyseType?: 'model' | 'rule';
  };

  type BatchResponse = {
    appId?: string;
    appInfo?: AppInfo;
    id?: number;
    log?: string[];
    state?:
      | 'busy'
      | 'dead'
      | 'error'
      | 'idle'
      | 'killed'
      | 'not_started'
      | 'running'
      | 'shutting_down'
      | 'starting'
      | 'success';
  };

  type Blood = {
    tableSchema?: TableSchemaResponse;
    task?: taskResponse;
  };

  type BusCreateRequest = {
    busDescription?: string;
    busName?: string;
    busUri?: string;
    modelId?: number;
  };

  type BusModelServingRequest = {
    busId?: number;
    form?: string;
  };

  type BusResponse = {
    blood?: Blood[];
    busCreateTime?: string;
    busDescription?: string;
    busId?: number;
    busName?: string;
    busState?: string;
    busUri?: string;
    deployFilePath?: string;
    modelInfo?: ModelResponse;
  };

  type BusUpdateRequest = {
    busDescription?: string;
    busId?: number;
    busName?: string;
    busUri?: string;
    modelId?: number;
  };

  type ChartDate = {
    count?: number;
    filed1?: string;
    filed2?: string;
  };

  type CustomerDefinitionChart = {
    chartDates?: ChartDate[];
    chartName?: string;
    chartType?: string;
    drillAnalyseFiled?: string;
    includeLabel?: boolean;
  };

  type DataImportTableCreateRequest = {
    fileUrl?: string;
    id?: boolean;
    pkColumnId?: number;
    tableColumns?: TableColumnCreateRequest[];
    tableDesc?: string;
    tableFormat?: string;
    tableName?: string;
    tableType?: 'data_import' | 'feature_extract' | 'mock';
  };

  type DateCountType = {
    count?: number;
    date?: string;
    type?: string;
  };

  type DateValue = {
    date?: string;
    value?: number;
  };
  type userPrefrencesRequest={
    id:number;
    code:number;
    type:string;
    name:string;
    description:string;
  }

  type FEColumnCreateRequest = {
    columnDescription?: string;
    columnId?: number;
    columnName?: string;
    columnType?: 'cdate' | 'cdouble' | 'cenum' | 'cinteger' | 'cstring';
    feInputColumnNames?: string[];
    feInputColumns?: number[];
    feOperator?: 'add' | 'direct' | 'div' | 'label_encoder' | 'log' | 'one_hot';
    tableId?: number;
  };

  type FETableCreateRequest = {
    fromTableId?: number;
    fromTableName?: string;
    id?: boolean;
    pkColumnId?: number;
    tableColumns?: FEColumnCreateRequest[];
    tableDesc?: string;
    tableFormat?: string;
    tableName?: string;
    tableType?: 'data_import' | 'feature_extract' | 'mock';
  };

  type FeatureColumn = {
    columnName?: string;
    columnType?: string;
  };

  type IndexValue = {
    idx?: number;
    value?: number;
  };

  type LoginRequest = {
    adminName?: string;
    adminPasswd?: string;
  };

  type MockColumnCreateRequest = {
    columnDescription?: string;
    columnGenerator?: 'pk' | 'rand_date' | 'rand_double' | 'rand_enum' | 'rand_int';
    columnGeneratorParams?: string;
    columnId?: number;
    columnName?: string;
    columnType?: 'cdate' | 'cdouble' | 'cenum' | 'cinteger' | 'cstring';
    tableId?: number;
  };

  type MockDataTableCreateRequest = {
    dataCount?: number;
    id?: boolean;
    pkColumnId?: number;
    tableColumns?: MockColumnCreateRequest[];
    tableDesc?: string;
    tableFormat?: string;
    tableName?: string;
    tableType?: 'data_import' | 'feature_extract' | 'mock';
  };

  type ModelAnalyseRequest = {
    analyseParams?: AnalyseRequest;
    modelParams?: ModelParams;
  };

  type ModelCreateRequest = {
    featureColumnsId?: number[];
    modelExtraParams?: Record<string, any>;
    modelInferenceClassName?: string;
    modelJar?: string;
    modelLabelId?: number;
    modelName?: string;
    modelServingInferenceClassName?: string;
    modelTrainClassName?: string;
    modelTrainTableId?: number;
  };

  type ModelParams = {
    featureColumns?: FeatureColumn[];
    modelExtraParams?: Record<string, any>;
    modelId?: number;
    modelSavePath?: string;
  };

  type ModelResponse = {
    featureColumns?: FeatureColumn[];
    modelCreateTime?: string;
    modelExtraParams?: Record<string, any>;
    modelId?: number;
    modelInferenceClassName?: string;
    modelJar?: string;
    modelLabel?: TableColumnResponse;
    modelName?: string;
    modelSavePath?: string;
    modelServingInferenceClassName?: string;
    modelState?: 'error' | 'standby' | 'training';
    modelTrainClassName?: string;
    modelTrainTable?: TableSchemaResponse;
  };

  type MonitorChartResponse = {
    tableStatistic?: TableStatistic;
    tableTrend?: TrendChartBoard;
    taskStatistic?: TaskStatistic;
    taskTrend?: TrendChartBoard;
    taskTypeRate?: TypeRate[];
  };

  type PageInfoAdminUserResponse = {
    endRow?: number;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    isFirstPage?: boolean;
    isLastPage?: boolean;
    list?: AdminUserResponse[];
    navigateFirstPage?: number;
    navigateLastPage?: number;
    navigatePages?: number;
    navigatepageNums?: number[];
    nextPage?: number;
    pageNum?: number;
    pageSize?: number;
    pages?: number;
    prePage?: number;
    size?: number;
    startRow?: number;
    total?: number;
  };

  type PageInfoBasicAnalyseResponse = {
    endRow?: number;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    isFirstPage?: boolean;
    isLastPage?: boolean;
    list?: BasicAnalyseResponse[];
    navigateFirstPage?: number;
    navigateLastPage?: number;
    navigatePages?: number;
    navigatepageNums?: number[];
    nextPage?: number;
    pageNum?: number;
    pageSize?: number;
    pages?: number;
    prePage?: number;
    size?: number;
    startRow?: number;
    total?: number;
  };

  type PageInfoBusResponse = {
    endRow?: number;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    isFirstPage?: boolean;
    isLastPage?: boolean;
    list?: BusResponse[];
    navigateFirstPage?: number;
    navigateLastPage?: number;
    navigatePages?: number;
    navigatepageNums?: number[];
    nextPage?: number;
    pageNum?: number;
    pageSize?: number;
    pages?: number;
    prePage?: number;
    size?: number;
    startRow?: number;
    total?: number;
  };

  type PageInfoModelResponse = {
    endRow?: number;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    isFirstPage?: boolean;
    isLastPage?: boolean;
    list?: ModelResponse[];
    navigateFirstPage?: number;
    navigateLastPage?: number;
    navigatePages?: number;
    navigatepageNums?: number[];
    nextPage?: number;
    pageNum?: number;
    pageSize?: number;
    pages?: number;
    prePage?: number;
    size?: number;
    startRow?: number;
    total?: number;
  };

  type PageInfoTableSchemaResponse = {
    endRow?: number;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    isFirstPage?: boolean;
    isLastPage?: boolean;
    list?: TableSchemaResponse[];
    navigateFirstPage?: number;
    navigateLastPage?: number;
    navigatePages?: number;
    navigatepageNums?: number[];
    nextPage?: number;
    pageNum?: number;
    pageSize?: number;
    pages?: number;
    prePage?: number;
    size?: number;
    startRow?: number;
    total?: number;
  };

  type ResponseResultCommon = {
    data?: Record<string, any>;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    success?: boolean;
  };

  type RuleAnalyseRequest = {
    analyseParams?: AnalyseRequest;
    labels?: Record<string, any>[];
  };

  type TableColumnCreateRequest = {
    columnDescription?: string;
    columnName?: string;
    columnType?: 'cdate' | 'cdouble' | 'cenum' | 'cinteger' | 'cstring';
    tableId?: number;
  };

  type TableColumnResponse = {
    columnDescription?: string;
    columnId?: number;
    columnName?: string;
    columnType?: 'cdate' | 'cdouble' | 'cenum' | 'cinteger' | 'cstring';
  };

  type TableSchemaResponse = {
    fromTableSchema?: TableSchemaResponse;
    modelSavePath?: string;
    tableColumns?: TableColumnResponse[];
    tableCreateTime?: string;
    tableCreator?: AdminUser;
    tableDesc?: string;
    tableGmtTime?: string;
    tableId?: number;
    tableName?: string;
    tableState?: 'error' | 'running' | 'success';
    tableType?: 'data_import' | 'feature_extract' | 'mock';
  };

  type TableStatistic = {
    chartData?: IndexValue[];
    increase?: number;
    total?: number;
  };

  type TaskStatistic = {
    chartData?: IndexValue[];
    error?: number;
    success?: number;
    total?: number;
  };

  type TrendChartBoard = {
    pieChartData?: TypeValue[];
    trendChartData?: DateValue[];
    typeTrendChartData?: DateCountType[];
  };

  type TypeRate = {
    rate?: number;
    type?: string;
  };

  type TypeValue = {
    type?: string;
    value?: number;
  };

  type UpdateAnalyseRequest = {
    analyseId?: number;
    analyseResult?: Record<string, any>;
  };

  type taskResponse = {
    args?: Record<string, any>;
    batchResponse?: BatchResponse;
    bizId?: number;
    extraParams?: string;
    taskFinishTime?: number;
    taskId?: number;
    taskStartTime?: number;
    taskState?:
      | 'busy'
      | 'dead'
      | 'error'
      | 'idle'
      | 'killed'
      | 'not_started'
      | 'running'
      | 'shutting_down'
      | 'starting'
      | 'success';
    taskType?: string;
  };

  type AnalyseQueryByPageUsingGETParams = {
    analyseName?: string;
    /** 页码 */
    pageNo: number;
    /** 页大小 */
    pageSize: number;
  };

  type queryAnalyseResultByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type busQueryByPageUsingGETParams = {
    busName?: string;
    /** 页码 */
    pageNo: number;
    /** 页大小 */
    pageSize: number;
  };

  type queryResultUsingGETParams = {
    /** taskId */
    taskId: string;
  };

  type offLineUsingDELETEParams = {
    /** busId */
    busId: number;
  };

  type publishUsingGETParams = {
    /** publish */
    publish: number;
  };

  type busQueryByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type fileDownloadUsingGETParams = {
    /** filePath */
    filePath: string;
  };

  type uploadChunkUsingPOSTParams = {
    chunk?: string;
    chunkIdx?: string;
    chunkSize?: number;
    fileHash?: string;
  };

  type checkChunkUsingGETParams = {
    /** hash */
    hash: string;
    /** chunkIdx */
    chunkIdx: number;
  };

  type mergeFileUsingPOSTParams = {
    chunks?: number;
    fileHash?: string;
    fileName?: string;
  };

  type loginOutUsingDELETEParams = {
    /** token */
    token: string;
  };

  type modelQueryByPageUsingGETParams = {
    modelName?: string;
    /** 页码 */
    pageNo: number;
    /** 页大小 */
    pageSize: number;
  };

  type modelQueryByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type tableQueryByPageUsingGETParams = {
    /** 页码 */
    pageNo: number;
    /** 页大小 */
    pageSize: number;
    tableName?: string;
  };

  type convertFile2SchemaUsingGETParams = {
    /** dfsFilePath */
    dfsFilePath?: string;
  };

  type tableQueryByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type queryTaskByTaskTypeAndBizIdUsingGETParams = {
    /** bizId */
    bizId: number;
    /** taskType */
    taskType: string;
  };

  type userQueryByPageUsingGETParams = {
    adminName?: string;
    adminTitle?: string;
    expiredTime?: number;
    /** 页码 */
    pageNo: number;
    /** 页大小 */
    pageSize: number;
    userState?: 'active' | 'disable' | 'expired' | 'pending';
  };

  type activeUserUsingPUTParams = {
    /** id */
    id?: number;
  };

  type postponeUsingPUTParams = {
    id?: number;
    postpone: number;
    timeEnum: 'day' | 'hour' | 'min' | 'mon' | 'sec' | 'year';
  };

  type registerUsingPOSTParams = {
    adminName: string;
    adminPasswd: string;
  };

  type disableUserUsingDELETEParams = {
    /** id */
    id: number;
  };
  type userPersonaGetParams={
    username:string;
  }
}
