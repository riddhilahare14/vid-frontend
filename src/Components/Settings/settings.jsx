import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronRight, X } from "lucide-react"

import { ProfileSettings } from './profile.settings'
import { AccountSettings } from './account-settings'
import { NotificationSettings } from './notification-settings'
import { PaymentSettings } from './payment.settings'
import { GigSettings } from "./gig-settings"
import { VideoSettings } from "./video-settings"
import { AppearanceSettings } from "./appearance-settings"
import { PrivacySettings } from "./privacy-settings"

export function Settings() {
  const [activeTab, setActiveTab] = useState("profile")
  const [saved, setSaved] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setShowModal(true)
    setTimeout(() => {
      setSaved(false)
      setTimeout(() => {
        setShowModal(false)
      }, 500)
    }, 2000)
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Manage your account settings and preferences</p>
        </div>
        <div className="relative">
          <button
            onClick={handleSave}
            className="relative rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-2 text-white shadow-md transition-all hover:shadow-lg active:scale-95"
          >
            {saved ? (
              <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center">
                <Check className="mr-2 h-4 w-4" /> Saved
              </motion.span>
            ) : (
              "Save Changes"
            )}
          </button>
          {saved && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white"
            >
              <Check className="h-3 w-3" />
            </motion.div>
          )}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        <div className="hidden md:block">
          <div className="sticky top-10 space-y-1 rounded-xl bg-white p-4 shadow-lg dark:bg-slate-900">
            {[
              { id: "profile", label: "Profile" },
              { id: "account", label: "Account & Security" },
              { id: "notifications", label: "Notifications" },
              { id: "payment", label: "Payment" },
              { id: "gigs", label: "Gig Preferences" },
              { id: "video", label: "Video Tools" },
              { id: "appearance", label: "Appearance" },
              { id: "privacy", label: "Privacy & Data" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  activeTab === item.id
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 dark:from-blue-900/20 dark:to-indigo-900/20 dark:text-blue-400"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
                )}
              >
                {item.label}
                {activeTab === item.id && <ChevronRight className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 grid grid-cols-4 gap-2 overflow-x-auto rounded-xl bg-white p-1 shadow-md dark:bg-slate-900 md:hidden">
            {[
              { id: "profile", label: "Profile" },
              { id: "account", label: "Account" },
              { id: "notifications", label: "Notifications" },
              { id: "payment", label: "Payment" },
              { id: "gigs", label: "Gigs" },
              { id: "video", label: "Video" },
              { id: "appearance", label: "Appearance" },
              { id: "privacy", label: "Privacy" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition-all",
                  activeTab === item.id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <div className={cn("space-y-6", activeTab === "profile" ? "block" : "hidden")}>
              <ProfileSettings />
            </div>
            <div className={cn("space-y-6", activeTab === "account" ? "block" : "hidden")}>
              <AccountSettings />
            </div>
            <div className={cn("space-y-6", activeTab === "notifications" ? "block" : "hidden")}>
              <NotificationSettings />
            </div>
            <div className={cn("space-y-6", activeTab === "payment" ? "block" : "hidden")}>
              <PaymentSettings />
            </div>
            <div className={cn("space-y-6", activeTab === "gigs" ? "block" : "hidden")}>
              <GigSettings />
            </div>
            <div className={cn("space-y-6", activeTab === "video" ? "block" : "hidden")}>
              <VideoSettings />
            </div>
            <div className={cn("space-y-6", activeTab === "appearance" ? "block" : "hidden")}>
              <AppearanceSettings />
            </div>
            <div className={cn("space-y-6", activeTab === "privacy" ? "block" : "hidden")}>
              <PrivacySettings />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative mx-4 max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Settings Saved!</h3>
                <p className="mb-6 text-gray-500 dark:text-gray-400">Your changes have been successfully saved.</p>
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-white shadow-md transition-all hover:shadow-lg active:scale-95"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

