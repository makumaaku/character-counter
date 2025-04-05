'use client'

import { ReactNode, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { HealthToolsCommonMessages } from '@/lib/i18n/types'

type Props = {
  children: ReactNode;
  messages: HealthToolsCommonMessages;
  lang: string;
}

export default function HealthToolsLayout({ children, messages, lang }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  // List of Health tools for the sidebar
  const navigationItems = [
    {
      name: messages.tools.bmiCalculator.title,
      path: `/health-tools/bmi-calculator`
    },
    {
      name: messages.tools.calorieCounter.title,
      path: `/health-tools/calorie-counter`
    },
    {
      name: messages.tools.heartRateZones.title,
      path: `/health-tools/heart-rate-zones`
    },
    {
      name: messages.tools.waterIntakeCalculator.title,
      path: `/health-tools/water-intake-calculator`
    },
    {
      name: messages.tools.sleepCalculator.title,
      path: `/health-tools/sleep-calculator`
    },
    {
      name: messages.tools.stressLevelTest.title,
      path: `/health-tools/stress-level-test`
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-gray-100">
      <Header 
        title={messages.title}
        homeLink={`/${lang}/health-tools`}
      >
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-white"
          aria-label="Open Menu"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </Header>
      
      <div className="flex flex-1">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          navigationItems={navigationItems}
          lang={lang}
        />
        <main className="flex-1 px-4 lg:px-8">
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  )
} 