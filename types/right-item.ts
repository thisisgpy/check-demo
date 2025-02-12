export interface RightItem {
  id: string;
  code: string;      // 实施编码
  name: string;      // 事项名称
}

export interface RightItemDetail {
  id: string;
  code: string;           // 细项编码
  illegalAct: string;     // 违法行为
  violation: string;      // 违则
  violationDetail: string;// 违则详情
  punishment: string;     // 罚则
  punishmentDetail: string;// 罚则详情
  discretion: string;     // 自由裁量标准
  parentCode: string;     // 所属事项编码
}

export interface RightItemSearchParams {
  code?: string;
  name?: string;
  page?: number;
  pageSize?: number;
} 