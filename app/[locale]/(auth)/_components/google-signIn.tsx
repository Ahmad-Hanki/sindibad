import { Button } from "@/components/ui/button";

import { Google } from "@/public/icons/google";
import { useSignInWithGoogle } from "../_api/sign-in-with-google";
import { Loader2 } from "lucide-react";
import { useRouter } from "@bprogress/next";

const GoogleSignIn = () => {
  const router = useRouter();
  const { mutate, isPending } = useSignInWithGoogle({
    mutationConfig: {
      onSuccess: async () => {
        router.replace("/");
      },
      onError: (error) => {
        console.error("Google sign-in error:", error);
      },
    },
  });
  return (
    <div
      onClick={async () => {
        mutate(undefined);
      }}
    >
      <Button className="w-full flex gap-3" variant="outline" type="button">
        <Google />
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Continue with Google"
        )}
      </Button>
    </div>
  );
};

export { GoogleSignIn };
