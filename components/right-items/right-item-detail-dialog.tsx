"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RightItem } from "@/types/right-item";

const formSchema = z.object({
  code: z.string().min(1, "细项编码不能为空"),
  illegalBehavior: z.string().min(1, "违法行为不能为空"),
  violationRule: z.string().min(1, "违则不能为空"),
  violationDetail: z.string().min(1, "违则详情不能为空"),
  punishmentRule: z.string().min(1, "罚则不能为空"),
  punishmentDetail: z.string().min(1, "罚则详情不能为空"),
  discretionStandard: z.string().min(1, "自由裁量标准不能为空"),
});

interface RightItemDetailDialogProps {
  rightItem: RightItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
}

export function RightItemDetailDialog({
  rightItem,
  open,
  onOpenChange,
  onSubmit,
}: RightItemDetailDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      illegalBehavior: "",
      violationRule: "",
      violationDetail: "",
      punishmentRule: "",
      punishmentDetail: "",
      discretionStandard: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit?.(values);
    form.reset();
    onOpenChange(false);
  };

  if (!rightItem) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>添加细项 - {rightItem.name}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>细项编码</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入细项编码" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="illegalBehavior"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>违法行为</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="请输入违法行为" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="violationRule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>违则</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入违则" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="violationDetail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>违则详情</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="请输入违则详情" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="punishmentRule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>罚则</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入罚则" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="punishmentDetail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>罚则详情</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="请输入罚则详情" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discretionStandard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>自由裁量标准</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="请输入自由裁量标准" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">保存</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 