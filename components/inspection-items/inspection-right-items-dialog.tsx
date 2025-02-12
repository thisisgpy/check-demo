"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InspectionItem } from "@/types/inspection-item";
import { RightItem, RightItemDetail } from "@/types/right-item";

// 模拟关联的权力事项数据
const mockRightItems: (RightItem & { details: RightItemDetail[] })[] = [
  {
    id: "1",
    code: "11000000001",
    name: "行政许可",
    details: [
      {
        id: "1",
        code: "11000000001001",
        illegalAct: "未经许可从事经营活动",
        violation: "《行政许可法》第三条",
        violationDetail: "从事特定活动，必须经过行政机关批准",
        punishment: "责令停止经营活动，处以罚款",
        punishmentDetail: "可以处以一万元以上十万元以下的罚款",
        discretion: "首次违法且情节轻微的，处以一万元罚款；多次违法的，处以五万元以上罚款",
        parentCode: "11000000001",
      },
    ],
  },
];

interface InspectionRightItemsDialogProps {
  item: InspectionItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InspectionRightItemsDialog({
  item,
  open,
  onOpenChange,
}: InspectionRightItemsDialogProps) {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {item.name} - 关联权力事项
          </DialogTitle>
        </DialogHeader>
        <Accordion 
          type="multiple"
          defaultValue={mockRightItems.map(item => item.id)}
          className="w-full"
        >
          {mockRightItems.map((rightItem) => (
            <AccordionItem key={rightItem.id} value={rightItem.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">{rightItem.name}</span>
                  <span className="text-sm text-muted-foreground">
                    ({rightItem.code})
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="rounded-md border mt-2">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-center whitespace-nowrap">细项编码</th>
                        <th className="p-2 text-center whitespace-nowrap">违法行为</th>
                        <th className="p-2 text-center whitespace-nowrap">违则</th>
                        <th className="p-2 text-center whitespace-nowrap">违则详情</th>
                        <th className="p-2 text-center whitespace-nowrap">罚则</th>
                        <th className="p-2 text-center whitespace-nowrap">罚则详情</th>
                        <th className="p-2 text-center whitespace-nowrap">自由裁量标准</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rightItem.details.map((detail) => (
                        <tr key={detail.id} className="border-b">
                          <td className="p-2 text-center">{detail.code}</td>
                          <td className="p-2 text-center">{detail.illegalAct}</td>
                          <td className="p-2 text-center">{detail.violation}</td>
                          <td className="p-2 text-center">{detail.violationDetail}</td>
                          <td className="p-2 text-center">{detail.punishment}</td>
                          <td className="p-2 text-center">{detail.punishmentDetail}</td>
                          <td className="p-2 text-center">{detail.discretion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </DialogContent>
    </Dialog>
  );
} 