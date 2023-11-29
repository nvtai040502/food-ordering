"use client";

import DeleteCategoryModal from "@/components/modals/category/delete";
import EditCategoryNameModal from "@/components/modals/category/edit-name";
import { useEffect, useState } from "react";
import CreateMenuItemModal from "../modals/menu-item/create-modal";
import EditMenuItemModal from "../modals/menu-item/edit-modal";
import DeleteMenuItemModal from "../modals/menu-item/delete-modal";


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
      <EditCategoryNameModal />
      <DeleteCategoryModal />

      {/* Menu Item */}
      <CreateMenuItemModal />
      <EditMenuItemModal />
      <DeleteMenuItemModal />
    </>
  )
}