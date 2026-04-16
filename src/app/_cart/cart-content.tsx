/** @format */

"use client";

import { DrawerDescription } from "@/components/ui/drawer";
import { CartItemWithProduct } from "@/lib/api-client";
import { ProductImage } from "@/components/product-image";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useCart } from "./cart-provider";
import { centsToDollarsString } from "@/lib/utils";

export function CartContent() {
  const { optimisticCartData, updateQuantity } = useCart();

  return (
    <>
      {optimisticCartData?.items?.length === 0 ? (
        <DrawerDescription className="p-4">
          Your cart is empty.
        </DrawerDescription>
      ) : (
        <div className="p-4">
          {optimisticCartData?.items?.map((item) => (
            <CartItem
              key={item?.productId}
              item={item}
              changeProductQuantity={updateQuantity}
            />
          ))}
          <div className="flex justify-end mt-4">
            <p className="text-lg font-semibold">
              Total: {centsToDollarsString(optimisticCartData?.subtotal || 0)}
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
        <ProductImage
          src={item.product?.images?.[0]}
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
        <p className="font-medium">
          {centsToDollarsString(item.product?.price || 0)}
        </p>
      </div>
    </div>
  );
}
