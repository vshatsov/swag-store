/** @format */

"use client";

import { StockInfo } from "@/lib/api-client/generated-api/models/StockInfo";
import { useEffect, useState } from "react";
import QuantitySelector from "./quantity-selector";

const POLLING_INTERVAL = 1000 * 60;

interface StockClientProps {
  stock: StockInfo;
  disablePolling?: boolean;
}

async function fetchLiveStock(productId: string) {
  const newStockResponse = await fetch(`/api/stock/${productId}`);
  const response = await newStockResponse.json();
  return response;
}

export function AddToCartClient({
  stock: initialStock,
  disablePolling,
}: StockClientProps) {
  const [liveStock, setLiveStock] = useState(initialStock);

  useEffect(() => {
    setLiveStock(initialStock);
  }, [initialStock]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (!disablePolling) {
      intervalId = setInterval(async () => {
        try {
          const json = await fetchLiveStock(initialStock.productId || "");
          if (json?.data) {
            setLiveStock(json.data);
          }
        } catch (error) {
          console.error("Stock polling failed", error);
        }
      }, POLLING_INTERVAL);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 h-28">
      <QuantitySelector liveStock={liveStock} />
      <div className="h-24">
        {!disablePolling && liveStock.inStock && (
          <p className="text-sm text-green-500">
            In stock: {liveStock.stock} available
          </p>
        )}
        {!disablePolling && !liveStock.inStock && (
          <p className="text-sm text-red-500">
            Out of stock. Please check back later.
          </p>
        )}
        {!disablePolling && liveStock.lowStock && (
          <p className="text-sm text-red-500">
            Hurry! Only a few items left in stock.
          </p>
        )}
        {!disablePolling && !!liveStock.lowStock && !liveStock.lowStock && (
          <p className="text-sm text-red-500">
            Out of stock. Please check back later.
          </p>
        )}
      </div>
    </div>
  );
}
