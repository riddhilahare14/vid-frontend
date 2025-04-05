export default function SkillsSection() {
    const skills = [
      { name: 'Video Production', highlighted: true },
      { name: 'Product Photography', highlighted: true },
      { name: 'Commercial Photography', highlighted: false },
      { name: 'Video Editing', highlighted: true },
      { name: 'Lifestyle Photography', highlighted: false },
      { name: 'Brand Photography', highlighted: true },
      { name: 'Adobe Premiere Pro', highlighted: false },
      { name: 'Final Cut Pro', highlighted: false },
      { name: 'Studio Lighting', highlighted: true },
    ]
  
    return (
      <div className="mb-8">
        <h3 className="mb-4 text-xl font-semibold">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className={`rounded-full px-4 py-1.5 text-sm ${
                skill.highlighted
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    )
  }
  
  