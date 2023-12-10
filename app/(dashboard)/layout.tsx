import NavBar from "@/components/navbar";
import React from "react";

const DashboardLayout = ({
  children
}:{children: React.ReactNode}
) => {
  return ( 
    <div className="p-8">
      <NavBar mode="shopping" />
      <div className="mt-20">
        
        {children}
      </div>
    </div>
   );
}
 
export default DashboardLayout;