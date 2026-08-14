import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full">
      <div className="nav-bar flex items-center  gap-5">
        <h1>Welcome to ChaiGPT</h1>
        <ModeToggle />
      </div>
      <UserButton />
    </div>
  );
}
