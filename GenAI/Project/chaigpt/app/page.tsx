import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="text-center">
      <h1>Welcome to ChaiGPT</h1>
      <ModeToggle/>
    </div>
  );
}
