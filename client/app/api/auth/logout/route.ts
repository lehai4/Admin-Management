import { cookies } from "next/headers";
import envConfig from "@/config";
export const POST = async (request: Request) => {
  const cookieStore = cookies();
  const { accessToken, refreshToken } = await request.json();

  if (!accessToken && !refreshToken) {
    return new Response("accessToken && refreshToken not exist!", {
      status: 401,
    });
  }

  try {
    await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refreshToken }),
    }).then((data) => data);

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return Response.json({ status: 200, message: "Logout Successfully!" });
  } catch (error) {
    throw new Error("Logout Failed");
  }
};
