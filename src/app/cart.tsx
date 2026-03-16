/** @format */

import { ShoppingBasket } from "lucide-react";
import { cookies } from "next/headers";
import { Badge } from "@/components/ui/badge";
import { cartApi, CartWithProducts } from "@/lib/api-client";
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

export async function Cart() {
  const cookieStore = await cookies();
  const token = cookieStore.get("x-cart-token")?.value;
  let data: CartWithProducts = { items: [] };
  if (token) {
    const { data: cartData } = await cartApi.getCart({
      xCartToken: token || "",
    });
    if (cartData) {
      data = cartData;
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <div className="relative p-2 rounded-md cursor-pointer">
            <ShoppingBasket className="h-5 w-5" />
            {data?.totalItems || 0 > 0 ? (
              <Badge
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full px-0 text-[10px] leading-none"
                variant="destructive"
              >
                {data.totalItems}
              </Badge>
            ) : null}
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>See your order:</DrawerTitle>
          </DrawerHeader>
          <CartContent cartData={data} />
          <DrawerFooter>
            <Button>Go to checkout</Button>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export function CartSkeleton() {
  return (
    <div className="p-2 opacity-50">
      <ShoppingBasket className="h-5 w-5" />
    </div>
  );
}
