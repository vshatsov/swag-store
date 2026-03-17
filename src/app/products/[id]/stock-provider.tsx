/** @format */

"use client";

import { StockInfo } from "@/lib/api-client/generated-api/models/StockInfo";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface StockContextType {
  stock: StockInfo | null;
  setStock: Dispatch<SetStateAction<StockInfo | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

interface StockProviderProps {
  children: ReactNode;
  initialStock?: StockInfo;
}

async function fetchLiveStock(productId: string) {
  const newStockResponse = await fetch(`/api/stock/${productId}`);
  const response = await newStockResponse.json();
  return response;
}

const POLLING_INTERVAL = 5000;

export function StockProvider({ children, initialStock }: StockProviderProps) {
  const [stock, setStock] = useState<StockInfo | null>(initialStock || null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const json = await fetchLiveStock(initialStock?.productId || "");
        if (json?.data) {
          setStock(json.data);
        }
      } catch (error) {
        console.error("Stock polling failed", error);
      }
    }, POLLING_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <StockContext.Provider value={{ stock, setStock, isLoading, setIsLoading }}>
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  const context = useContext(StockContext);

  if (context === undefined) {
    throw new Error("useStock must be used within StockProvider");
  }

  return context;
}
