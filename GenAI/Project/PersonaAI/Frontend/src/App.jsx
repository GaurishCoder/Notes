import { Toaster } from "react-hot-toast";
import { ChatProvider } from "./context/ChatContext";
import Home from "./pages/Home";

function App() {
  return (
    <ChatProvider>
      <Home />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#e5e7eb",
            border: "1px solid #1f2a3d",
            fontSize: "0.875rem",
          },
        }}
      />
    </ChatProvider>
  );
}

export default App;
