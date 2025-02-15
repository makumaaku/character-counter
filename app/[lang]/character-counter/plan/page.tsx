export default function PlanPage() {
  return (
    <>
      <div className="bg-gray-800 text-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-8">Plans</h1>

          <div className="bg-gray-700 rounded-lg p-6 mb-8">
            <p className="text-gray-300 mb-8">
              You can use all basic features of our character counter app with free registration. 
              For advanced features, consider upgrading to our premium version.
            </p>

            <h2 className="text-xl font-bold mb-4">Pricing</h2>
            <div className="space-y-2 mb-8">
              <p className="text-gray-300">Free Version: $0</p>
              <p className="text-gray-300">Monthly Plan: $4.80</p>
              <p className="text-gray-300">Annual Plan: $39.80 (31% OFF compared to monthly plan!)</p>
            </div>

            <h2 className="text-xl font-bold mb-4">Free vs Premium Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full mb-8">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-2">Feature</th>
                    <th className="text-center py-2">Free</th>
                    <th className="text-center py-2">Premium</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-600">
                    <td className="py-2">Character Count</td>
                    <td className="text-center">◯</td>
                    <td className="text-center">◯</td>
                  </tr>
                  <tr className="border-b border-gray-600">
                    <td className="py-2">Line, Word & Byte Count</td>
                    <td className="text-center">◯</td>
                    <td className="text-center">◯</td>
                  </tr>
                  <tr className="border-b border-gray-600">
                    <td className="py-2">String Search</td>
                    <td className="text-center">◯</td>
                    <td className="text-center">◯</td>
                  </tr>
                  <tr className="border-b border-gray-600">
                    <td className="py-2">Dark Mode</td>
                    <td className="text-center">◯</td>
                    <td className="text-center">◯</td>
                  </tr>
                  <tr className="border-b border-gray-600">
                    <td className="py-2">Advertisements</td>
                    <td className="text-center">Yes</td>
                    <td className="text-center">No</td>
                  </tr>
                  <tr className="border-b border-gray-600">
                    <td className="py-2">Word & PDF Export</td>
                    <td className="text-center">✕</td>
                    <td className="text-center">◯</td>
                  </tr>
                  <tr className="border-b border-gray-600">
                    <td className="py-2">API Integration</td>
                    <td className="text-center">✕</td>
                    <td className="text-center">◯</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-xl font-bold mb-6">Premium Features</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Basic Features</h3>
                <p className="text-gray-300">All basic features available in the free version are of course available in the premium version:</p>
                <ul className="list-disc pl-6 mt-2 text-gray-300">
                  <li>Real-time counting of characters, lines, words, and bytes</li>
                  <li>String search functionality</li>
                  <li>Dark mode toggle</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Ad-Free Experience</h3>
                <p className="text-gray-300">Advertisements are removed, providing a more comfortable user experience.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Word & PDF Export</h3>
                <p className="text-gray-300">Export counting results and input text together to Word or PDF files.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">API Integration</h3>
                <p className="text-gray-300">All features of our service are available via API. Please contact us through the inquiry form for API usage.</p>
              </div>
            </div>

            <h2 className="text-xl font-bold mt-8 mb-6">Monthly and Annual Plans</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Monthly Plan</h3>
                <p className="text-gray-300">Pay monthly with no long-term commitment. Perfect for trying out premium features.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Annual Plan</h3>
                <p className="text-gray-300">More economical pricing structure, recommended for long-term usage.</p>
              </div>

              <p className="text-gray-300 mt-4">
                For detailed pricing and plan information, please check our dedicated pricing page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 