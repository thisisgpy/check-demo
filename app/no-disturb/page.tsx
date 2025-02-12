import { NoDisturbList } from "@/components/no-disturb/no-disturb-list";

export default function NoDisturbPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">无事不扰</h2>
      </div>
      <NoDisturbList />
    </div>
  );
} 