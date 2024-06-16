import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const cookiesList = cookies();
  try {
    const res = await request.json();
    const { accessToken, refreshToken } = res;

    if (!accessToken && !refreshToken) {
      return new Response("accessToken && refreshToken not exist!", {
        status: 400,
      });
    }

    cookiesList.set({
      name: "accessToken",
      value: accessToken,
      secure: true,
      httpOnly: true,
      path: "/",
    });
    cookiesList.set({
      name: "refreshToken",
      value: refreshToken,
      secure: true,
      httpOnly: true,
      path: "/",
    });
    return NextResponse.json({ accessToken, refreshToken }, { status: 200 });
  } catch (error) {
    redirect(`/errors/err=${error}`);
  }
};
