import { ModeToggle } from "@/components/ui/mode-toggle";
import { startNewChat } from "@/features/home/actions/start-new-chat";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {

  const conversationId = await startNewChat();
  redirect(`/c/${conversationId}`);

 
  return (
    <div className="w-full">
      <h1>Root Page</h1>
      {/* <div className="nav-bar flex items-center  gap-5">
        <h1>Welcome to ChaiGPT</h1>
        <ModeToggle />
      </div>
      <UserButton /> */}
    </div>
  );
}
