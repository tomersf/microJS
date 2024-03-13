import AxiosController from "@/lib/axios-controller";
import { User } from "@/lib/types";
import { getAllHeaders } from "@/lib/utils";
import { headers } from "next/headers";

export default async function Home() {
  const headersList = headers();
  let currentUser;
  try {
    const data = await AxiosController.ssr.get<User>("/api/users/currentuser", {
      headers: getAllHeaders(headersList),
    });
    currentUser = data.currentUser;
  } catch (error) {
    console.log(error);
  }
  return (
    <main>
      <div>Home</div>
      <h1>{currentUser ? "You are signed in" : "You are not signed in"}</h1>
    </main>
  );
}
