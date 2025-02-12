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

  const handleSearch = (params: RightItemSearchParams) => {
    setSearchParams({ ...searchParams, ...params, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ ...searchParams, page });
  };

  return (
    <div className="space-y-4">
      <RightItemSearch onSearch={handleSearch} />
      
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
                <TableCell className="text-right">
                  <Button 
                    size="sm" 
                    variant="default"
                    onClick={() => {
                      setSelectedItem(item);
                      setDetailsOpen(true);
                    }}
                  >
                    查看细项
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

      <RightItemDetailsDialog
        item={selectedItem}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
} 