import { Button } from "@/components/ui/button";

import { signIn } from "@/lib/auth";
import { Google } from "@/public/icons/google";

const GoogleSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";

        const res = await signIn("google");
        console.log(res);
      }}
    >
      <Button className="w-full flex gap-3" variant="outline">
        <Google />
        Continue with Google
      </Button>
    </form>
  );
};

export { GoogleSignIn };
