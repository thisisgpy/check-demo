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
import { DepartmentSearchParams } from "@/types/department";

const formSchema = z.object({
  name: z.string().optional(),
  scope: z.string().optional(),
});

interface DepartmentSearchProps {
  onSearch: (values: DepartmentSearchParams) => void;
}

export function DepartmentSearch({ onSearch }: DepartmentSearchProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      scope: "",
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>部门名称</FormLabel>
                <FormControl>
                  <Input placeholder="请输入部门名称" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="scope"
            render={({ field }) => (
              <FormItem>
                <FormLabel>管理范围</FormLabel>
                <FormControl>
                  <Input placeholder="请输入管理范围" {...field} />
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