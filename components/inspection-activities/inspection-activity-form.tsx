"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Plus, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

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
    inspectors: z.array(z.object({
      name: z.string().min(1, "请输入巡查人员名称"),
      no: z.string().min(1, "请输入执法证号"),
    })).min(1, "请至少添加一名巡查人员"),
    inspectionItemIds: z.array(z.string()).min(1, "请选择巡查事项"),
  })).min(1, "请至少添加一组巡查事项"),
});

export function InspectionActivityForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const enterpriseId = searchParams.get('enterpriseId');
  const [showAlert, setShowAlert] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enterpriseId: enterpriseId || "",
      inspectionTime: "",
      inspectionGroups: [
        {
          department: "",
          inspectors: [{ name: "", no: "" }],
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
    // TODO: 调用API创建检查活动
    console.log('创建检查活动:', values);
    setShowAlert(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(form.getValues());
              }} 
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="enterpriseId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>巡查企业</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        disabled={!!enterpriseId}
                      >
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
                      <div className="col-span-2 space-y-4">
                        <div className="flex items-center justify-between">
                          <FormLabel>巡查人员</FormLabel>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const currentInspectors = form.getValues(`inspectionGroups.${index}.inspectors`) || [];
                              form.setValue(`inspectionGroups.${index}.inspectors`, [
                                ...currentInspectors,
                                { name: "", no: "" }
                              ]);
                            }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            添加巡查人员
                          </Button>
                        </div>
                        
                        {form.watch(`inspectionGroups.${index}.inspectors`)?.map((_, inspectorIndex) => (
                          <div key={inspectorIndex} className="flex gap-4 items-start">
                            <FormField
                              control={form.control}
                              name={`inspectionGroups.${index}.inspectors.${inspectorIndex}.name`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input placeholder="请输入巡查人员姓名" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`inspectionGroups.${index}.inspectors.${inspectorIndex}.no`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input placeholder="请输入执法证号" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            {inspectorIndex > 0 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  const currentInspectors = form.getValues(`inspectionGroups.${index}.inspectors`);
                                  form.setValue(
                                    `inspectionGroups.${index}.inspectors`,
                                    currentInspectors.filter((_, i) => i !== inspectorIndex)
                                  );
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
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
                    inspectors: [{ name: "", no: "" }],
                    inspectionItemIds: [],
                  })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  添加巡查组
                </Button>
              </div>

              <div className="flex justify-end pt-6">
                <Button type="submit">
                  保存
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>提示</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              在系统实际操作中，如果同一检查人员对同一企业连续检查3次未发现问题，系统将禁止本次检查活动的创建。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => router.push('/inspection-activities')}>
              确认
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 