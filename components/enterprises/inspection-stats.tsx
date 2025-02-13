"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface InspectionStatsProps {
  todayCount: number;
  weekCount: number;
  monthCount: number;
}

export function InspectionStats({
  todayCount,
  weekCount,
  monthCount,
}: InspectionStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">今日</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{todayCount}</div>
          <p className="text-xs text-muted-foreground">
            今日检查次数
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">近7日</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{weekCount}</div>
          <p className="text-xs text-muted-foreground">
            近7日检查次数
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">近30日</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{monthCount}</div>
          <p className="text-xs text-muted-foreground">
            近30日检查次数
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 