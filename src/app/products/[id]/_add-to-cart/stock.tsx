/** @format */

"use client";

import { useStock } from "../stock-provider";


export function Stock() {
  const { stock } = useStock();
  return (
    <>
      <div className="h-24">
        {stock?.inStock && (
          <p className="text-sm text-green-500">
            In stock: {stock?.stock} available
          </p>
        )}
        {!stock?.inStock && (
          <p className="text-sm text-red-500">
            Out of stock. Please check back later.
          </p>
        )}
        {stock?.lowStock && (
          <p className="text-sm text-red-500">
            Hurry! Only a few items left in stock.
          </p>
        )}
      </div>
    </>
  );
}
