import { useState } from "react";
import { Mic, MicOff, Send, Video, VideoOff } from "lucide-react";

export default function LiveFeedback() {
  const [isLive, setIsLive] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [feedbackItems, setFeedbackItems] = useState([
    { id: 1, timestamp: "0:32", text: "Add transition here", author: "You" },
    { id: 2, timestamp: "1:15", text: "Increase brightness in this scene", author: "You" },
    { id: 3, timestamp: "2:05", text: "The logo should be larger here", author: "Sarah M." },
  ]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
      {!isLive ? (
        <div className="p-8 text-center">
          <div className="h-16 w-16 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-500 flex items-center justify-center mx-auto mb-4">
            <Video size={32} />
          </div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Start Live Feedback Session</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Connect with your editor in real-time to provide instant feedback.
          </p>
          <button
            onClick={() => setIsLive(true)}
            className="py-2 px-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-md font-medium hover:from-orange-600 hover:to-pink-600 transition-all"
          >
            Join Stream
          </button>
        </div>
      ) : (
        <div>
          {/* Video stream */}
          <div className="aspect-video bg-black relative">
            {/* Video placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Video size={48} className="text-gray-500" />
            </div>

            {/* Live indicator */}
            <div className="absolute top-4 left-4 flex items-center">
              <div className="h-2 w-2 rounded-full bg-red-500 mr-1 animate-pulse"></div>
              <span className="text-xs font-medium text-white bg-black bg-opacity-50 px-2 py-0.5 rounded">LIVE</span>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-black bg-opacity-50 rounded-full px-2 py-1">
              <button
                onClick={() => setMicEnabled(!micEnabled)}
                className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  micEnabled ? "bg-gray-700 text-white" : "bg-red-500 text-white"
                }`}
              >
                {micEnabled ? <Mic size={16} /> : <MicOff size={16} />}
              </button>
              <button
                onClick={() => setVideoEnabled(!videoEnabled)}
                className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  videoEnabled ? "bg-gray-700 text-white" : "bg-red-500 text-white"
                }`}
              >
                {videoEnabled ? <Video size={16} /> : <VideoOff size={16} />}
              </button>
              <button
                onClick={() => setIsLive(false)}
                className="h-8 px-3 rounded-full bg-red-500 text-white text-xs font-medium"
              >
                End
              </button>
            </div>
          </div>

          {/* Feedback log */}
          <div className="p-4">
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Feedback Log</h3>

            <div className="h-48 overflow-y-auto mb-4 space-y-2">
              {feedbackItems.map((item) => (
                <div key={item.id} className="flex items-start">
                  <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded px-2 py-1 text-xs font-medium text-gray-800 dark:text-gray-200 mr-2">
                    {item.timestamp}
                  </div>
                  <div>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{item.text}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.author}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type feedback and press Enter..."
                className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-l-md focus:outline-none"
              />
              <button className="py-2 px-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-r-md hover:from-orange-600 hover:to-pink-600 transition-all">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
