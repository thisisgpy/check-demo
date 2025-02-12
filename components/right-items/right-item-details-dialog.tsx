"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RightItem, RightItemDetail } from "@/types/right-item";

// 模拟细项数据
const mockDetails: RightItemDetail[] = [
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
  {
    id: "2",
    code: "11000000001002",
    illegalAct: "超出许可范围经营",
    violation: "《行政许可法》第四条",
    violationDetail: "必须在许可的范围内从事经营活动",
    punishment: "责令改正，处以罚款",
    punishmentDetail: "可以处以五千元以上五万元以下的罚款",
    discretion: "首次违法且及时改正的，处以五千元罚款；拒不改正的，处以三万元以上罚款",
    parentCode: "11000000001",
  },
];

interface RightItemDetailsDialogProps {
  item: RightItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RightItemDetailsDialog({
  item,
  open,
  onOpenChange,
}: RightItemDetailsDialogProps) {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {item.name} - 细项列表
          </DialogTitle>
        </DialogHeader>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center whitespace-nowrap">细项编码</TableHead>
                <TableHead className="text-center whitespace-nowrap">违法行为</TableHead>
                <TableHead className="text-center whitespace-nowrap">违则</TableHead>
                <TableHead className="text-center whitespace-nowrap">违则详情</TableHead>
                <TableHead className="text-center whitespace-nowrap">罚则</TableHead>
                <TableHead className="text-center whitespace-nowrap">罚则详情</TableHead>
                <TableHead className="text-center whitespace-nowrap">自由裁量标准</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDetails.map((detail) => (
                <TableRow key={detail.id}>
                  <TableCell className="text-center">{detail.code}</TableCell>
                  <TableCell className="text-center">{detail.illegalAct}</TableCell>
                  <TableCell className="text-center">{detail.violation}</TableCell>
                  <TableCell className="text-center">{detail.violationDetail}</TableCell>
                  <TableCell className="text-center">{detail.punishment}</TableCell>
                  <TableCell className="text-center">{detail.punishmentDetail}</TableCell>
                  <TableCell className="text-center">{detail.discretion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
} 