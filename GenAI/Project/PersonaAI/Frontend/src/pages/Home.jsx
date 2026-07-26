import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import { useChat } from "../hooks/useChat";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const { sendUserMessage } = useChat();

  const handlePickPrompt = async (prompt) => {
    await sendUserMessage(prompt);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg text-text-primary">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <ChatWindow onPickPrompt={handlePickPrompt} />
        <MessageInput value={draft} onValueChange={setDraft} />
      </div>
    </div>
  );
}
