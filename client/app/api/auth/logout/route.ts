import authApiRequest from "@/apiRequest/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const POST = async (request: Request) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value as string;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const res = await request.json();
  const force = res.force as boolean | undefined;

  if (force) {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    return Response.json(
      {
        message: "Logout Successfully!",
      },
      {
        status: 200,
      }
    );
  }

  if (!accessToken && !refreshToken) {
    return new Response("accessToken && refreshToken not exist!", {
      status: 401,
    });
  }

  try {
    const res = await authApiRequest.logoutFromNextServerToServerBackend(
      accessToken
    );

    return Response.json(res?.result, {
      status: 200,
    });
  } catch (error) {
    redirect(`/errors/err=${error}`);
  }
};
