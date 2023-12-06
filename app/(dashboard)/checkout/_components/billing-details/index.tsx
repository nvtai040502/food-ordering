import { Profile } from "@prisma/client";
import FormDetails from "./form-details";

interface BillingDetailsProps{
  profile: Profile
}
const BillingDetails = ({
  profile
}: BillingDetailsProps
) => {
  return ( 
    <div className=" flex flex-col gap-2">

      <h1 className="">
        Billing Details
      </h1>

      <FormDetails profile={profile}/>
    </div>
   );
}
 
export default BillingDetails;