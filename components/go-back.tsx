import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface GoBackProps{
  href: string
  title: string
}
const GoBack = ({
  href,
  title
}: GoBackProps
) => {
  return ( 
    <div>
      <Link href={href}>
        <Button variant="link">
          <ArrowLeft className="h-4 w-4 mr-2"/>
            {title}
        </Button>
      </Link>

    </div>
   );
}
 
export default GoBack;