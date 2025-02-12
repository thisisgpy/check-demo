import { InspectionActivityForm } from "@/components/inspection-activities/inspection-activity-form";
import { Suspense } from "react";

export default function CreateInspectionActivityPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">新增检查活动</h2>
      </div>
      <Suspense fallback={<div>加载中...</div>}>
        <InspectionActivityForm />
      </Suspense>
    </div>
  );
} 