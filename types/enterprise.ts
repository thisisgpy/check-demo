export interface Enterprise {
  id: string;
  name: string;
  creditCode: string;
  legalPerson: string;
  phone: string;
  address: string;
}

export interface EnterpriseSearchParams {
  name?: string;
  creditCode?: string;
  legalPerson?: string;
  phone?: string;
  address?: string;
  page?: number;
  pageSize?: number;
} 