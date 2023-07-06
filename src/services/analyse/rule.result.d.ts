interface RuleAnalyseRule {
  customerDefinitionCharts?: CustomerDefinitionChartsItem[];
  baseCharts?: BaseChartsItem[];
  rowCount?: number;
  basicRow?: Map ;
}
interface CustomerDefinitionChartsItem {
  chartDates?: IChartDatesItem[];
  chartName?: string;
  chartType?: string;
  drillAnalyseFiled?: string;
}
interface ChartDatesItem {
  count?: number;
  filed1?: string;
  filed2?: string;
}
interface BaseChartsItem {
  chartDates?: ChartDatesItem[];
  chartName?: string;
  chartType?: string;
}
