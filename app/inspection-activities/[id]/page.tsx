import { InspectionActivityDetail } from "@/components/inspection-activities/inspection-activity-detail";

interface Props {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function InspectionActivityDetailPage({ 
  params,
  searchParams 
}: Props) {
  const { id } = await params;
  await searchParams; // 等待 searchParams 解析，虽然这里不使用

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">巡查活动详情</h2>
      </div>
      <InspectionActivityDetail id={id} />
    </div>
  );
} 