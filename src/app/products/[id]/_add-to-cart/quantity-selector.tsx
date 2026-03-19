/** @format */

"use client";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { useCart } from "@/app/_cart/cart-provider";
import { useStock } from "../stock-provider";
import { Product } from "@/lib/api-client";

export default function QuantitySelector({ product }: { product: Product }) {
  const { stock: stockInfo } = useStock();
  const stock = stockInfo?.stock || 0;
  const { addToCart, pending } = useCart();
  const [quantity, setQuantity] = useState(stock === 0 ? 0 : 1);
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
            {!!stockInfo?.productId && quantity}
          </ButtonGroupText>
          <Button
            onClick={() => setQuantity(quantity + 1)}
            disabled={pending || (!!stockInfo?.productId && quantity >= stock)}
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
            await addToCart({
              productId: stockInfo?.productId || "",
              quantity,
              product,
            });
            setQuantity(1); // reset quantity to 1 after adding to cart
          }}
          disabled={
            pending || quantity === 0 || !stockInfo?.inStock || quantity > stock
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
