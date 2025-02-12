"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  InspectionActivitySearchParams, 
  InspectionStatus,
  InspectionStatusMap,
} from "@/types/inspection-activity";

const formSchema = z.object({
  enterpriseName: z.string().optional(),
  creditCode: z.string().optional(),
  legalPerson: z.string().optional(),
  phone: z.string().optional(),
  status: z.enum(["pending", "processing", "closed", "completed"] as const).optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
});

interface InspectionActivitySearchProps {
  onSearch: (values: InspectionActivitySearchParams) => void;
}

export function InspectionActivitySearch({ onSearch }: InspectionActivitySearchProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enterpriseName: "",
      creditCode: "",
      legalPerson: "",
      phone: "",
      status: undefined,
      startTime: "",
      endTime: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSearch(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="enterpriseName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>巡查对象</FormLabel>
                <FormControl>
                  <Input placeholder="请输入巡查对象" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="creditCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>统一社会信用代码</FormLabel>
                <FormControl>
                  <Input placeholder="请输入统一社会信用代码" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>状态</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="请选择状态" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(Object.entries(InspectionStatusMap) as [InspectionStatus, string][]).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>开始时间</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>结束时间</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="submit">搜索</Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => form.reset()}
          >
            重置
          </Button>
        </div>
      </form>
    </Form>
  );
} 