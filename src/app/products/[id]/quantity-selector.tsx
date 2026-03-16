/** @format */

"use client";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { StockInfo } from "@/lib/api-client";
import { addToCartAction } from "./add-to-cart-action";

interface QuantitySelectorProps {
  liveStock: StockInfo;
}

export default function QuantitySelector({ liveStock }: QuantitySelectorProps) {
  const stock = liveStock.stock || 0;
  const [quantity, setQuantity] = useState(stock === 0 ? 0 : 1);
  const [pending, startTransition] = useTransition();
  return (
    <div className="flex w-full flex-col gap-4 h-24">
      <div className="flex gap-4 w-full">
        <ButtonGroup>
          <Button
            disabled={pending || quantity === 0}
            onClick={() => setQuantity(Math.max(0, quantity - 1))}
            size="lg"
            variant="outline"
          >
            <MinusIcon />
          </Button>
          <ButtonGroupText className="min-w-12 justify-center">
            {!!liveStock.productId && quantity}
          </ButtonGroupText>
          <Button
            onClick={() => setQuantity(quantity + 1)}
            disabled={pending || (!!liveStock.productId && quantity >= stock)}
            size="lg"
            variant="outline"
          >
            <PlusIcon />
          </Button>
        </ButtonGroup>
        <Button
          className="flex-2"
          size="lg"
          onClick={() =>
            startTransition(async () => {
              await addToCartAction(liveStock.productId || "", quantity);
              setQuantity(1); // reset quantity to 1 after adding to cart
            })
          }
          disabled={
            pending || quantity === 0 || !liveStock.inStock || quantity > stock
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
