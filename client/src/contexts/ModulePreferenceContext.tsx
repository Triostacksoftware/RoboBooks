"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { api } from "@/lib/api";

interface ModulePreference {
  name: string;
  label: string;
  description: string;
  isEnabled: boolean;
}

interface ModulePreferenceContextType {
  modulePreferences: ModulePreference[];
  loading: boolean;
  refreshPreferences: () => Promise<void>;
  isModuleEnabled: (moduleName: string) => boolean;
}

const ModulePreferenceContext = createContext<
  ModulePreferenceContextType | undefined
>(undefined);

export const useModulePreferences = () => {
  const context = useContext(ModulePreferenceContext);
  if (context === undefined) {
    throw new Error(
      "useModulePreferences must be used within a ModulePreferenceProvider"
    );
  }
  return context;
};

interface ModulePreferenceProviderProps {
  children: ReactNode;
}

export const ModulePreferenceProvider: React.FC<
  ModulePreferenceProviderProps
> = ({ children }) => {
  const pathname = usePathname();
  const [modulePreferences, setModulePreferences] = useState<
    ModulePreference[]
  >([]);
  const [loading, setLoading] = useState(true);

  const shouldSkipPreferenceLoad =
    !pathname ||
    pathname === "/admin/login" ||
    pathname === "/signin" ||
    pathname === "/register" ||
    pathname === "/" ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/services") ||
    pathname.startsWith("/features") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/faq") ||
    pathname.startsWith("/industries") ||
    pathname.startsWith("/footer") ||
    pathname.startsWith("/legal");

  const loadPreferences = async () => {
    if (shouldSkipPreferenceLoad) {
      setModulePreferences([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Use the api utility for consistent error handling
      const response = (await api("/api/module-preferences/preferences")) as {
        success: boolean;
        data: ModulePreference[];
      };

      if (response.success) {
        setModulePreferences(response.data || []);
      } else {
        setModulePreferences([]);
      }
    } catch (error) {
      console.error("Error loading module preferences:", error);
      // Set default preferences if loading fails
      setModulePreferences([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshPreferences = async () => {
    await loadPreferences();
  };

  const isModuleEnabled = (moduleName: string): boolean => {
    const module = modulePreferences.find((m) => m.name === moduleName);
    return module ? module.isEnabled : true; // Default to enabled if not found
  };

  useEffect(() => {
    loadPreferences();
  }, [pathname]);

  const value: ModulePreferenceContextType = {
    modulePreferences,
    loading,
    refreshPreferences,
    isModuleEnabled,
  };

  return (
    <ModulePreferenceContext.Provider value={value}>
      {children}
    </ModulePreferenceContext.Provider>
  );
};
