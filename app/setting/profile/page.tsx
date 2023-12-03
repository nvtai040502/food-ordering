import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import ProfileSetup from "./_components/profile-setup";
import { db } from "@/lib/db";

const ProfilePage = async () => {
  const user = await currentUser();
  if (!user || !user.id) {
    return redirectToSignIn();
  }
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id
    },
  });
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1 className="text-primary text-2xl">
        Profile
      </h1>
      <ProfileSetup profile={profile}/>
    </div>
  );
};

export default ProfilePage;
