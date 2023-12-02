import Navbar from "@/components/navbar";
import React from "react";

const DashboardLayout = ({
  children
}:{children: React.ReactNode}
) => {
  return ( 
    <div className=" max-w-4xl p-3 mx-auto">
      <div className="flex flex-col gap-8">
        <Navbar />
        {children}
      </div>
    </div>
   );
}
 
export default DashboardLayout;