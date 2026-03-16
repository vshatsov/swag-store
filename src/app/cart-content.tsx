/** @format */

"use client";

import { DrawerDescription } from "@/components/ui/drawer";
import { CartItemWithProduct, CartWithProducts } from "@/lib/api-client";
import { useOptimistic, useTransition } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { updateCartItem } from "./update-cart-action";

interface CartContentProps {
  cartData: CartWithProducts;
}

export function CartContent({ cartData }: CartContentProps) {
  const [pending, startTransition] = useTransition();
  const [optimisticCart, optimisticChangeProductQuantity] = useOptimistic(
    cartData,
    (
      state: CartWithProducts,
      { productId, quantity }: { productId: string; quantity: number },
    ) => {
      const updatedItems = (state.items || [])
        .map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        )
        .filter((item) => (item.quantity || 0) > 0) as CartItemWithProduct[];
      return {
        ...state,
        items: updatedItems,
        subtotal: updatedItems.reduce(
          (sum: number, item: CartItemWithProduct) =>
            sum + (item?.product?.price || 0) * (item.quantity || 0),
          0,
        ),
      };
    },
  );

  async function changeProductQuantity(args: {
    productId: string;
    quantity: number;
  }) {
    startTransition(async () => {
      optimisticChangeProductQuantity(args);
      await updateCartItem(args.productId, args.quantity);
    });
  }

  return (
    <>
      {optimisticCart?.items?.length === 0 ? (
        <DrawerDescription className="p-4">
          Your cart is empty.
        </DrawerDescription>
      ) : (
        <div className="p-4">
          {optimisticCart?.items?.map((item) => (
            <CartItem
              key={item?.productId}
              item={item}
              changeProductQuantity={changeProductQuantity}
            />
          ))}
          <div className="flex justify-end mt-4">
            <p className="text-lg font-semibold">
              Total: ${optimisticCart?.subtotal?.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function CartItem({
  item,
  changeProductQuantity,
}: {
  item: CartItemWithProduct;
  changeProductQuantity: (args: {
    productId: string;
    quantity: number;
  }) => void;
}) {
  const quantity = item.quantity || 0;
  return (
    <div key={item.productId} className="mb-4">
      <div className="relative h-12 w-full">
        <Image
          src={item.product?.images?.[0] || ""}
          alt={`${item.product?.name}`}
          fill
          placeholder="empty"
          className="object-contain"
          quality={50}
        />
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <div>
            <p className="font-medium">{item.product?.name}</p>
            <p className="text-sm text-secondary">Quantity: {quantity}</p>
            <div className="flex flex-col">
              <ButtonGroup>
                <Button
                  size="lg"
                  variant="outline"
                  disabled={quantity <= 1}
                  onClick={() => {
                    changeProductQuantity({
                      productId: item.productId || "",
                      quantity: quantity - 1,
                    });
                  }}
                >
                  <MinusIcon />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    changeProductQuantity({
                      productId: item.productId || "",
                      quantity: 0,
                    });
                  }}
                >
                  <Trash2Icon size={16} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    changeProductQuantity({
                      productId: item.productId || "",
                      quantity: quantity + 1,
                    });
                  }}
                >
                  <PlusIcon />
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
        <p className="font-medium">${item.product?.price?.toFixed(2)}</p>
      </div>
    </div>
  );
}
