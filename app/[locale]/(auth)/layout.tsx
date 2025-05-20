import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  console.log("session", session);
  if (session) redirect("/");

  return <div>{children}</div>;
};

export default layout;
