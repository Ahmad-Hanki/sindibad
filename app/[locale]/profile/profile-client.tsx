"use client";

import { useState } from "react";
import DialogUserData from "./_components/dialog";
import { Button } from "@/components/ui/button";

const ProfileClient = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <DialogUserData open={open} setOpen={setOpen} />

      <Button onClick={() => setOpen(true)} className="w-full">
        Open
      </Button>
    </div>
  );
};

export default ProfileClient;
