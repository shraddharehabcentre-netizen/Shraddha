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
    try {
      const res = await fetch("/api/cms", { cache: "no-store" });
      if (res.ok) {
        const serverData = await res.json();
        setConfig(serverData);
        return;
      }
    } catch {
      // Fallback to localStorage override if offline
    }

    try {
      const cached = localStorage.getItem("shraddha_cms_override");
      if (cached) {
        setConfig(JSON.parse(cached));
      }
    } catch {
      // Ignore storage error
    }
  };

  useEffect(() => {
    refreshConfig();
  }, []);

  const updateLocalConfig = (newConfig: SiteConfigType) => {
    setConfig(newConfig);
    try {
      localStorage.setItem("shraddha_cms_override", JSON.stringify(newConfig));
    } catch {
      // Ignore storage error
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