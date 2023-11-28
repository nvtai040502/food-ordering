import Navbar from "@/components/navbar";
import { ModalProvider } from "@/components/providers/modal-provider";
import React from "react";

const LayoutSetting = ({children}: {children: React.ReactNode}) => {
  return ( 
    <div className="flex flex-col gap-8 p-4">
        
        <Navbar />
        <div className="mx-auto max-w-4xl w-full">
          {children}
          <ModalProvider />
        </div>
    </div>
   );
}
 
export default LayoutSetting;