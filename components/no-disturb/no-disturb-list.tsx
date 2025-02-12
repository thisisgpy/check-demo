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
import { NoDisturbSearch } from "@/components/no-disturb/no-disturb-search";
import { NoDisturbItem, NoDisturbSearchParams } from "@/types/no-disturb";
import { Pagination } from "@/components/ui/pagination";

// 模拟数据
const mockData: NoDisturbItem[] = [
  {
    id: "1",
    name: "示例企业有限公司",
    creditCode: "91110000123456789X",
    legalPerson: "张三",
    phone: "13800138000",
    address: "北京市朝阳区xxx街道xxx号",
    addTime: "2024-03-20",
  },
  {
    id: "2",
    name: "测试企业有限公司",
    creditCode: "91110000987654321X",
    legalPerson: "李四",
    phone: "13900139000",
    address: "北京市海淀区xxx街道xxx号",
    addTime: "2024-03-21",
  },
];

export function NoDisturbList() {
  const [searchParams, setSearchParams] = useState<NoDisturbSearchParams>({
    page: 1,
    pageSize: 10,
  });

  const handleSearch = (params: NoDisturbSearchParams) => {
    setSearchParams({ ...searchParams, ...params, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ ...searchParams, page });
  };

  const handleRemove = (item: NoDisturbItem) => {
    // TODO: 调用API移出无事不扰名单
    console.log('移出无事不扰:', item);
  };

  return (
    <div className="space-y-4">
      <NoDisturbSearch onSearch={handleSearch} />
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">企业名称</TableHead>
              <TableHead className="text-center">统一社会信用代码</TableHead>
              <TableHead className="text-center">法人代表</TableHead>
              <TableHead className="text-center">联系电话</TableHead>
              <TableHead className="text-center">注册地址</TableHead>
              <TableHead className="text-center">加入时间</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-center">{item.name}</TableCell>
                <TableCell className="text-center">{item.creditCode}</TableCell>
                <TableCell className="text-center">{item.legalPerson}</TableCell>
                <TableCell className="text-center">{item.phone}</TableCell>
                <TableCell className="text-center">{item.address}</TableCell>
                <TableCell className="text-center">{item.addTime}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleRemove(item)}
                  >
                    移出名单
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