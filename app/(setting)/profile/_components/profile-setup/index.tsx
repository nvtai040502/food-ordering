import { currentUser } from "@clerk/nextjs";
import FormSetup from "./form-setup";
import { Profile } from "@prisma/client";

const ProfileSetup = async ({profile}: {profile: Profile | null}) => {
  const user = await currentUser()

  const name = profile ? profile.name : `${user?.lastName} ${user?.firstName}`;
  const imageUrl = profile ? profile.imageUrl : user?.imageUrl || "/pizza.png";
  const email = profile ? profile.email : user?.emailAddresses?.[0]?.emailAddress ;


  return ( 
    
        <FormSetup 
          name={name}
          imageUrl={imageUrl}
          email={email}  
          profile={profile}
        />

   );
}
 
export default ProfileSetup;