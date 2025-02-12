"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";

// 示例数据
const mockEnterprises = [
  { id: "1", name: "北京餐饮有限公司" },
  { id: "2", name: "上海建筑工程有限公司" },
  { id: "3", name: "广州食品有限公司" },
];

const mockInspectionItems = [
  { id: "1", name: "食品安全日常检查" },
  { id: "2", name: "卫生防疫检查" },
  { id: "3", name: "消防安全检查" },
];

// 添加部门数据
const departments = [
  { id: "market", name: "市监" },
  { id: "land", name: "国土" },
  { id: "construction", name: "住建" },
  { id: "urban", name: "城管" },
  { id: "planning", name: "规划" },
  { id: "traffic", name: "交通" },
  { id: "water", name: "水务" },
];

const formSchema = z.object({
  enterpriseId: z.string().min(1, "请选择巡查企业"),
  inspectionTime: z.string().min(1, "请选择巡查时间"),
  inspectionGroups: z.array(z.object({
    department: z.string().min(1, "请输入行业部门"),
    inspectorName: z.string().min(1, "请输入巡查人员名称"),
    inspectorNo: z.string().min(1, "请输入执法证号"),
    inspectionItemIds: z.array(z.string()).min(1, "请选择巡查事项"),
  })).min(1, "请至少添加一组巡查事项"),
});

interface InspectionActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
}

export function InspectionActivityDialog({
  open,
  onOpenChange,
  onSubmit,
}: InspectionActivityDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enterpriseId: "",
      inspectionTime: "",
      inspectionGroups: [
        {
          department: "",
          inspectorName: "",
          inspectorNo: "",
          inspectionItemIds: [],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "inspectionGroups",
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit?.(values);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>新增巡查活动</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="enterpriseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>巡查企业</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="请选择巡查企业" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockEnterprises.map((enterprise) => (
                          <SelectItem key={enterprise.id} value={enterprise.id}>
                            {enterprise.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inspectionTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>巡查时间</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">巡查组 {index + 1}</h4>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`inspectionGroups.${index}.department`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>行业部门</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="请选择行业部门" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept.id} value={dept.id}>
                                  {dept.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`inspectionGroups.${index}.inspectorName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>巡查人员</FormLabel>
                          <FormControl>
                            <Input placeholder="请输入巡查人员姓名" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`inspectionGroups.${index}.inspectorNo`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>执法证号</FormLabel>
                          <FormControl>
                            <Input placeholder="请输入执法证号" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`inspectionGroups.${index}.inspectionItemIds`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>巡查事项</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              const values = new Set(field.value);
                              if (values.has(value)) {
                                values.delete(value);
                              } else {
                                values.add(value);
                              }
                              field.onChange(Array.from(values));
                            }}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="请选择巡查事项" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mockInspectionItems.map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div className="mt-2 space-y-1">
                            <div className="text-sm text-muted-foreground">
                              已选择: {field.value?.length || 0} 项
                            </div>
                            {field.value?.length > 0 && (
                              <div className="text-sm">
                                {field.value.map((id) => (
                                  mockInspectionItems.find(item => item.id === id)?.name
                                )).join(", ")}
                              </div>
                            )}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => append({
                  department: "",
                  inspectorName: "",
                  inspectorNo: "",
                  inspectionItemIds: [],
                })}
              >
                <Plus className="mr-2 h-4 w-4" />
                添加巡查组
              </Button>
            </div>

            <DialogFooter>
              <Button type="submit">保存</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 