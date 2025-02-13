export interface Inspector {
  id: string;
  name: string;      // 姓名
  gender: string;    // 性别
  no: string;        // 执法证号
  department: string; // 行业部门
}

export interface InspectorSearchParams {
  name?: string;
  no?: string;
  department?: string;
  page?: number;
  pageSize?: number;
} 