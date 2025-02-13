import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Character Counter Tool | Company Profile',
  description: 'Learn about the team behind the character counter tool. Discover our mission to provide the best text analysis tools for content creators worldwide.',
  keywords: 'character counter company, text counter about us, word count tool team, company profile, text analysis service',
  openGraph: {
    title: 'About Us - Character Counter Tool | Company Profile',
    description: 'Learn about the team behind the character counter tool. Discover our mission to provide the best text analysis tools for content creators worldwide.',
    url: 'https://boring-tool.com/character-counter/profile',
    type: 'website',
  },
  alternates: {
    canonical: 'https://boring-tool.com/character-counter/profile'
  }
}

export default function ProfilePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Character Counter Tools Inc.",
            "description": "Development and operation of web-based text analysis tools",
            "url": "https://boring-tool.com",
            "foundingDate": "2023",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Shibuya",
              "addressRegion": "Tokyo",
              "addressCountry": "Japan",
              "streetAddress": "1-1-1 Shibuya"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "info@character-counter.com",
              "availableLanguage": ["English", "Japanese"],
              "hoursAvailable": "Mo-Fr 09:00-18:00"
            }
          })
        }}
      />
      <div className="bg-gray-800 text-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-8">About Us</h1>

          <div className="bg-gray-700 rounded-lg p-6 space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-300">
                We strive to provide the most accurate and user-friendly text analysis tools to help content creators, 
                writers, and professionals worldwide optimize their work efficiently.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Company Overview</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  <span className="font-semibold">Company Name:</span> Character Counter Tools Inc.
                </p>
                <p>
                  <span className="font-semibold">Founded:</span> 2023
                </p>
                <p>
                  <span className="font-semibold">Location:</span> Tokyo, Japan
                </p>
                <p>
                  <span className="font-semibold">Business:</span> Development and operation of web-based text analysis tools
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Our Values</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>
                  <span className="font-semibold">Accuracy:</span> Providing precise and reliable text analysis results
                </li>
                <li>
                  <span className="font-semibold">User-Centric:</span> Focusing on intuitive and efficient user experience
                </li>
                <li>
                  <span className="font-semibold">Innovation:</span> Continuously improving our tools with the latest technology
                </li>
                <li>
                  <span className="font-semibold">Accessibility:</span> Making professional tools available to everyone
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Our Services</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Character Counter Tool</li>
                <li>Word Count Analysis</li>
                <li>Text Statistics</li>
                <li>API Integration Services</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  <span className="font-semibold">Address:</span> 1-1-1 Shibuya, Shibuya-ku, Tokyo, Japan
                </p>
                <p>
                  <span className="font-semibold">Email:</span> info@character-counter.com
                </p>
                <p>
                  <span className="font-semibold">Business Hours:</span> Monday - Friday, 9:00 AM - 6:00 PM (JST)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 