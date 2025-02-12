export interface NoDisturbItem {
  id: string;
  name: string;       // 企业名称
  creditCode: string; // 信用代码
  legalPerson: string;// 法人
  phone: string;      // 联系电话
  address: string;    // 注册地址
  addTime: string;    // 加入时间
}

export interface NoDisturbSearchParams {
  name?: string;
  creditCode?: string;
  legalPerson?: string;
  phone?: string;
  address?: string;
  page?: number;
  pageSize?: number;
} 