import { profileApiRequest } from "@/apiRequest/profile";
import { cookies } from "next/headers";
const PageProfile = async () => {
  const accessToken = cookies().get("accessToken")?.value as string;
  const profile = await profileApiRequest.profile(accessToken);
  return (
    <div>
      <h1 className="text-[30px] font-semibold">Profile</h1>
      <div className="h-[1px] w-full bg-muted"></div>
      <div className="flex flex-col gap-2 py-2">
        <h3>Name: {profile?.result.name}</h3>
        <p>Email: {profile?.result.email}</p>
        <p>Address: {profile?.result.address}</p>
        <p>Role: {profile?.result.role}</p>
      </div>
    </div>
  );
};

export default PageProfile;
