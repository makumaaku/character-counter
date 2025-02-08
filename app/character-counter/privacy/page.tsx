import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Character Counter Tool | Data Protection',
  description: 'Read our privacy policy to understand how we protect your data when using our character counter tool. Learn about our commitment to user privacy and data security.',
  keywords: 'character counter privacy, text counter security, word count tool privacy policy, data protection, user privacy',
}

export default function PrivacyPage() {
  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-8">Privacy Policy</h1>

        <div className="bg-gray-700 rounded-lg p-6 space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Introduction</h2>
            <p className="text-gray-300">
              This Privacy Policy explains how we collect, use, and protect your personal information when you use our character counter tool. 
              We are committed to ensuring your privacy and protecting any data you share with us.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">1. User-Provided Information</h3>
                <ul className="list-disc pl-6 text-gray-300">
                  <li>Contact information (when you reach out to us)</li>
                  <li>Account information (for premium users)</li>
                  <li>Payment information (handled securely by our payment processor)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">2. Automatically Collected Information</h3>
                <ul className="list-disc pl-6 text-gray-300">
                  <li>Usage statistics</li>
                  <li>Device information</li>
                  <li>IP address</li>
                  <li>Browser type</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-300">
              <li>To provide and improve our services</li>
              <li>To respond to your inquiries</li>
              <li>To process your payments</li>
              <li>To send service updates and notifications</li>
              <li>To analyze and improve our tool&apos;s performance</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Data Security</h2>
            <p className="text-gray-300">
              We implement appropriate security measures to protect your information from unauthorized access, 
              alteration, disclosure, or destruction. Your text data is processed in real-time and is not stored on our servers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Cookies and Tracking</h2>
            <p className="text-gray-300">
              We use cookies to enhance your experience and analyze our traffic. You can control cookie settings through your browser preferences.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Third-Party Services</h2>
            <p className="text-gray-300">
              We may use third-party services for analytics, payment processing, and other functions. 
              These services have their own privacy policies and data handling practices.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Your Rights</h2>
            <ul className="list-disc pl-6 text-gray-300">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at privacy@character-counter.com
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Updates to This Policy</h2>
            <p className="text-gray-300">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
              <br /><br />
              Last updated: December 2023
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 