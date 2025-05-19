import { Button } from "@/components/ui/button";

import { signIn } from "next-auth/react";
import { Google } from "@/public/icons/google";

const GoogleSignIn = () => {
  return (
    <div onClick={() => signIn("google")}>
      <Button className="w-full flex gap-3" variant="outline">
        <Google />
        Continue with Google
      </Button>
    </div>
  );
};

export { GoogleSignIn };
