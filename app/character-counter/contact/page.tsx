import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Character Counter Tool | Support & Inquiries',
  description: 'Get in touch with our support team for any questions about our character counter tool. We are here to help with your text analysis needs.',
  keywords: 'character counter contact, text counter support, word count help, contact form, customer service',
}

export default function ContactPage() {
  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-8">Contact Us</h1>

        <div className="bg-gray-700 rounded-lg p-6">
          <p className="text-gray-300 mb-8">
            We value your feedback and are here to help with any questions or concerns you may have about our character counter tool.
          </p>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
              <select
                id="subject"
                className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="technical">Technical Support</option>
                <option value="billing">Billing Question</option>
                <option value="feature">Feature Request</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Please describe your question or concern"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
            >
              Send Message
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-600">
            <h2 className="text-xl font-bold mb-4">Other Ways to Reach Us</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                <span className="font-semibold">Email:</span> support@character-counter.com
              </p>
              <p>
                <span className="font-semibold">Business Hours:</span> Monday - Friday, 9:00 AM - 6:00 PM (GMT)
              </p>
              <p>
                We typically respond to all inquiries within 24 business hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 