import { EnterpriseList } from "@/components/enterprise/enterprise-list";

export default function EnterprisePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">企业库</h2>
      </div>
      <EnterpriseList />
    </div>
  );
} 