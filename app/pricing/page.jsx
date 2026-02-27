// app/pricing/page.jsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PricingCard } from '@/components/pricing-card'
import { useUser } from '@clerk/nextjs'
import { usePlanAccess } from '@/hooks/use-plan-access'
import { UpgradeModal } from '@/components/upgrade-modal'

export default function PricingPage() {
  const { user } = useUser()
  const { isPro, currentProjectCount } = usePlanAccess()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const plans = [
    {
      id: 'free',
      title: 'Free',
      price: '$0',
      features: [
        '3 Projects max',
        '20 Exports/month',
        'Basic tools only',
        'No AI features'
      ],
      buttonText: 'Current Plan',
      disabled: true
    },
    {
      id: 'pro',
      title: 'Pro',
      price: '$12',
      priceDesc: '/month',
      features: [
        'Unlimited Projects',
        'Unlimited Exports',
        'All AI Tools',
        'Background Removal',
        'AI Extension',
        'Priority Support'
      ],
      buttonText: 'Upgrade to Pro',
      onClick: () => setShowUpgradeModal(true)
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Unlock unlimited AI editing power with Pro. Free plan perfect for testing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} isActive={isPro && plan.id === 'pro'} />
          ))}
        </div>

        <UpgradeModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
        />
      </div>
    </div>
  )
}