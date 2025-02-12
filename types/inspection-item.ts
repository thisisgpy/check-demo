export interface InspectionItem {
  id: string;
  code: string;      // 事项编码
  name: string;      // 事项名称
  profession: string; // 专业类型
  type: string;      // 检查类型
}

export interface InspectionItemSearchParams {
  code?: string;
  name?: string;
  profession?: string;
  type?: string;
  page?: number;
  pageSize?: number;
}

// 巡查事项与权力事项的关联关系
export interface InspectionRightItemRelation {
  inspectionItemId: string;
  rightItemId: string;
} 