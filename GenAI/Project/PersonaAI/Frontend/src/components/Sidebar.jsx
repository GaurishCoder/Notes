import { MessageSquarePlus, MessageSquare, Trash2, X } from "lucide-react";
import { useChat } from "../hooks/useChat";

export default function Sidebar({ isOpen, onClose }) {
  const { chats, activeChatId, startNewChat, selectChat, deleteChat } = useChat();

  const handleSelect = (id) => {
    selectChat(id);
    onClose?.();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 sm:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-30 h-full w-64 shrink-0 flex-col border-r border-border bg-sidebar transition-transform sm:static sm:flex sm:translate-x-0 ${
          isOpen ? "flex translate-x-0" : "hidden -translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <span className="text-sm font-semibold text-text-primary">Persona AI</span>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary sm:hidden cursor-pointer"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-3">
          <button
            onClick={() => {
              startNewChat();
              onClose?.();
            }}
            className="flex w-full items-center gap-2 rounded-xl bg-accent px-3 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90 cursor-pointer"
          >
            <MessageSquarePlus size={16} />
            New chat
          </button>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto px-3 pb-4">
          <p className="px-1 pb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
            History
          </p>

          {chats.length === 0 && (
            <p className="px-1 text-sm text-text-muted">No chats yet</p>
          )}

          <ul className="flex flex-col gap-1">
            {chats.map((chat) => (
              <li key={chat.id} className="group relative">
                <button
                  onClick={() => handleSelect(chat.id)}
                  className={`flex w-full items-center gap-2 truncate rounded-lg px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                    chat.id === activeChatId
                      ? "bg-card text-text-primary"
                      : "text-text-secondary hover:bg-card/60 hover:text-text-primary"
                  }`}
                >
                  <MessageSquare size={14} className="shrink-0" />
                  <span className="truncate">{chat.title || "New chat"}</span>
                </button>
                <button
                  onClick={() => deleteChat(chat.id)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-text-muted opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100 cursor-pointer"
                  aria-label="Delete chat"
                >
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
