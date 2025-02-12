"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EnterpriseSearch } from "@/components/enterprise/enterprise-search";
import { Enterprise, EnterpriseSearchParams } from "@/types/enterprise";
import { Pagination } from "@/components/ui/pagination";

// 模拟数据
const mockData: Enterprise[] = [
  {
    id: "1",
    name: "示例企业有限公司",
    creditCode: "91110000123456789X",
    legalPerson: "张三",
    phone: "13800138000",
    address: "北京市朝阳区xxx街道xxx号",
  },
  // ... 可以添加更多模拟数据
];

export function EnterpriseList() {
  const [searchParams, setSearchParams] = useState<EnterpriseSearchParams>({
    page: 1,
    pageSize: 10,
  });

  const handleSearch = (params: EnterpriseSearchParams) => {
    setSearchParams({ ...searchParams, ...params, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ ...searchParams, page });
  };

  return (
    <div className="space-y-4">
      <EnterpriseSearch onSearch={handleSearch} />
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">企业名称</TableHead>
              <TableHead className="text-center">统一社会信用代码</TableHead>
              <TableHead className="text-center">法人代表</TableHead>
              <TableHead className="text-center">联系电话</TableHead>
              <TableHead className="text-center">注册地址</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((enterprise) => (
              <TableRow key={enterprise.id}>
                <TableCell className="text-center">{enterprise.name}</TableCell>
                <TableCell className="text-center">{enterprise.creditCode}</TableCell>
                <TableCell className="text-center">{enterprise.legalPerson}</TableCell>
                <TableCell className="text-center">{enterprise.phone}</TableCell>
                <TableCell className="text-center">{enterprise.address}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="default">
                    发起检查
                  </Button>
                  <Button size="sm" variant="secondary">
                    加入无事不扰
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
        <Pagination
          total={100}
          pageSize={searchParams.pageSize || 10}
          current={searchParams.page || 1}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
} 