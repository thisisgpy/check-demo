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
import { InspectorSearch } from "./inspector-search";
import { Inspector, InspectorSearchParams } from "@/types/inspector";
import { Pagination } from "@/components/ui/pagination";
import { InspectorDialog } from "./inspector-dialog";

// 模拟数据
const mockData: Inspector[] = [
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

export function InspectorList() {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState<InspectorSearchParams>({
    page: 1,
    pageSize: 10,
  });
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleSearch = (params: InspectorSearchParams) => {
    setSearchParams({ ...searchParams, ...params, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ ...searchParams, page });
  };

  const handleEdit = (item: Inspector) => {
    // TODO: 处理编辑逻辑
    console.log('编辑执法人员:', item);
  };

  const handleDelete = (item: Inspector) => {
    // TODO: 处理删除逻辑
    console.log('删除执法人员:', item);
  };

  const handleCreate = (values: any) => {
    // TODO: 调用API创建执法人员
    console.log('创建执法人员:', values);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
        >
          返回
        </Button>
      </div>

      <InspectorSearch onSearch={handleSearch} />
      
      <div className="space-y-2">
        <Button 
          onClick={() => setCreateDialogOpen(true)}
        >
          新增人员
        </Button>
        
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
              {mockData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">{item.name}</TableCell>
                  <TableCell className="text-center">{item.gender}</TableCell>
                  <TableCell className="text-center">{item.no}</TableCell>
                  <TableCell className="text-center">{item.department}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEdit(item)}
                    >
                      编辑
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDelete(item)}
                    >
                      删除
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

      <InspectorDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreate}
      />
    </div>
  );
} 