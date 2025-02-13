import { InspectionRecordList } from "@/components/enterprises/inspection-record-list";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function EnterpriseInspectionRecordsPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const { page, pageSize } = await searchParams;

  // 模拟获取企业数据
  const mockEnterprise = {
    id: "1",
    name: "杭州某某科技有限公司",
    // ... 其他字段
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">企业检查记录</h2>
      </div>
      <InspectionRecordList 
        enterpriseId={id}
        enterpriseName={mockEnterprise.name}
      />
    </div>
  );
} 