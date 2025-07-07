
import { useState } from "react"
import { MessageSquare, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import { ChatSection } from "./chat-section"
import { TimelineSection } from "./timeline-section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

export function ChatTimeline({ job }) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="h-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">Communication</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Chat & Timeline</p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500 transform rotate-90" />
            ) : (
              <ChevronUp className="w-4 h-4 text-gray-500 transform -rotate-90" />
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <Tabs defaultValue="chat" className="flex-1 flex flex-col overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700 px-4 flex-shrink-0">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat" className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Chat</span>
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Timeline</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="chat" className="flex-1 overflow-hidden">
            <ChatSection job={job} />
          </TabsContent>

          <TabsContent value="timeline" className="flex-1 overflow-hidden">
            <TimelineSection job={job} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
