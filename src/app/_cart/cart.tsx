/** @format */

import { ShoppingBasket } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { CartContent } from "./cart-content";
import { CartInitClient } from "./cart-init-client";
import { GoToCheckout } from "./go-to-checkout";
import { getCart } from "../_api/get-cart";
import { CartBadge } from "./cart-badge";

export async function Cart() {
  const data = await getCart();

  return (
    <>
      <div key={data.updatedAt?.toString()}>
        <CartInitClient cartData={data} />
      </div>
      <div className="flex items-center gap-2">
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <div className="relative p-2 rounded-md cursor-pointer">
              <ShoppingBasket className="h-5 w-5" />
              <CartBadge />
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>See your order:</DrawerTitle>
            </DrawerHeader>
            <CartContent />
            <DrawerFooter>
              <GoToCheckout />
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

export function CartSkeleton() {
  return (
    <div className="p-2 opacity-50">
      <ShoppingBasket className="h-5 w-5" />
    </div>
  );
}
