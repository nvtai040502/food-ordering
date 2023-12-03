import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const BackToMenuPage = () => {
  return ( 
    <div>
      <Link href="/menu">
        <Button variant="link">
          <ArrowLeft className="h-4 w-4 mr-2"/>
          back to menu page
        </Button>
      </Link>

    </div>
   );
}
 
export default BackToMenuPage;