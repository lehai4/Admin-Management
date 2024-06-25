import envConfig from "@/config";
import { cookies } from "next/headers";

const POST = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value as string;
  const refreshToken = cookieStore.get("refreshToken")?.value as string;

  if (!accessToken && !refreshToken) {
    return new Response("accessToken && refreshToken in cookies not exist!", {
      status: 400,
    });
  }

  try {
    const newToken = await fetch(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/refresh`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: refreshToken }),
      }
    ).then((res) => res.json());
    console.log("newToken", newToken);
    return Response.json(newToken, { status: 200 });
  } catch (e) {
    throw new Error("refreshToken failed");
  }
};

export default POST;
