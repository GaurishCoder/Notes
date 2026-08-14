import { onBoard } from "@/features/auth/action/onboard";
import { auth } from "@clerk/nextjs/server";
import React from "react";

async function RootGroupLayout({ children }: { children: React.ReactNode }) {
  await auth.protect();
  await onBoard();
  return <div>{children}</div>;
}

export default RootGroupLayout;
