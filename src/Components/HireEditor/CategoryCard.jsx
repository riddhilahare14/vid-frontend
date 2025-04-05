import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'



export default function CategoryCard({ title, image, subtypes, color }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-2xl"
      style={{ backgroundColor: color }}
    >
      <div className="relative p-6 h-full">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.2),rgba(255,255,255,0))]"
        />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6">
            <img 
              src={image || "/placeholder.svg"} 
              alt={title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
          
          <div className="space-y-2">
            {subtypes.map((subtype, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center group/item"
              >
                <ArrowRight className="w-4 h-4 text-white/70 mr-2 transform group-hover/item:translate-x-1 transition-transform" />
                <span className="text-white/90 hover:text-white transition-colors">
                  {subtype.name}
                </span>
                {subtype.isNew && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-white/20 rounded-full text-white">
                    NEW
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

