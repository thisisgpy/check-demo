"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Department } from "@/types/department";
import { Inspector } from "@/types/inspector";
import { Button } from "@/components/ui/button";

// 模拟数据
const mockInspectors: Inspector[] = [
  {
    id: "1",
    name: "张三",
    gender: "男",
    no: "ZF001",
    department: "市场监督管理局",
  },
  {
    id: "2",
    name: "李四",
    gender: "女",
    no: "ZF002",
    department: "市场监督管理局",
  },
];

interface DepartmentInspectorDialogProps {
  department: Department | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DepartmentInspectorDialog({
  department,
  open,
  onOpenChange,
}: DepartmentInspectorDialogProps) {
  if (!department) return null;

  const handleRemove = (inspector: Inspector) => {
    // TODO: 调用API移除执法人员
    console.log('从部门移除执法人员:', inspector);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {department.name} - 执法人员列表
          </DialogTitle>
        </DialogHeader>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">姓名</TableHead>
                <TableHead className="text-center">性别</TableHead>
                <TableHead className="text-center">执法证号</TableHead>
                <TableHead className="text-center">行业部门</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInspectors.map((inspector) => (
                <TableRow key={inspector.id}>
                  <TableCell className="text-center">{inspector.name}</TableCell>
                  <TableCell className="text-center">{inspector.gender}</TableCell>
                  <TableCell className="text-center">{inspector.no}</TableCell>
                  <TableCell className="text-center">{inspector.department}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleRemove(inspector)}
                    >
                      移除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
} 