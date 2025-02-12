"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InspectionStatusMap } from "@/types/inspection-activity";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// 模拟数据
const mockDetail = {
  id: "1",
  enterpriseName: "北京餐饮有限公司",
  creditCode: "91110000123456789X",
  legalPerson: "张三",
  phone: "13800138000",
  inspectionTime: "2024-03-25 10:00",
  status: "pending" as const,
  createTime: "2024-03-20 14:30",
  groups: [
    {
      id: "1",
      department: "市监",
      inspectors: [
        { name: "李四", no: "ZF001" },
        { name: "王五", no: "ZF002" },
      ],
      inspectionItems: [
        { 
          id: "1", 
          name: "食品安全日常检查",
          isViolated: true,
          rightItems: [
            {
              id: "r1",
              name: "行政许可",
              code: "11000000001",
              details: [
                {
                  id: "d1",
                  code: "11000000001001",
                  illegalAct: "未经许可从事经营活动",
                  violation: "《行政许可法》第三条",
                  violationDetail: "从事特定活动，必须经过行政机关批准",
                  punishment: "责令停止经营活动，处以罚款",
                  punishmentDetail: "可以处以一万元以上十万元以下的罚款",
                  discretion: "首次违法且情节轻微的，处以一万元罚款；多次违法的，处以五万元以上罚款",
                }
              ]
            }
          ]
        },
        { 
          id: "2", 
          name: "卫生防疫检查",
          isViolated: false,
          rightItems: [
            {
              id: "r2",
              name: "行政处罚",
              code: "11000000002",
              details: [
                {
                  id: "d2",
                  code: "11000000002001",
                  illegalAct: "违反卫生防疫规定",
                  violation: "《卫生防疫法》第二十条",
                  violationDetail: "未按规定进行消毒",
                  punishment: "责令改正，处以罚款",
                  punishmentDetail: "可以处以五千元以下的罚款",
                  discretion: "及时改正的，可以从轻处罚",
                }
              ]
            }
          ]
        },
      ],
    },
  ],
  evaluation: {
    rating: 4,  // 1-5 星
    comment: "执法人员态度认真负责，工作规范，指出的问题对企业很有帮助。希望以后能多提供一些政策法规方面的指导。",
    evaluateTime: "2024-03-26 15:30",
  },
};

const statusColorMap = {
  pending: "bg-yellow-500",
  processing: "bg-blue-500",
  closed: "bg-red-500",
  completed: "bg-green-500",
};

interface InspectionActivityDetailProps {
  id: string;
}

export function InspectionActivityDetail({ id }: InspectionActivityDetailProps) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        返回
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between gap-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">巡查对象</div>
              <div>{mockDetail.enterpriseName}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">统一社会信用代码</div>
              <div>{mockDetail.creditCode}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">法人代表</div>
              <div>{mockDetail.legalPerson}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">联系电话</div>
              <div>{mockDetail.phone}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">巡查时间</div>
              <div>{mockDetail.inspectionTime}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">创建时间</div>
              <div>{mockDetail.createTime}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">状态</div>
              <Badge className={statusColorMap[mockDetail.status]}>
                {InspectionStatusMap[mockDetail.status]}
              </Badge>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="p-2 bg-white rounded-lg">
              <img 
                src="/images/example-qr-code.png" 
                alt="检查活动二维码"
                width={120}
                height={120}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              检查活动二维码
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>巡查组</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {mockDetail.groups.map((group, index) => (
            <div key={group.id} className="space-y-4">
              <h4 className="font-medium">巡查组 {index + 1}</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">行业部门</div>
                  <div>{group.department}</div>
                </div>
                <div className="col-span-2 space-y-2">
                  <div className="text-sm text-muted-foreground">巡查人员</div>
                  <div className="space-y-2">
                    {group.inspectors.map((inspector, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex-1">
                          <span className="text-sm text-muted-foreground mr-2">姓名：</span>
                          {inspector.name}
                        </div>
                        <div className="flex-1">
                          <span className="text-sm text-muted-foreground mr-2">执法证号：</span>
                          {inspector.no}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-full space-y-4">
                  <div className="text-sm text-muted-foreground">巡查事项</div>
                  <div className="space-y-6">
                    {group.inspectionItems.map((item) => (
                      <div key={item.id} className="space-y-3">
                        <Badge 
                          variant={item.isViolated ? "destructive" : "secondary"}
                          className="inline-flex items-center gap-2 w-fit"
                        >
                          {item.name}
                          <span className={cn(
                            "px-1.5 py-0.5 rounded-sm text-xs font-semibold",
                            item.isViolated ? "bg-destructive-foreground text-destructive" : "bg-secondary-foreground text-secondary"
                          )}>
                            {item.isViolated ? "已违反" : "未违反"}
                          </span>
                        </Badge>

                        {item.rightItems.map((rightItem) => (
                          <div key={rightItem.id} className="ml-4 space-y-2">
                            <div className="font-medium text-sm">
                              {rightItem.name} ({rightItem.code})
                            </div>
                            <div className="space-y-4">
                              {rightItem.details.map((detail) => (
                                <div key={detail.id} className="ml-4 p-4 border rounded-lg space-y-2 text-sm">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <span className="text-muted-foreground">细项编码：</span>
                                      {detail.code}
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">违法行为：</span>
                                      {detail.illegalAct}
                                    </div>
                                    <div className="col-span-2">
                                      <span className="text-muted-foreground">违则：</span>
                                      {detail.violation}
                                    </div>
                                    <div className="col-span-2">
                                      <span className="text-muted-foreground">违则详情：</span>
                                      {detail.violationDetail}
                                    </div>
                                    <div className="col-span-2">
                                      <span className="text-muted-foreground">罚则：</span>
                                      {detail.punishment}
                                    </div>
                                    <div className="col-span-2">
                                      <span className="text-muted-foreground">罚则详情：</span>
                                      {detail.punishmentDetail}
                                    </div>
                                    <div className="col-span-2">
                                      <span className="text-muted-foreground">自由裁量标准：</span>
                                      {detail.discretion}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {mockDetail.evaluation && (
        <Card>
          <CardHeader>
            <CardTitle>企业评价</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">评价星级：</div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={cn(
                      "w-5 h-5",
                      star <= mockDetail.evaluation.rating
                        ? "text-yellow-400"
                        : "text-gray-200"
                    )}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">评价内容：</div>
              <div className="text-sm bg-muted/50 p-4 rounded-lg">
                {mockDetail.evaluation.comment}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              评价时间：{mockDetail.evaluation.evaluateTime}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 