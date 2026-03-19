/** @format */

"use client";

import { useStock } from "../stock-provider";


interface StockProps {
  disablePolling?: boolean;
}

export function Stock({ disablePolling }: StockProps) {
  const { stock } = useStock();
  return (
    <>
      <div className="h-24">
        {!disablePolling && stock?.inStock && (
          <p className="text-sm text-green-500">
            In stock: {stock?.stock} available
          </p>
        )}
        {!disablePolling && !stock?.inStock && (
          <p className="text-sm text-red-500">
            Out of stock. Please check back later.
          </p>
        )}
        {!disablePolling && stock?.lowStock && (
          <p className="text-sm text-red-500">
            Hurry! Only a few items left in stock?.
          </p>
        )}
        {!disablePolling && !!stock?.lowStock && !stock?.lowStock && (
          <p className="text-sm text-red-500">
            Out of stock. Please check back later.
          </p>
        )}
      </div>
    </>
  );
}
