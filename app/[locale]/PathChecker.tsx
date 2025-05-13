"use client";

import { usePathname } from "next/navigation";
import NavBar from "./dashboard/_components/NavBar";

export default function PathChecker() {
  const pathname = usePathname();

  const isDashboard = pathname.includes("/dashboard");

  return <div>{isDashboard && <NavBar />}</div>;
}
