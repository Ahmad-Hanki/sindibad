"use client";
import { useState } from "react";
import AddressDialog from "./Dialog";
import { useTranslations } from "next-intl";
import { useUser } from "@/server-actions/auth/get-user";
import { Button } from "@/components/ui/button";

function AddressSection() {
  const t = useTranslations("rightSideCartSection");
  const [open, setOpen] = useState(false);
  const { data: userData } = useUser({});
  return (
    <section className="p-8 bg-gray-100 border border-gray-100">
      <h2 className="text-lg font-semibold">{t("headerTitle")}</h2>
      {!userData?.address && (
        <p className="text-red-600 my-4">{t("headerText")}</p>
      )}
      <h3 className=" my-4">{userData?.address}</h3>
      <Button variant={"default"} onClick={() => setOpen(true)}>
        {t("buttonText")}
      </Button>
      {open && <AddressDialog open={open} setOpen={setOpen} />}
    </section>
  );
}

export default AddressSection;
