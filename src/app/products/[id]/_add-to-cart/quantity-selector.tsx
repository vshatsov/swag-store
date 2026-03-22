/** @format */

"use client";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { useCart } from "@/app/_cart/cart-provider";
import { useStock } from "../stock-provider";
import { Product } from "@/lib/api-client";
import { toast } from "sonner";
import { withDelayedFallback } from "@/lib/utils";

export default function QuantitySelector({ product }: { product: Product }) {
  const { stock: stockInfo } = useStock();
  const stock = stockInfo?.stock || 0;
  const { addToCart } = useCart();
  const [isOptimisticItemLoad, setIsOptimisticItemLoad] = useState(false);
  const [quantity, setQuantity] = useState(stock === 0 ? 0 : 1);
  return (
    <div className="flex w-full flex-col gap-4 h-24">
      <div className="flex gap-4 w-full">
        <ButtonGroup>
          <Button
            disabled={isOptimisticItemLoad || quantity === 0}
            onClick={() => setQuantity(Math.max(0, quantity - 1))}
            size="lg"
            variant="outline"
          >
            <MinusIcon />
          </Button>
          <ButtonGroupText className="min-w-12 justify-center">
            {!!stockInfo?.productId && quantity}
          </ButtonGroupText>
          <Button
            onClick={() => setQuantity(quantity + 1)}
            disabled={
              isOptimisticItemLoad ||
              (!!stockInfo?.productId && quantity >= stock)
            }
            size="lg"
            variant="outline"
          >
            <PlusIcon />
          </Button>
        </ButtonGroup>
        <Button
          className="flex-2"
          size="lg"
          onClick={async () => {
            try {
              setIsOptimisticItemLoad(true);
              await withDelayedFallback(
                async () => {
                  await addToCart({
                    productId: stockInfo?.productId || "",
                    quantity,
                    product,
                  });
                  setQuantity(1)
                },
                () => {
                  setIsOptimisticItemLoad(false);
                  setQuantity(1);
                },
                500,
              );
              setIsOptimisticItemLoad(false);
              toast(
                `${product?.name} (${quantity}) was successfully added to your shopping cart!`,
              );
            } catch (error) {
              toast.error(
                `${product?.name} (${quantity}) failed! ${JSON.stringify(error)}`,
              );
            }
          }}
          disabled={
            isOptimisticItemLoad ||
            quantity === 0 ||
            !stockInfo?.inStock ||
            quantity > stock
          }
        >
          {quantity > stock
            ? "You can't add more items than in stock"
            : "Add to cart"}
        </Button>
      </div>
    </div>
  );
}
