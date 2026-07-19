import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { useChat } from "../hooks/useChat";
import Loader from "./Loader";

export default function MessageInput({ value, onValueChange }) {
  const { sendUserMessage, isTyping } = useChat();
  const [internalValue, setInternalValue] = useState("");
  const textareaRef = useRef(null);

  const text = value !== undefined ? value : internalValue;
  const setText = onValueChange || setInternalValue;

  const handleSend = async () => {
    if (!text.trim() || isTyping) return;
    const toSend = text;
    setText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    await sendUserMessage(toSend);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const autoGrow = (e) => {
    setText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
  };

  return (
    <div className="border-t border-border bg-bg px-4 py-4 sm:px-8">
      <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-border bg-card px-3 py-2">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={autoGrow}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Message Hanji Batao..."
          className="max-h-40 flex-1 resize-none bg-transparent px-4 rounded-lg py-2 text-sm text-primary placeholder:text-text-muted "
        />
        <button
          onClick={handleSend}
          disabled={!text.trim() || isTyping}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-bg transition-opacity disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-accent-hover"
          aria-label="Send message"
        >
          {isTyping ? <Loader size={16} /> : <Send size={16} />}
        </button>
      </div>
      <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-text-muted">
        Hanji Batao can make mistakes. Verify important information.
      </p>
    </div>
  );
}
