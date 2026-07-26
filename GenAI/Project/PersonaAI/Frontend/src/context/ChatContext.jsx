import { createContext, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { sendMessage } from "../services/api";

export const ChatContext = createContext(null);

function makeChat() {
  return {
    id: crypto.randomUUID(),
    title: "New chat",
    messages: [],
  };
}

export function ChatProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const activeChat = chats.find((c) => c.id === activeChatId) || null;

  const startNewChat = useCallback(() => {
    const chat = makeChat();
    setChats((prev) => [chat, ...prev]);
    setActiveChatId(chat.id);
    return chat.id;
  }, []);

  const selectChat = useCallback((chatId) => {
    setActiveChatId(chatId);
  }, []);

  const deleteChat = useCallback(
    (chatId) => {
      setChats((prev) => prev.filter((c) => c.id !== chatId));
      if (activeChatId === chatId) setActiveChatId(null);
    },
    [activeChatId]
  );

  const sendUserMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      let chatId = activeChatId;
      let currentMessages = [];

      setChats((prev) => {
        let list = prev;
        if (!chatId) {
          const chat = makeChat();
          chatId = chat.id;
          list = [chat, ...prev];
        }
        return list.map((c) => {
          if (c.id !== chatId) return c;
          currentMessages = c.messages;
          const isFirstMessage = c.messages.length === 0;
          return {
            ...c,
            title: isFirstMessage ? trimmed.slice(0, 40) : c.title,
            messages: [...c.messages, { role: "user", content: trimmed }],
          };
        });
      });

      if (activeChatId !== chatId) setActiveChatId(chatId);

      setIsTyping(true);
      try {
        const reply = await sendMessage(trimmed, currentMessages);
        setChats((prev) =>
          prev.map((c) =>
            c.id === chatId
              ? { ...c, messages: [...c.messages, { role: "ai", content: reply }] }
              : c
          )
        );
      } catch (err) {
        toast.error("Couldn't get a response. Try again.");
      } finally {
        setIsTyping(false);
      }
    },
    [activeChatId]
  );

  const value = {
    chats,
    activeChat,
    activeChatId,
    isTyping,
    startNewChat,
    selectChat,
    deleteChat,
    sendUserMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
