import { DepartmentList } from "@/components/departments/department-list";

export default function DepartmentsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">行业部门</h2>
      </div>
      <DepartmentList />
    </div>
  );
} 