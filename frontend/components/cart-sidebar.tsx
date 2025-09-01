"use client"

import * as Dialog from "@radix-ui/react-dialog";
import { useCart } from "@/contexts/cart-context";
import { CartDrawer } from "@/components/cart-drawer";

export function CartSidebar() {
  const { isCartSidebarOpen, closeCartSidebar } = useCart();

  return (
    <Dialog.Root open={isCartSidebarOpen} onOpenChange={closeCartSidebar}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content 
          className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <CartDrawer />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
