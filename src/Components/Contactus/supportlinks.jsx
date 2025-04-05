"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MessageCircle } from "lucide-react"

export function SupportLinks() {
  const links = [
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: Mail, text: "support@videoeditor.com", href: "mailto:support@videoeditor.com" },
    { icon: MessageCircle, text: "Live Chat", href: "#" },
  ]

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Quick Support</h2>
      <ul className="space-y-4">
        {links.map((link, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <a
              href={link.href}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              <link.icon className="w-5 h-5 mr-3" />
              <span>{link.text}</span>
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

