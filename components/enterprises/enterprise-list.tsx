"use client";

import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { EnterpriseSearch } from "@/components/enterprises/enterprise-search";
import { Enterprise } from "@/types/enterprise";
import { EnterpriseSearchParams } from "@/types/enterprise";
import { useRouter } from "next/navigation";

// 更新模拟数据
const mockData: Enterprise[] = [
  {
    id: "1",
    name: "杭州某某科技有限公司",
    address: "杭州市西湖区某某路XX号",
    legalPerson: "张三",
    phone: "13800138000",
    creditCode: "91330000XXXXXXXX1X",
    inspectionCount: 5,
  },
  {
    id: "2",
    name: "杭州某某贸易有限公司",
    address: "杭州市滨江区某某路XX号",
    legalPerson: "李四",
    phone: "13900139000",
    creditCode: "91330000XXXXXXXX2X",
    inspectionCount: 3,
  },
];

export function EnterpriseList() {
  const router = useRouter();

  const handleSearch = (values: EnterpriseSearchParams) => {
    // Implementation of handleSearch function
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
              <TableHead className="text-center">法定代表人</TableHead>
              <TableHead className="text-center">联系电话</TableHead>
              <TableHead className="text-center">企业地址</TableHead>
              <TableHead className="text-center">被检查次数</TableHead>
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
                <TableCell className="text-center">{item.inspectionCount}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    size="sm" 
                    variant="default"
                    onClick={() => router.push(`/enterprises/${item.id}/inspection-records`)}
                  >
                    查看检查记录
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 