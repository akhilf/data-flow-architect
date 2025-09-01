import { Message } from "../store/useAppStore";

export default function MessageBubble({ message }: { message: Message }) {
  return (
    <div
      className={`p-3 my-2 max-w-md rounded-2xl ${
        message.author === "user"
          ? "bg-blue-500 text-white self-end"
          : "bg-gray-200 text-gray-900 self-start"
      }`}
      role="listitem"
      aria-label={message.author === "user" ? "User message" : "Bot message"}
      tabIndex={0}
    >
      {message.text}
    </div>
  );
}
