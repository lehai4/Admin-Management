import { redirect } from "next/navigation";

export const POST = async (request: Request) => {
  try {
    const res = await request.json();
    const { accessToken, refreshToken } = res;

    if (!accessToken && !refreshToken) {
      return new Response("accessToken && refreshToken not exist!", {
        status: 400,
      });
    }
    return Response.json(
      { message: "Successfully!" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${accessToken}; Path=/; HttpOnly`,
        },
      }
    );
  } catch (error) {
    redirect(`/errors/err=${error}`);
  }
};
