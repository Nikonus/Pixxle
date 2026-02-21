'use client'

import { useEffect, useState } from 'react'

export default function StatsSection() {
  const stats = [
    { value: 10000, label: 'Images Processed', suffix: 'images' },
    { value: 500, label: 'Active Users', suffix: 'users' },
    { value: 99.9, label: 'AI Transformations', suffix: '% success' },
    { value: 4.9, label: 'User Satisfaction', suffix: '/5' }
  ]

  const [animatedStats, setAnimatedStats] = useState(
    stats.map(() => 0)
  )

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          stats.forEach((stat, index) => {
            const increment = stat.value / 100
            let current = 0
            const timer = setInterval(() => {
              current += increment
              if (current >= stat.value) {
                current = stat.value
                clearInterval(timer)
              }
              setAnimatedStats(prev => {
                const newStats = [...prev]
                newStats[index] = current
                return newStats
              })
            }, 20)
          })
          observer.unobserve(entry.target)
        }
      })
    })

    const statsSection = document.querySelector('.stats-section')
    if (statsSection) observer.observe(statsSection)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 stats-section">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:scale-105 transition-all duration-300">
                {Math.floor(animatedStats[index]).toLocaleString()}
                <span className="text-xl font-normal text-slate-400 ml-1">
                  {stat.suffix}
                </span>
              </div>
              <div className="text-sm uppercase tracking-wider text-slate-400 font-medium group-hover:text-slate-300 transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}