export default function AboutUsPage() {
  return (
      <div className="bg-gray-800 text-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-8">About Us</h1>

          <div className="bg-gray-700 rounded-lg p-6 space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-300">
                At Boring Tool, we believe in creating simple yet powerful tools that make everyday tasks easier. 
                Founded in 2023, our mission is to provide free, efficient, and user-friendly online tools that help people work smarter, not harder.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-300">
                We are committed to:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mt-2">
                <li>Creating simple, efficient tools that solve real problems</li>
                <li>Maintaining high standards of privacy and security</li>
                <li>Providing free access to essential features</li>
                <li>Continuously improving based on user feedback</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Character Counter Tool</h2>
              <p className="text-gray-300">
                Our character counter tool exemplifies our commitment to simplicity and efficiency. Built with modern technology, 
                it provides instant, accurate results while maintaining user privacy and data security. Key features include:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mt-2">
                <li>Real-time character counting</li>
                <li>Multi-language support</li>
                <li>Privacy-focused design</li>
                <li>Free access to essential features</li>
                <li>Dark mode support</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Simplicity</h3>
                  <p className="text-gray-300">
                    We believe in creating tools that are intuitive and easy to use, without unnecessary complexity.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Privacy</h3>
                  <p className="text-gray-300">
                    We prioritize user privacy and data security in all our tools and services.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
                  <p className="text-gray-300">
                    Our tools are designed to be accessible to everyone, regardless of technical expertise.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Innovation</h3>
                  <p className="text-gray-300">
                    We continuously improve our tools based on user feedback and technological advancements.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-300">
                We value your feedback and suggestions. Feel free to reach out to us at:
              </p>
              <div className="mt-4">
                <p className="text-gray-300">Email: support@boring-tool.com</p>
                <p className="text-gray-300">Twitter: @boring_tool</p>
                <p className="text-gray-300">GitHub: github.com/boring-inc</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
} 