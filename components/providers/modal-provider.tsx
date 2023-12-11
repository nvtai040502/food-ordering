"use client";

import DeleteCategoryModal from "@/components/modals/category/delete";
import { useEffect, useState } from "react";
import CreateMenuItemModal from "../modals/menu-item/create-modal";
import DeleteMenuItemModal from "../modals/menu-item/delete-modal";
import EditCategoryModal from "../modals/category/edit";
import CreateCategoryModal from "../modals/category/create";
import DeleteOrderModal from "../modals/order/delete";
import EditSizeModal from "../modals/size/edit";
import DeleteSizeModal from "../modals/size/delete";



export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Category */}
      <CreateCategoryModal />
      <EditCategoryModal />
      <DeleteCategoryModal />

      {/* Menu Item */}
      <CreateMenuItemModal />
      <DeleteMenuItemModal />

      {/* Order */}
      <DeleteOrderModal />

      {/* Size */}
      <EditSizeModal />
      <DeleteSizeModal />
    </>
  )
}