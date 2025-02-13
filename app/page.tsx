import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users2, ClipboardCheck, FileCheck, ShieldCheck } from "lucide-react";
import { Bar } from "@/components/ui/bar-chart";

// 模拟统计数据
const stats = {
  enterpriseCount: 128,
  departmentCount: 12,
  inspectorCount: 56,
  activityCount: 324,
  whitelistCount: 15,
};

// 模拟企业检查次数数据
const enterpriseInspectionData = {
  labels: [
    "杭州某某科技有限公司",
    "杭州某某贸易有限公司",
    "杭州某某食品有限公司",
    "杭州某某商贸有限公司",
    "杭州某某电子有限公司",
    "杭州某某制造有限公司",
    "杭州某某餐饮有限公司",
    "杭州某某服务有限公司",
    "杭州某某物流有限公司",
    "杭州某某建材有限公司",
  ],
  datasets: [
    {
      label: "检查次数",
      data: [28, 25, 22, 20, 18, 15, 12, 10, 8, 6],
    },
  ],
};

// 模拟部门检查活动数据
const departmentInspectionData = {
  labels: [
    "市场监督管理局",
    "住房和城乡建设局",
    "生态环境局",
    "应急管理局",
    "卫生健康局",
  ],
  datasets: [
    {
      label: "检查活动次数",
      data: [150, 120, 100, 80, 60],
    },
  ],
};

export default function HomePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">欢迎使用</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">企业总数</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.enterpriseCount}</div>
            <p className="text-xs text-muted-foreground">
              已入库企业数量
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">行业部门</CardTitle>
            <Users2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.departmentCount}</div>
            <p className="text-xs text-muted-foreground">
              参与部门数量
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">执法人员</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inspectorCount}</div>
            <p className="text-xs text-muted-foreground">
              持证执法人员数量
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">检查活动</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activityCount}</div>
            <p className="text-xs text-muted-foreground">
              累计检查活动次数
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">白名单企业</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.whitelistCount}</div>
            <p className="text-xs text-muted-foreground">
              无事不扰白名单企业数量
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">企业被检查次数TOP10</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar
              data={enterpriseInspectionData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      maxRotation: 45,
                      minRotation: 45,
                    },
                  },
                },
              }}
              className="aspect-[2/1]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">各部门检查活动统计</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar
              data={departmentInspectionData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      maxRotation: 45,
                      minRotation: 45,
                    },
                  },
                },
              }}
              className="aspect-[2/1]"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

