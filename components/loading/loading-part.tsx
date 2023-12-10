import { Loader2 } from "lucide-react";

const LoadingPart = () => {
  return ( 
    <div className="absolute inset-0 flex items-center justify-center opacity-75 bg-background z-10">
      <Loader2 className="animate-spin h-6 w-6" /> 
    </div>
  );
};
 
export default LoadingPart;
