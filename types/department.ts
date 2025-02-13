export interface Department {
  id: string;
  name: string;      // 部门名称
  scope: string;     // 管理范围
  description: string; // 说明
}

export interface DepartmentSearchParams {
  name?: string;
  scope?: string;
  page?: number;
  pageSize?: number;
} 