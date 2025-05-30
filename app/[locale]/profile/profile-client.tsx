"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/server-actions/auth/get-user";
import { LogOut } from "lucide-react";
import AccountSetting from "./_components/AccountSetting";
import MyOrders from "./_components/MyOrders";
import { useTranslations } from "next-intl";

const ProfileClient = () => {
  // const [open, setOpen] = useState(false);
  const t = useTranslations("profile");
  const [section, setSection] = useState("account");
  const user = useUser({});

  return (
    <div className="border-t-2 border-primary">
      {/* <DialogUserData open={open} setOpen={setOpen} />
      <Button onClick={() => setOpen(true)} className="w-full">
        Open
      </Button> */}

      <section className="flex space-x-12">
        {/* left section */}
        <div className="w-1/3 h-[85vh] bg-gray-100 py-5 px-12">
          {/* User name and logout button */}
          <div>
            <h2 className=" text-black text-xl">{user.data?.name}</h2>
            <Button
              variant="ghost"
              className="w-fit border-none text-red-600 px-0 group"
            >
              <LogOut className="mr-2 text-red-600 w-5 group-hover:text-black transition-colors duration-200" />
              {t("logoutTitle")}
            </Button>
          </div>
          {/* Account settings */}
          <div className="mt-10">
            <h2 className=" text-black text-xl font-semibold">
              {t("headerTitleOne")}
            </h2>
            <Button
              onClick={() => setSection("account")}
              variant={"ghost"}
              className="text-black text-md mt-2 px-0"
            >
              {t("headerTextOne")}
            </Button>
          </div>
          {/* Orders data */}
          <div className="mt-10">
            <h2 className=" text-black text-xl font-semibold">
              {t("headerTitleTwo")}
            </h2>
            <Button
              onClick={() => setSection("orders")}
              variant={"ghost"}
              className="text-black text-md mt-2 px-0"
            >
              {t("headerTextTwo")}
            </Button>
          </div>
        </div>
        {/* Right section */}
        <div className="w-full">
          {section === "account" && <AccountSetting />}
          {section === "orders" && <MyOrders />}
        </div>
      </section>
    </div>
  );
};

export default ProfileClient;
