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
import { InspectionItemSearch } from "@/components/inspection-items/inspection-item-search";
import { InspectionItem, InspectionItemSearchParams } from "@/types/inspection-item";
import { Pagination } from "@/components/ui/pagination";
import { InspectionRightItemsDialog } from "./inspection-right-items-dialog";
import { InspectionItemDialog } from "./inspection-item-dialog";

// 模拟数据
const mockData: InspectionItem[] = [
  {
    id: "1",
    code: "XC20240001",
    name: "餐饮服务日常巡查",
    profession: "食品安全",
    type: "日常巡查",
  },
  {
    id: "2",
    code: "XC20240002",
    name: "建筑工地安全检查",
    profession: "安全生产",
    type: "专项检查",
  },
];

export function InspectionItemList() {
  const [searchParams, setSearchParams] = useState<InspectionItemSearchParams>({
    page: 1,
    pageSize: 10,
  });
  const [selectedItem, setSelectedItem] = useState<InspectionItem | null>(null);
  const [rightItemsOpen, setRightItemsOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleSearch = (params: InspectionItemSearchParams) => {
    setSearchParams({ ...searchParams, ...params, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ ...searchParams, page });
  };

  const handleCreate = (values: any) => {
    // TODO: 调用API创建巡查事项
    console.log('创建巡查事项:', values);
  };

  return (
    <div className="space-y-4">
      <InspectionItemSearch onSearch={handleSearch} />
      
      <div className="space-y-2">
        <Button 
          onClick={() => setCreateDialogOpen(true)}
        >
          新增巡查事项
        </Button>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">事项编码</TableHead>
                <TableHead className="text-center">事项名称</TableHead>
                <TableHead className="text-center">专业类型</TableHead>
                <TableHead className="text-center">检查类型</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">{item.code}</TableCell>
                  <TableCell className="text-center">{item.name}</TableCell>
                  <TableCell className="text-center">{item.profession}</TableCell>
                  <TableCell className="text-center">{item.type}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => {
                        setSelectedItem(item);
                        setRightItemsOpen(true);
                      }}
                    >
                      查看权力事项
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

      <InspectionRightItemsDialog
        item={selectedItem}
        open={rightItemsOpen}
        onOpenChange={setRightItemsOpen}
      />

      <InspectionItemDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreate}
      />
    </div>
  );
} 