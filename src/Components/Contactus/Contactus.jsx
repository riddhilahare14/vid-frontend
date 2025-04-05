"use client"

import { motion } from "framer-motion"
import { ContactForm } from "./contactform"
import { SupportLinks } from "./supportlinks"

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center text-gray-900 sm:text-5xl mb-4">Contact Us</h1>
          <p className="text-xl text-center text-gray-600 mb-12">
            We're here to help. Reach out to us with any questions or concerns.
          </p>
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
            <div className="grid gap-0 md:grid-cols-2">
              <div className="p-8 md:p-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
                <ContactForm />
              </div>
              <div className="p-8 md:p-12 bg-white">
                <SupportLinks />
                <div className="mt-12">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Our Office</h3>
                  <address className="not-italic text-gray-600">
                    123 Video Editor Street
                    <br />
                    Creative City, ST 12345
                    <br />
                    United States
                  </address>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9am - 5pm EST
                    <br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

