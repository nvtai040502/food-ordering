"use client";

import DeleteCategoryModal from "@/app/(setting)/category/_component/modal/delete";
import EditCategoryNameModal from "@/app/(setting)/category/_component/modal/edit-name";
import { useEffect, useState } from "react";


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
    </>
  )
}