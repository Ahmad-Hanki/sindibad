import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignInClient from "../_components/sign-in-client";

const Page = async ({ params }: { params: { locale: string } }) => {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-6 py-5">
      <SignInClient locale={params.locale} />
    </div>
  );
};

export default Page;
