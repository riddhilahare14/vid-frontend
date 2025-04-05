import { useState, useRef, useEffect } from "react";
import { AlertCircle, Heart, MessageSquare, Paperclip, Send, ThumbsUp, X, Video, CheckCircle, Clock } from "lucide-react";

export default function ChatInterface({ userRole = "client" }) { // Added userRole prop to differentiate views
  const [messages, setMessages] = useState([
    { id: 1, type: "pinned", content: "Project brief: 2-min promo video, cinematic style", time: "10:00 AM", reactions: [] },
    { id: 2, type: "client", content: "Can we make the intro a bit faster?", time: "10:15 AM", reactions: [] },
    { id: 3, type: "editor", content: "Sure, I'll adjust the pacing.", time: "10:30 AM", replyTo: 2, reactions: [] },
    { id: 4, type: "client", content: "Can we use different background music?", time: "10:25 AM", reactions: [{ type: "heart", count: 1 }] },
    { id: 5, type: "editor", content: "I'll include options in the next draft.", time: "10:45 AM", replyTo: 4, reactions: [{ type: "thumbsUp", count: 1 }] },
    { id: 6, type: "client", content: "Colors look washed out—more vibrant?", time: "11:05 AM", reactions: [] },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      type: userRole, // Dynamic based on user
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      reactions: [],
      ...(replyingTo ? { replyTo: replyingTo } : {}),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
    setReplyingTo(null);
  };

  const handleReaction = (messageId, reactionType) => {
    setMessages(
      messages.map((message) => {
        if (message.id === messageId) {
          const reactions = message.reactions || []; // Ensure fallback
          const existingReaction = reactions.find((r) => r.type === reactionType);

          if (existingReaction) {
            return {
              ...message,
              reactions: reactions.filter((r) => r.type !== reactionType),
            };
          } else {
            return {
              ...message,
              reactions: [...reactions, { type: reactionType, count: 1 }],
            };
          }
        }
        return message;
      })
    );
  };

  const getReplyMessage = (replyId) => {
    return messages.find((m) => m.id === replyId);
  };

  // Sample milestones for editor view
  const milestones = [
    { id: 1, title: "Rough Cut", due: "Mar 28", status: "completed" },
    { id: 2, title: "Final Edit", due: "Apr 2", status: "in-progress" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-1/5 p-4 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
          {userRole === "editor" ? "Projects" : "My Editors"}
        </h2>
        <div className="space-y-2">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <p className="text-sm text-indigo-700 dark:text-indigo-300">Promo Video</p>
            <p className="text-xs text-indigo-500 dark:text-indigo-400">60% Complete</p>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="relative group">
              {message.type === "pinned" ? (
                <div className="mx-auto max-w-md p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-900/30 text-center">
                  <AlertCircle size={16} className="inline-block mr-1 text-indigo-500" />
                  <span className="text-sm text-indigo-700 dark:text-indigo-300">{message.content}</span>
                  <span className="block text-xs text-indigo-500 dark:text-indigo-400 mt-1">{message.time}</span>
                </div>
              ) : (
                <div className={`flex ${message.type === "client" ? "justify-end" : ""}`}>
                  {message.type === "editor" && (
                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 flex-shrink-0 mr-2">
                      AM
                    </div>
                  )}
                  <div className="max-w-[75%]">
                    {message.replyTo && (
                      <div className="mb-1 p-1.5 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400 border-l-2 border-indigo-500">
                        <span className="font-medium">Replying to:</span>{" "}
                        {getReplyMessage(message.replyTo)?.content.substring(0, 60)}...
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-lg ${
                        message.type === "client"
                          ? "bg-indigo-500 text-white"
                          : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
                      }`}
                    >
                      <p>{message.content}</p>
                      <div
                        className={`text-xs mt-1 ${message.type === "client" ? "text-indigo-100" : "text-gray-500 dark:text-gray-400"}`}
                      >
                        {message.time}
                      </div>
                    </div>
                    {message.reactions.length > 0 && (
                      <div className="mt-1 flex space-x-1 justify-end">
                        {message.reactions.map((reaction, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-white dark:bg-gray-700 rounded-full px-2 py-0.5 text-xs border border-gray-200 dark:border-gray-600"
                          >
                            {reaction.type === "heart" ? (
                              <Heart size={12} className="text-red-500 mr-1 fill-current" />
                            ) : (
                              <ThumbsUp size={12} className="text-indigo-500 mr-1 fill-current" />
                            )}
                            <span className="text-gray-600 dark:text-gray-300">{reaction.count}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {message.type === "client" && (
                    <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white flex-shrink-0 ml-2">
                      YO
                    </div>
                  )}
                </div>
              )}
              <div
                className={`absolute ${message.type === "client" ? "left-0" : "right-0"} top-0 opacity-0 group-hover:opacity-100 transition-opacity`}
              >
                <div className="flex space-x-1 bg-white dark:bg-gray-800 rounded-full shadow p-1 border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleReaction(message.id, "heart")}
                    className={`p-1 rounded-full ${message.reactions.some((r) => r.type === "heart") ? "bg-red-100 text-red-500" : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"}`}
                  >
                    <Heart size={14} className={message.reactions.some((r) => r.type === "heart") ? "fill-current" : ""} />
                  </button>
                  <button
                    onClick={() => handleReaction(message.id, "thumbsUp")}
                    className={`p-1 rounded-full ${message.reactions.some((r) => r.type === "thumbsUp") ? "bg-indigo-100 text-indigo-500" : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"}`}
                  >
                    <ThumbsUp size={14} className={message.reactions.some((r) => r.type === "thumbsUp") ? "fill-current" : ""} />
                  </button>
                  <button
                    onClick={() => setReplyingTo(message.id)}
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                  >
                    <MessageSquare size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Reply Indicator */}
        {replyingTo && (
          <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center">
              <MessageSquare size={14} className="text-indigo-500 mr-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Replying to: <span className="font-medium">{getReplyMessage(replyingTo)?.content.substring(0, 40)}...</span>
              </span>
            </div>
            <button
              onClick={() => setReplyingTo(null)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <Paperclip size={18} />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 mx-2 py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ""}
              className={`p-2 rounded-full ${newMessage.trim() === "" ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed" : "bg-indigo-500 text-white hover:bg-indigo-600"}`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel: Project Management */}
      <div className="w-3/10 p-4 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
        {userRole === "editor" ? (
          <>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Milestones</h2>
            <div className="space-y-2">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{milestone.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{milestone.due}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      milestone.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {milestone.status}
                  </span>
                </div>
              ))}
              <button className="mt-2 w-full p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
                Add Task
              </button>
            </div>
            <div className="mt-4">
              <button className="w-full p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 flex items-center justify-center">
                <Video size={18} className="mr-2" /> Start Stream
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Progress</h2>
            <div className="space-y-2">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{milestone.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{milestone.due}</p>
                  </div>
                  {milestone.status === "completed" ? (
                    <CheckCircle size={18} className="text-green-500" />
                  ) : (
                    <Clock size={18} className="text-yellow-500" />
                  )}
                </div>
              ))}
              <button className="mt-2 w-full p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                Request Revision
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}