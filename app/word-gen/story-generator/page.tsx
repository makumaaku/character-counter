'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface StoryData {
  characters: string[]
  events: string[]
  endings: string[]
}

export default function Home() {
  const [storyData, setStoryData] = useState<StoryData | null>(null)
  const [story, setStory] = useState('')
  const [showToast, setShowToast] = useState(false)
  const placeholderText = 'Your story will appear here...'

  useEffect(() => {
    fetch('/words/story.json')
      .then(response => response.json())
      .then(data => setStoryData(data))
      .catch(error => console.error('Error loading story data:', error))
  }, [])

  const getRandomIndex = (max: number) => Math.floor(Math.random() * max)

  const generateStory = () => {
    if (!storyData) return

    const charPick = storyData.characters[getRandomIndex(storyData.characters.length)]
    const eventPick = storyData.events[getRandomIndex(storyData.events.length)]
    const endPick = storyData.endings[getRandomIndex(storyData.endings.length)]

    const generatedStory = 
      `${charPick}.\n\n${charPick} ${eventPick}.\n\n${charPick} ${endPick}.`

    setStory(generatedStory)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(story)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    }
  }

  return (
    <div className="bg-gray-800 text-gray-100 font-sans">
      <main className="max-w-4xl mx-auto px-4 pb-24">
        <div className="bg-gray-700 p-6 rounded-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Random Story Generator</h1>
          <p className="text-gray-300 mb-6">Generate unique and creative stories with our free online story generator tool.</p>
          
          <button
            onClick={generateStory}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Generate Story
          </button>
        </div>

        <div className="relative mt-6">
          <div
            className="w-full bg-gray-900 text-gray-100 p-6 rounded-lg min-h-[200px] whitespace-pre-line"
          >
            {story || placeholderText}
          </div>
          {story && (
            <button
              onClick={handleCopy}
              className="absolute bottom-4 right-4 text-white hover:text-gray-300 transition-colors"
              title="Copy text"
            >
              <Image 
                src="/copy_icon_white.png" 
                alt="Copy text"
                width={20}
                height={20}
              />
            </button>
          )}
          {showToast && (
            <div className="absolute right-4 top-full mt-2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
              Copied!
            </div>
          )}
        </div>

        <div className="bg-gray-700 p-6 rounded-lg mt-6">
          <h2 className="text-xl mb-4 text-center">Easy & Simple! High-performance story generator tool (free)</h2>
          <p className="mb-4">Our free and easy-to-use tool instantly generates unique and creative stories!
Perfect for writers, storytellers, and creative minds looking for inspiration.</p>
          
          <h3 className="text-lg mb-2 font-bold">How to use</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>Click Generate
              <p className="ml-5">Click the &quot;Generate Story&quot; button to create a new unique story.</p>
            </li>
            <li>Review your story
              <p className="ml-5">Each story consists of a character, an event, and an ending, creating a complete narrative.</p>
            </li>
            <li>Copy and share
              <p className="ml-5">Use the copy button to save your story and share it with others.</p>
            </li>
          </ul>

          <h3 className="text-lg mb-2 font-bold">Features</h3>
          <ul className="list-disc pl-5">
            <li>Instant story generation</li>
            <li>Unique character combinations</li>
            <li>Creative plot twists</li>
            <li>Memorable endings</li>
            <li>Easy to use interface</li>
            <li>Copy functionality</li>
          </ul>
        </div>
      </main>
    </div>
  )
} 