import NavBar from "@/components/navbar";
import React from "react";

const LayoutSetting = ({children}: {children: React.ReactNode}) => {
  return ( 
    <div className="p-8">
        
        <NavBar mode="setting" />
        <div className="mt-20">
          {children}
          
        </div>
    </div>
   );
}
 
export default LayoutSetting;