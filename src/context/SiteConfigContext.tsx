"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { siteConfig as defaultConfig, SiteConfigType } from "@/config/siteConfig";

interface CmsContextValue {
  config: SiteConfigType;
  refreshConfig: () => Promise<void>;
  updateLocalConfig: (newConfig: SiteConfigType) => void;
}

const SiteConfigContext = createContext<CmsContextValue>({
  config: defaultConfig,
  refreshConfig: async () => {},
  updateLocalConfig: () => {},
});

export function SiteConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [config, setConfig] = useState<SiteConfigType>(defaultConfig);

  const refreshConfig = async () => {
    // 1. Load immediate local override if saved on this browser
    let localData: SiteConfigType | null = null;
    try {
      const cached = localStorage.getItem("shraddha_cms_override");
      if (cached) {
        localData = JSON.parse(cached);
        if (localData) setConfig(localData);
      }
    } catch {
      // Ignore
    }

    // 2. Fetch latest server state
    try {
      const res = await fetch("/api/cms", { cache: "no-store" });
      if (res.ok) {
        const serverData = await res.json();
        // If server has custom data (or no local override exists), apply server data
        if (!localData || JSON.stringify(serverData) !== JSON.stringify(defaultConfig)) {
          setConfig(serverData);
          localStorage.setItem("shraddha_cms_override", JSON.stringify(serverData));
        }
      }
    } catch {
      // Offline fallback already handled by localData
    }
  };

  useEffect(() => {
    refreshConfig();

    // Sync across multiple open tabs immediately when Admin clicks Save
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "shraddha_cms_override" && e.newValue) {
        try {
          setConfig(JSON.parse(e.newValue));
        } catch {
          // Ignore
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const updateLocalConfig = (newConfig: SiteConfigType) => {
    setConfig(newConfig);
    try {
      localStorage.setItem("shraddha_cms_override", JSON.stringify(newConfig));
    } catch {
      // Ignore
    }
  };

  return (
    <SiteConfigContext.Provider
      value={{ config, refreshConfig, updateLocalConfig }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}