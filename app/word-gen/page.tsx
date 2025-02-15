import Link from 'next/link'
import Script from 'next/script'

// JSON-LD for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Word Generation Tools - Boring Tool",
  "description": "Collection of free word generation tools including name generator, password generator, story generator, and more.",
  "url": "https://boring-tool.com/word-gen",
  "publisher": {
    "@type": "Organization",
    "name": "Boring Tool",
    "url": "https://boring-tool.com"
  }
}

export default function WordGenTools() {
  const tools = [
    {
      title: "Word Generator",
      description: "Generate random words based on various criteria and patterns.",
      path: "/word-gen/word-generator",
      icon: "📝"
    },
    {
      title: "Name Generator",
      description: "Create unique and creative names for characters, businesses, or projects.",
      path: "/word-gen/name-generator",
      icon: "👤"
    },
    {
      title: "Password Generator",
      description: "Generate secure and customizable passwords.",
      path: "/word-gen/password-generator",
      icon: "🔒"
    },
    {
      title: "Story Generator",
      description: "Create random story prompts and plot ideas.",
      path: "/word-gen/story-generator",
      icon: "📚"
    },
    {
      title: "Sentence Generator",
      description: "Generate random sentences with customizable structure.",
      path: "/word-gen/sentence-generator",
      icon: "✍️"
    },
    {
      title: "Word Card Generator",
      description: "Create flashcards and word cards for learning and memorization.",
      path: "/word-gen/word-card-generator",
      icon: "🗂️"
    }
  ]

  return (
    <>
      <Script
        id="word-gen-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-gray-800 text-gray-100 font-sans min-h-screen">
        <main className="max-w-4xl mx-auto px-4 py-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Word Generation Tools</h1>
            <p className="text-xl text-gray-300">
              Free collection of tools for generating words, names, passwords, and more
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.path}
                href={tool.path}
                className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors duration-200"
              >
                <div className="flex items-start space-x-4">
                  <span className="text-4xl">{tool.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold mb-2">{tool.title}</h2>
                    <p className="text-gray-300">{tool.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-gray-700 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">About Our Word Generation Tools</h2>
            <div className="space-y-4">
              <p>
                Our collection of word generation tools is designed to help you create various types of text content quickly and easily. Whether you need random words, unique names, secure passwords, or creative writing prompts, we have the right tool for you.
              </p>
              
              <h3 className="text-xl font-bold mt-6">Features of Our Tools:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Simple and intuitive interfaces</li>
                <li>Customizable generation options</li>
                <li>Instant results</li>
                <li>Free to use</li>
                <li>No registration required</li>
              </ul>

              <h3 className="text-xl font-bold mt-6">Common Use Cases:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Creative writing and storytelling</li>
                <li>Game development and worldbuilding</li>
                <li>Password management and security</li>
                <li>Language learning and education</li>
                <li>Content creation and brainstorming</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  )
} 