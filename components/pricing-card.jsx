// components/pricing-card.jsx
'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Crown } from 'lucide-react'

export function PricingCard({ plan, isActive = false }) {
  return (
    <div className={`group relative bg-slate-900/50 backdrop-blur-xl border-2 p-8 rounded-3xl h-fit transition-all duration-500 hover:scale-105 hover:border-white/50 ${
      isActive ? 'border-blue-500 ring-4 ring-blue-500/20 shadow-2xl shadow-blue-500/10' : 'border-slate-700/50'
    }`}>
      {isActive && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1">
            <Crown className="w-4 h-4 mr-1" />
            Current Plan
          </Badge>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-white mb-2">{plan.title}</h3>
        <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          {plan.price}
          {plan.priceDesc && <span className="text-xl font-normal text-slate-400">/mo</span>}
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-center text-slate-300 group-hover:text-white transition-colors">
            <CheckCircle className="w-5 h-5 mr-3 text-green-400 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        className={`w-full text-lg font-bold h-12 ${
          plan.disabled 
            ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-xl shadow-blue-500/25'
        }`}
        disabled={plan.disabled}
        onClick={plan.onClick}
        variant={plan.disabled ? 'ghost' : 'default'}
      >
        {plan.buttonText}
      </Button>
    </div>
  )
}