import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import Welcome from "./Welcome";
import { useChat } from "../hooks/useChat";

export default function ChatWindow({ onPickPrompt }) {
  const { activeChat, isTyping } = useChat();
  const bottomRef = useRef(null);
  const messages = activeChat?.messages || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isTyping]);

  if (messages.length === 0 && !isTyping) {
    return <Welcome onPick={onPickPrompt} />;
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} role={msg.role} content={msg.content} />
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="h-8 w-8 shrink-0" />
            <TypingIndicator />
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
