'use client'
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Building2,
  ClipboardCheck,
  FileCheck,
  ShieldCheck,
} from "lucide-react";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    title: "企业库",
    href: "/enterprise",
    icon: Building2,
  },
  {
    title: "巡查活动",
    href: "/inspection-activities",
    icon: ClipboardCheck,
  },
  {
    title: "巡查事项",
    href: "/inspection-items",
    icon: FileCheck,
  },
  {
    title: "权利事项",
    href: "/right-items",
    icon: ShieldCheck,
  },
  {
    title: "无事不扰",
    href: "/no-disturb",
    icon: FileCheck,
  },
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent" : "transparent"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 