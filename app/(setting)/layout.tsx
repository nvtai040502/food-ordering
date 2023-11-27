import Navbar from "@/components/navbar";
import React from "react";

const LayoutSetting = ({children}: {children: React.ReactNode}) => {
  return ( 
    <div className="flex flex-col gap-8 p-4">
        
        <Navbar />
        <div className="mx-auto max-w-4xl w-full">
          {children}
        </div>
    </div>
   );
}
 
export default LayoutSetting;