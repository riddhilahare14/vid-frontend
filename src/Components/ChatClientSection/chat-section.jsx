import { useState, useRef, useEffect } from "react"
import EmojiPicker from "emoji-picker-react"
import { formatDistanceToNow } from "./client-workspace"

export function ChatSection({ job }) {
  const [messages, setMessages] = useState(job.messages || [])
  const [newMessage, setNewMessage] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [fileUploads, setFileUploads] = useState([])
  const [likedMessages, setLikedMessages] = useState([])
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  // Scroll to bottom only when new messages are added
  useEffect(() => {
    if (shouldScrollToBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      setShouldScrollToBottom(false)
    }
  }, [shouldScrollToBottom])

  // Update messages when job changes
  useEffect(() => {
    if (job.messages) {
      setMessages(job.messages)
    }
  }, [job.id, job.messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "" && fileUploads.length === 0) return

    const attachments = fileUploads.map((file) => ({
      id: `file-${Date.now()}-${file.name}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      category: "raw",
      uploadedAt: new Date().toISOString(),
      uploadedBy: "client",
    }))

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: "client",
      senderName: "You",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      content: newMessage,
      timestamp: new Date().toISOString(),
      attachments: attachments,
    }

    setMessages((prev) => [...prev, newMsg])
    setShouldScrollToBottom(true)
    setNewMessage("")
    setFileUploads([])
  }

  const handleFileUpload = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setFileUploads((prev) => [...prev, ...filesArray])
    }
  }

  const removeFile = (index) => {
    setFileUploads((prev) => prev.filter((_, i) => i !== index))
  }

  const handleEmojiClick = (emojiData) => {
    setNewMessage((prev) => prev + emojiData.emoji)
    setShowEmojiPicker(false)
  }

  const toggleLike = (messageId) => {
    setLikedMessages((prev) =>
      prev.includes(messageId) ? prev.filter((id) => id !== messageId) : [...prev, messageId],
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full overflow-hidden mr-3">
            <img
              src={job.freelancer?.profilePicture || "/placeholder.svg?height=32&width=32"}
              alt={job.freelancer?.firstname || "Freelancer"}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              Chat with {job.freelancer ? `${job.freelancer.firstname} ${job.freelancer.lastname}` : 'Freelancer'}
            </h3>
          </div>
        </div>
        <div>
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === "client" ? "justify-end" : "justify-start"}`}
            >
              {message.sender !== "client" && (
                <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={message.senderAvatar || "/placeholder.svg?height=40&width=40"}
                    alt={message.senderName}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className={`max-w-[75%] relative group`}>
                <div
                  className={`rounded-lg p-3 ${
                    message.sender === "client"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{message.senderName}</span>
                    <span className="text-xs opacity-70">{formatDistanceToNow(new Date(message.timestamp))}</span>
                  </div>
                  {message.content && <p className="whitespace-pre-wrap">{message.content}</p>}

                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {message.attachments.map((attachment, index) => {
                        const isImage = attachment.type.startsWith("image/")
                        const isVideo = attachment.type.startsWith("video/")
                        const isAudio = attachment.type.startsWith("audio/")

                        return (
                          <div key={index} className="rounded-md overflow-hidden border dark:border-gray-600">
                            {isImage && (
                              <img
                                src={attachment.url || "/placeholder.svg"}
                                alt={attachment.name}
                                className="max-h-40 w-auto object-contain"
                              />
                            )}
                            {isVideo && <video src={attachment.url} controls className="max-h-40 w-full" />}
                            {isAudio && <audio src={attachment.url} controls className="w-full" />}
                            <div
                              className={`flex items-center justify-between p-2 text-xs ${
                                message.sender === "client" ? "bg-blue-700" : "bg-gray-200 dark:bg-gray-600"
                              }`}
                            >
                              <div className="flex items-center gap-1 truncate">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                  <polyline points="14 2 14 8 20 8" />
                                  <line x1="16" y1="13" x2="8" y2="13" />
                                  <line x1="16" y1="17" x2="8" y2="17" />
                                  <polyline points="10 9 9 9 8 9" />
                                </svg>
                                <span className="truncate">{attachment.name}</span>
                              </div>
                              <a
                                href={attachment.url}
                                download={attachment.name}
                                className="ml-2 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Download
                              </a>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => toggleLike(message.id)}
                  className={`absolute -left-6 top-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                    message.sender === "client" ? "hidden" : "block"
                  } ${likedMessages.includes(message.id) ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={likedMessages.includes(message.id) ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              {message.sender === "client" && (
                <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={message.senderAvatar || "/placeholder.svg?height=40&width=40"}
                    alt={message.senderName}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {fileUploads.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex flex-wrap gap-2">
            {fileUploads.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-md px-2 py-1 text-sm border border-gray-200 dark:border-gray-600"
              >
                <span className="truncate max-w-[150px]">{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative p-4 border-t border-gray-200 dark:border-gray-700">
        {showEmojiPicker && (
          <div className="absolute bottom-16 right-4">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" multiple />
          </button>

          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </button>

          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            className="flex-1 py-2 px-3 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-full focus:outline-none focus:border-blue-500 dark:text-white"
          />

          <button onClick={handleSendMessage} className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
