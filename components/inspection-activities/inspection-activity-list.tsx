"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { InspectionActivitySearch } from "@/components/inspection-activities/inspection-activity-search";
import { 
  InspectionActivity, 
  InspectionActivitySearchParams,
  InspectionStatusMap,
} from "@/types/inspection-activity";
import { Pagination } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useState } from "react";

// 模拟数据
const mockData: InspectionActivity[] = [
  {
    id: "1",
    enterpriseName: "示例企业有限公司",
    creditCode: "91110000123456789X",
    legalPerson: "张三",
    phone: "13800138000",
    inspectionTime: "2024-03-25",
    status: "pending",
    createTime: "2024-03-20",
  },
  {
    id: "2",
    enterpriseName: "测试企业有限公司",
    creditCode: "91110000987654321X",
    legalPerson: "李四",
    phone: "13900139000",
    inspectionTime: "2024-03-26",
    status: "processing",
    createTime: "2024-03-21",
  },
];

const statusColorMap = {
  pending: "bg-yellow-500",
  processing: "bg-blue-500",
  closed: "bg-red-500",
  completed: "bg-green-500",
};

export function InspectionActivityList() {
  const [searchParams, setSearchParams] = useState<InspectionActivitySearchParams>({
    page: 1,
    pageSize: 10,
  });
  const router = useRouter();

  const handleSearch = (params: InspectionActivitySearchParams) => {
    setSearchParams({ ...searchParams, ...params, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ ...searchParams, page });
  };

  const handleCreate = (values: any) => {
    // TODO: 调用API创建检查活动
    console.log('创建检查活动:', values);
  };

  return (
    <div className="space-y-4">
      <InspectionActivitySearch onSearch={handleSearch} />
      
      <div className="space-y-2">
        <Button 
          onClick={() => router.push('/inspection-activities/create')}
        >
          新增检查活动
        </Button>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">巡查对象</TableHead>
                <TableHead className="text-center">统一社会信用代码</TableHead>
                <TableHead className="text-center">法人代表</TableHead>
                <TableHead className="text-center">联系电话</TableHead>
                <TableHead className="text-center">巡查时间</TableHead>
                <TableHead className="text-center">状态</TableHead>
                <TableHead className="text-center">创建时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">{item.enterpriseName}</TableCell>
                  <TableCell className="text-center">{item.creditCode}</TableCell>
                  <TableCell className="text-center">{item.legalPerson}</TableCell>
                  <TableCell className="text-center">{item.phone}</TableCell>
                  <TableCell className="text-center">{item.inspectionTime}</TableCell>
                  <TableCell className="text-center">
                    <Badge className={statusColorMap[item.status]}>
                      {InspectionStatusMap[item.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{item.createTime}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => router.push(`/inspection-activities/${item.id}`)}
                    >
                      查看详情
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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