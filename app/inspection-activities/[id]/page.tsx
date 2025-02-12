import { InspectionActivityDetail } from "@/components/inspection-activities/inspection-activity-detail";

interface InspectionActivityDetailPageProps {
  params: {
    id: string;
  };
}

export default async function InspectionActivityDetailPage({ 
  params 
}: InspectionActivityDetailPageProps) {
  const { id } = await Promise.resolve(params); // 等待 params

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">巡查活动详情</h2>
      </div>
      <InspectionActivityDetail id={id} />
    </div>
  );
} 