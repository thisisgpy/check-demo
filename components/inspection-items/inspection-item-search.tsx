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
import { InspectionItemSearchParams } from "@/types/inspection-item";

const formSchema = z.object({
  code: z.string().optional(),
  name: z.string().optional(),
  profession: z.string().optional(),
  type: z.string().optional(),
});

interface InspectionItemSearchProps {
  onSearch: (values: InspectionItemSearchParams) => void;
}

export function InspectionItemSearch({ onSearch }: InspectionItemSearchProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      name: "",
      profession: "",
      type: "",
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
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>事项编码</FormLabel>
                <FormControl>
                  <Input placeholder="请输入事项编码" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>事项名称</FormLabel>
                <FormControl>
                  <Input placeholder="请输入事项名称" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel>专业类型</FormLabel>
                <FormControl>
                  <Input placeholder="请输入专业类型" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>检查类型</FormLabel>
                <FormControl>
                  <Input placeholder="请输入检查类型" {...field} />
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