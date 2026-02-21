'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Main Headline */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent mb-6 leading-tight">
            AI Photo Editor
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-12">
            Transform your images with one-click AI magic. 
            <span className="font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Remove backgrounds
            </span>
            , adjust, crop, and design like a pro.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            size="xl" 
            className="group text-xl px-10 py-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 font-semibold"
          >
            <Sparkles className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
            Start Editing Free
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="xl" 
            className="text-xl px-10 py-8 border-2 border-slate-700/50 hover:border-slate-600/80 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-900/80 text-slate-200 font-semibold"
            asChild
          >
            <Link href="/pricing">
              View Pricing
            </Link>
          </Button>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-8">
          <div className="text-left group">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
              <Sparkles className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">AI Background</h3>
            <p className="text-slate-400">Remove backgrounds instantly</p>
          </div>
          
          <div className="text-left group">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
              <div className="w-8 h-8 border-2 border-emerald-400 rounded-full flex items-center justify-center">
                <span className="w-3 h-3 bg-emerald-400 rounded-full" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Adjust Filters</h3>
            <p className="text-slate-400">Brightness, contrast, saturation</p>
          </div>
          
          <div className="text-left group">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Smart Crop</h3>
            <p className="text-slate-400">Perfect aspect ratios</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-20 pt-12 border-t border-slate-800/50">
          <div className="text-center">
            <div className="text-4xl font-black text-white">10K+</div>
            <div className="text-slate-400">Images Edited</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-white">500+</div>
            <div className="text-slate-400">Happy Creators</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-white">99.9%</div>
            <div className="text-slate-400">Uptime</div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
    </section>
  )
}