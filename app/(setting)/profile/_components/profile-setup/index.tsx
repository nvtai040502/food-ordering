import { currentUser } from "@clerk/nextjs";
import FormTextSetup from "./form-text";
import FormImageSetup from "./form-image";
import { Profile } from "@prisma/client";

const ProfileSetup = async ({profile}: {profile: Profile | null}) => {
  const user = await currentUser()

  const name = profile ? profile.name : `${user?.lastName} ${user?.firstName}`;
  const imageUrl = profile ? profile.imageUrl : user?.imageUrl;
  const email = profile ? profile.email : user?.emailAddresses?.[0]?.emailAddress ;


  return ( 
    <div className="grid grid-cols-4 w-full max-w-4xl gap-2">

      <div className="col-span-1 flex justify-center">
        <FormImageSetup imageUrl={imageUrl}/>
      </div>
      
      <div className="col-span-3">
        <FormTextSetup 
          name={name}
          email={email}  
          profile={profile}
        />
      </div>
    </div>
   );
}
 
export default ProfileSetup;