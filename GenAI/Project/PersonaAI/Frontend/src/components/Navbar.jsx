import { Menu, Moon } from "lucide-react";
import { useChat } from "../hooks/useChat";

export default function Navbar({ onMenuClick }) {
  const { activeChat } = useChat();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-bg px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="text-text-secondary hover:text-text-primary sm:hidden cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
        <h2 className="truncate text-sm font-medium text-text-primary">
          {activeChat?.title || "New chat"}
        </h2>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-xs text-text-secondary">
        <Moon size={14} className="text-accent" />
        Dark mode
      </div>
    </header>
  );
}
