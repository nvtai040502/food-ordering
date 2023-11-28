"use client";

import DeleteCategoryModal from "@/components/modals/category/delete";
import EditCategoryNameModal from "@/components/modals/category/edit-name";
import { useEffect, useState } from "react";
import CreateMenuItemModal from "../modals/menu-item/create-modal";


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
      <EditCategoryNameModal />
      <DeleteCategoryModal />
      <CreateMenuItemModal />
    </>
  )
}