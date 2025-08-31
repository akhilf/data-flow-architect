import Chat from "../components/Chat";
import Canvas from "../components/Canvas";

export default function ChatPage() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <Chat />
      <Canvas />
    </div>
  );
}
