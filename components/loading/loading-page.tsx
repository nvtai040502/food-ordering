import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return ( 
    <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
      <Loader2 className="animate-spin h-20 w-20" /> 
    </div>
  );
};
 
export default LoadingPage;
