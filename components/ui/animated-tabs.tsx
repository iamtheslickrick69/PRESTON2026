"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Building2, UserCog, User, ArrowRight } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs?: Tab[];
  defaultTab?: string;
  className?: string;
}

const portalTabs: Tab[] = [
  {
    id: "clinic",
    label: "Clinic",
    content: (
      <div className="flex flex-col items-center justify-center text-center h-full py-4">
        <div className="w-14 h-14 rounded-2xl bg-gray-500/20 flex items-center justify-center mb-4">
          <Building2 className="w-7 h-7 text-gray-400" strokeWidth={1.5} />
        </div>
        <h3 className="text-white font-semibold text-lg mb-1">Clinic</h3>
        <p className="text-neutral-500 text-sm mb-5">Manage providers, billing & analytics</p>
        <div className="flex items-center gap-3 w-full max-w-[280px]">
          <Link href="/clinic/dashboard" className="flex-1">
            <button className="w-full px-4 py-2.5 rounded-lg border border-neutral-700 text-neutral-300 text-sm font-medium hover:bg-neutral-800 hover:text-white transition-colors">
              Try Demo
            </button>
          </Link>
          <Link href="/auth/clinic-login" className="flex-1">
            <button className="w-full px-4 py-2.5 rounded-lg bg-gray-600 text-white text-sm font-medium hover:bg-gray-500 transition-colors flex items-center justify-center gap-1">
              Login <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </Link>
        </div>
      </div>
    ),
  },
  {
    id: "provider",
    label: "Provider",
    content: (
      <div className="flex flex-col items-center justify-center text-center h-full py-4">
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-4">
          <UserCog className="w-7 h-7 text-cyan-400" strokeWidth={1.5} />
        </div>
        <h3 className="text-white font-semibold text-lg mb-1">Provider Portal</h3>
        <p className="text-neutral-500 text-sm mb-5">Patient care, protocols & dosing</p>
        <div className="flex items-center gap-3 w-full max-w-[280px]">
          <Link href="/provider/dashboard" className="flex-1">
            <button className="w-full px-4 py-2.5 rounded-lg border border-neutral-700 text-neutral-300 text-sm font-medium hover:bg-neutral-800 hover:text-white transition-colors">
              Try Demo
            </button>
          </Link>
          <Link href="/auth/provider-login" className="flex-1">
            <button className="w-full px-4 py-2.5 rounded-lg bg-cyan-500 text-white text-sm font-medium hover:bg-cyan-600 transition-colors flex items-center justify-center gap-1">
              Login <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </Link>
        </div>
      </div>
    ),
  },
  {
    id: "patient",
    label: "Patient Portal",
    content: (
      <div className="flex flex-col items-center justify-center text-center h-full py-4">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/20 flex items-center justify-center mb-4">
          <User className="w-7 h-7 text-rose-400" strokeWidth={1.5} />
        </div>
        <h3 className="text-white font-semibold text-lg mb-1">Patient Portal</h3>
        <p className="text-neutral-500 text-sm mb-5">Orders, treatments & resources</p>
        <div className="flex items-center gap-3 w-full max-w-[280px]">
          <Link href="/patient/dashboard" className="flex-1">
            <button className="w-full px-4 py-2.5 rounded-lg border border-neutral-700 text-neutral-300 text-sm font-medium hover:bg-neutral-800 hover:text-white transition-colors">
              Try Demo
            </button>
          </Link>
          <Link href="/auth/patient-login" className="flex-1">
            <button className="w-full px-4 py-2.5 rounded-lg bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 transition-colors flex items-center justify-center gap-1">
              Login <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </Link>
        </div>
      </div>
    ),
  },
];

const AnimatedTabs = ({
  tabs = portalTabs,
  defaultTab,
  className,
}: AnimatedTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id);

  if (!tabs?.length) return null;

  return (
    <div className={cn("w-full flex flex-col gap-y-2", className)}>
      <div className="flex gap-1 flex-wrap bg-neutral-900/80 backdrop-blur-sm p-1.5 rounded-xl border border-neutral-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative flex-1 px-4 py-2 text-sm font-medium rounded-lg text-white outline-none transition-colors"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-portal-tab"
                className="absolute inset-0 bg-neutral-800 shadow-lg backdrop-blur-sm rounded-lg"
                transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-5 bg-neutral-900/80 text-white backdrop-blur-sm rounded-xl border border-neutral-800 min-h-[240px]">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  y: 10,
                  filter: "blur(10px)",
                }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, y: 10, filter: "blur(10px)" }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  type: "spring",
                  bounce: 0.1,
                }}
                className="h-full"
              >
                {tab.content}
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};

export { AnimatedTabs, portalTabs };
export type { Tab, AnimatedTabsProps };
