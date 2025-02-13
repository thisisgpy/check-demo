"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { InspectionStatusMap, InspectionStatus } from "@/types/inspection-activity";
import { InspectionStats } from "./inspection-stats";

// 修改模拟数据
const mockRecords = [
  {
    id: "1",
    inspectionTime: "2024-03-25 10:00",
    department: "市监",
    status: "completed",
    hasViolation: true,
    createTime: "2024-03-20 14:30",
  },
  {
    id: "2",
    inspectionTime: "2024-03-20 14:00",
    department: "市监",
    status: "completed",
    hasViolation: false,
    createTime: "2024-03-15 09:30",
  },
];

const statusColorMap: Record<InspectionStatus, string> = {
  pending: "bg-yellow-500",
  processing: "bg-blue-500",
  closed: "bg-red-500",
  completed: "bg-green-500",
};

interface InspectionRecordListProps {
  enterpriseId: string;
  enterpriseName: string;
}

// 模拟统计数据
const mockStats = {
  todayCount: 2,
  weekCount: 8,
  monthCount: 25,
};

export function InspectionRecordList({ enterpriseId, enterpriseName }: InspectionRecordListProps) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const pageSize = 10;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{enterpriseName}</h2>
      </div>

      <InspectionStats 
        todayCount={mockStats.todayCount}
        weekCount={mockStats.weekCount}
        monthCount={mockStats.monthCount}
      />

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
          >
            返回
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">检查时间</TableHead>
                <TableHead className="text-center">行业部门</TableHead>
                <TableHead className="text-center">状态</TableHead>
                <TableHead className="text-center">是否违规违法</TableHead>
                <TableHead className="text-center">创建时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="text-center">{record.inspectionTime}</TableCell>
                  <TableCell className="text-center">{record.department}</TableCell>
                  <TableCell className="text-center">
                    <Badge className={statusColorMap[record.status as InspectionStatus]}>
                      {InspectionStatusMap[record.status as InspectionStatus]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={record.hasViolation ? "destructive" : "secondary"}>
                      {record.hasViolation ? "是" : "否"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{record.createTime}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => router.push(`/inspection-activities/${record.id}`)}
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
          pageSize={pageSize}
          current={page}
          onChange={setPage}
        />
      </div>
    </div>
  );
} 