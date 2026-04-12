"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAdminAuthenticated, logoutAdmin } from "@/lib/admin/auth";
import { LayoutDashboard, Users, Send, LogOut, BarChart3 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push("/admin/login");
    } else {
      setAuthenticated(true);
    }
  }, [router]);

  if (!authenticated) return null;

  const menuItems = [
    { name: "Analytics", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Leads", href: "/admin/dashboard?view=leads", icon: Users },
    { name: "Broadcast", href: "/admin/broadcast", icon: Send },
  ];

  return (
    <div className="flex min-h-screen bg-[#090909] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col fixed inset-y-0">
        <div className="p-8 border-b border-white/5">
          <div className="relative w-32 h-10">
            <Image src="/brand/logo/wad-logo.png" alt="WAD" fill className="object-contain" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-brand-accent/40 mt-2 font-bold">Admin Panel</p>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.name === "Leads" && pathname === "/admin/dashboard" && typeof window !== 'undefined' && window.location.search.includes('view=leads'));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? "bg-white/10 text-white" : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => {
              logoutAdmin();
              router.push("/admin/login");
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-red/60 hover:text-brand-red hover:bg-brand-red/5 transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow pl-64">
        <div className="p-12 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
