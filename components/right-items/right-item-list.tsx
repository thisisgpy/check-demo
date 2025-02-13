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
import { RightItemSearch } from "@/components/right-items/right-item-search";
import { RightItem, RightItemSearchParams } from "@/types/right-item";
import { Pagination } from "@/components/ui/pagination";
import { RightItemDetailsDialog } from "@/components/right-items/right-item-details-dialog";
import { RightItemDialog } from "./right-item-dialog";
import { RightItemDetailDialog } from "./right-item-detail-dialog";

// 模拟数据
const mockData: RightItem[] = [
  {
    id: "1",
    code: "11000000001",
    name: "行政许可",
  },
  // ... 可以添加更多模拟数据
];

export function RightItemList() {
  const [searchParams, setSearchParams] = useState<RightItemSearchParams>({
    page: 1,
    pageSize: 10,
  });
  
  const [selectedItem, setSelectedItem] = useState<RightItem | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedForDetail, setSelectedForDetail] = useState<RightItem | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const handleSearch = (params: RightItemSearchParams) => {
    setSearchParams({ ...searchParams, ...params, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ ...searchParams, page });
  };

  const handleCreate = (values: any) => {
    // TODO: 调用API创建权力事项
    console.log('创建权力事项:', values);
  };

  const handleAddDetail = (values: any) => {
    // TODO: 调用API添加细项
    console.log('添加细项:', values, '到权力事项:', selectedForDetail);
  };

  return (
    <div className="space-y-4">
      <RightItemSearch onSearch={handleSearch} />
      
      <div className="space-y-2">
        <Button 
          onClick={() => setCreateDialogOpen(true)}
        >
          新增权力事项
        </Button>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">实施编码</TableHead>
                <TableHead className="text-center">事项名称</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">{item.code}</TableCell>
                  <TableCell className="text-center">{item.name}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setSelectedItem(item);
                        setDetailsOpen(true);
                      }}
                    >
                      查看
                    </Button>
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => {
                        setSelectedForDetail(item);
                        setDetailDialogOpen(true);
                      }}
                    >
                      添加细项
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

      <RightItemDetailsDialog
        item={selectedItem}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      <RightItemDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreate}
      />

      <RightItemDetailDialog
        rightItem={selectedForDetail}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        onSubmit={handleAddDetail}
      />
    </div>
  );
} 