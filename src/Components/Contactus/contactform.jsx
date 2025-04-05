
import { useState } from "react"
import { motion } from "framer-motion"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full bg-transparent border-b-2 border-white/50 focus:border-white px-0 py-2 placeholder-white/70 text-white focus:outline-none transition-all duration-300 rounded-lg px-4"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full bg-transparent border-b-2 border-white/50 focus:border-white px-0 py-2 placeholder-white/70 text-white focus:outline-none transition-all duration-300 rounded-lg px-4"
          required
        />
      </div>
      <div>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows={4}
          className="w-full bg-transparent border-b-2 border-white/50 focus:border-white px-0 py-2 placeholder-white/70 text-white focus:outline-none transition-all duration-300 resize-none rounded-lg px-4"
          required
        ></textarea>
      </div>
      <motion.button
        
        type="submit"
        className="w-full bg-white text-blue-600 font-semibold py-3 px-6 rounded-full hover:bg-blue-50 transition-colors duration-300"
      >
        Send Message
      </motion.button>
    </form>
  )
}

