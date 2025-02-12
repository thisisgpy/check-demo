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
import { EnterpriseSearch } from "@/components/enterprise/enterprise-search";
import { Enterprise, EnterpriseSearchParams } from "@/types/enterprise";
import { Pagination } from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// 模拟数据
const mockData: Enterprise[] = [
  {
    id: "1",
    name: "示例企业有限公司",
    creditCode: "91110000123456789X",
    legalPerson: "张三",
    phone: "13800138000",
    address: "北京市朝阳区xxx街道xxx号",
  },
  // ... 可以添加更多模拟数据
];

export function EnterpriseList() {
  const [searchParams, setSearchParams] = useState<EnterpriseSearchParams>({
    page: 1,
    pageSize: 10,
  });
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [selectedEnterpriseId, setSelectedEnterpriseId] = useState<string>("");

  const handleSearch = (params: EnterpriseSearchParams) => {
    setSearchParams({ ...searchParams, ...params, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ ...searchParams, page });
  };

  const handleAddToWhitelist = (enterpriseId: string) => {
    setSelectedEnterpriseId(enterpriseId);
    setShowAlert(true);
  };

  const handleConfirmWhitelist = () => {
    // TODO: 调用API将企业加入白名单
    console.log('加入白名单:', selectedEnterpriseId);
    setShowAlert(false);
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
              <TableHead className="text-center">法人代表</TableHead>
              <TableHead className="text-center">联系电话</TableHead>
              <TableHead className="text-center">注册地址</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((enterprise) => (
              <TableRow key={enterprise.id}>
                <TableCell className="text-center">{enterprise.name}</TableCell>
                <TableCell className="text-center">{enterprise.creditCode}</TableCell>
                <TableCell className="text-center">{enterprise.legalPerson}</TableCell>
                <TableCell className="text-center">{enterprise.phone}</TableCell>
                <TableCell className="text-center">{enterprise.address}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    size="sm" 
                    variant="default"
                    onClick={() => router.push(`/inspection-activities/create?enterpriseId=${enterprise.id}`)}
                  >
                    发起检查
                  </Button>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => handleAddToWhitelist(enterprise.id)}
                  >
                    加入无事不扰
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

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>提示</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              该企业将加入无事不扰白名单。企业在被移出白名单之前，不可对其发起检查活动。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmWhitelist}>
              确认
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 