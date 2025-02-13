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
import { DepartmentSearch } from "./department-search";
import { Department, DepartmentSearchParams } from "@/types/department";
import { Pagination } from "@/components/ui/pagination";
import { DepartmentDialog } from "./department-dialog";
import { DepartmentInspectorDialog } from "./department-inspector-dialog";

// 模拟数据
const mockData: Department[] = [
  {
    id: "1",
    name: "市场监督管理局",
    scope: "食品安全、市场秩序、质量监督",
    description: "负责市场监督管理、市场主体统一登记注册、市场秩序维护等",
  },
  {
    id: "2",
    name: "住房和城乡建设局",
    scope: "建筑工程、城市规划、房地产市场",
    description: "负责建筑市场监管、工程质量安全监管、城市规划管理等",
  },
];

export function DepartmentList() {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState<DepartmentSearchParams>({
    page: 1,
    pageSize: 10,
  });
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [inspectorDialogOpen, setInspectorDialogOpen] = useState(false);

  const handleSearch = (params: DepartmentSearchParams) => {
    setSearchParams({ ...searchParams, ...params, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ ...searchParams, page });
  };

  const handleCreate = (values: any) => {
    // TODO: 调用API创建部门
    console.log('创建部门:', values);
  };

  return (
    <div className="space-y-4">
      <DepartmentSearch onSearch={handleSearch} />
      
      <div className="space-y-2">
        <Button 
          onClick={() => setCreateDialogOpen(true)}
        >
          新增部门
        </Button>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">部门名称</TableHead>
                <TableHead className="text-center">管理范围</TableHead>
                <TableHead className="text-center">说明</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">{item.name}</TableCell>
                  <TableCell className="text-center">{item.scope}</TableCell>
                  <TableCell className="text-center">{item.description}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => {
                        setSelectedDepartment(item);
                        setInspectorDialogOpen(true);
                      }}
                    >
                      查看执法人员
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

      <DepartmentDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreate}
      />

      <DepartmentInspectorDialog
        department={selectedDepartment}
        open={inspectorDialogOpen}
        onOpenChange={setInspectorDialogOpen}
      />
    </div>
  );
} 