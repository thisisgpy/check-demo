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
import { NoDisturbSearchParams } from "@/types/no-disturb";

const formSchema = z.object({
  name: z.string().optional(),
  creditCode: z.string().optional(),
  legalPerson: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

interface NoDisturbSearchProps {
  onSearch: (values: NoDisturbSearchParams) => void;
}

export function NoDisturbSearch({ onSearch }: NoDisturbSearchProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      creditCode: "",
      legalPerson: "",
      phone: "",
      address: "",
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
                <FormLabel>企业名称</FormLabel>
                <FormControl>
                  <Input placeholder="请输入企业名称" {...field} />
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
            name="legalPerson"
            render={({ field }) => (
              <FormItem>
                <FormLabel>法人代表</FormLabel>
                <FormControl>
                  <Input placeholder="请输入法人代表" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>联系电话</FormLabel>
                <FormControl>
                  <Input placeholder="请输入联系电话" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>注册地址</FormLabel>
                <FormControl>
                  <Input placeholder="请输入注册地址" {...field} />
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