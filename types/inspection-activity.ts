export interface InspectionActivity {
  id: string;
  enterpriseName: string;  // 巡查对象
  creditCode: string;      // 信用代码
  legalPerson: string;     // 法人
  phone: string;          // 联系电话
  inspectionTime: string;  // 巡查时间
  status: InspectionStatus; // 状态
  createTime: string;      // 创建时间
}

export type InspectionStatus = "pending" | "processing" | "closed" | "completed";

export const InspectionStatusMap: Record<InspectionStatus, string> = {
  pending: "待巡查",
  processing: "处置中",
  closed: "已结案",
  completed: "已完成",
};

export interface InspectionActivitySearchParams {
  enterpriseName?: string;
  creditCode?: string;
  legalPerson?: string;
  phone?: string;
  status?: InspectionStatus;
  startTime?: string;
  endTime?: string;
  page?: number;
  pageSize?: number;
}

export interface InspectionActivityForm {
  enterpriseId: string;
  inspectionTime: string;
  inspectionGroups: InspectionGroup[];
}

export interface InspectionGroup {
  department: string;     // 行业部门
  inspectorName: string;  // 巡查人员名称
  inspectorNo: string;    // 巡查人员执法证号
  inspectionItemIds: string[]; // 选中的巡查事项ID
} 