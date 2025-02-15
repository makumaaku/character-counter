export default function PrivacyPage() {
  return (
    <>
      <div className="bg-gray-800 text-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-8">Privacy Policy</h1>

          <div className="bg-gray-700 rounded-lg p-6 space-y-8">
            <div>
              <p className="text-gray-300">
                This Privacy Policy describes how Boring, inc. (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and shares information when you use our online Character Counter (the &quot;Service&quot;). By accessing or using the Service, you agree to the terms of this Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">1. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">1.1 User-Provided Text</h3>
                  <p className="text-gray-300">
                    When you paste or type text into the Character Counter, we do not store or permanently record any of the text you provide. The text is processed temporarily by our servers (or within your browser, depending on implementation) to count its characters and then immediately discarded.
                    <br /><br />
                    We do not use the text you submit for any other purpose.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">1.2 Log Data</h3>
                  <p className="text-gray-300">
                    Like most online services, we may automatically collect certain information when you access our Service, such as:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 mt-2">
                    <li>IP address</li>
                    <li>Browser type and version</li>
                    <li>Pages viewed, and the time and date of your visit</li>
                  </ul>
                  <p className="text-gray-300 mt-2">
                    This information (&quot;Log Data&quot;) helps us maintain and improve the Service and troubleshoot any issues.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">1.3 Cookies and Similar Technologies</h3>
                  <p className="text-gray-300">
                    We may use cookies or similar tracking technologies to enhance your user experience or to analyze site traffic.
                    <br /><br />
                    Cookies do not provide us with personally identifiable information. You can choose to disable cookies through your browser settings; however, certain features of the Service may not function properly without them.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-300">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-gray-300 mt-2">
                <li>Provide and Maintain the Service – for example, to count characters and ensure smooth functionality.</li>
                <li>Improve and Customize – to understand usage patterns and improve our site&apos;s interface or features.</li>
                <li>Analytics – to track performance and usage trends of our Service.</li>
              </ul>
              <p className="text-gray-300 mt-2">
                We do not sell, rent, or lease any of your data (including text) to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">3. How We Share Your Information</h2>
              <p className="text-gray-300">
                We do not share your text input with any third parties. However, we may share Log Data with:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mt-2">
                <li>Service Providers: Trusted third parties that assist us in website hosting, analytics, or security.</li>
                <li>Legal or Compliance Reasons: If required by law, court order, or to protect our rights and property.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">4. Data Retention</h2>
              <p className="text-gray-300">
                We do not retain the text you enter in the Character Counter.
                <br /><br />
                Log Data may be stored on secure servers or cloud services for as long as necessary to fulfill the purposes outlined in this policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">5. Children&apos;s Privacy</h2>
              <p className="text-gray-300">
                Our Character Counter is not specifically directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us so we can delete it.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">6. Security Measures</h2>
              <p className="text-gray-300">
                We take reasonable measures to protect any information we collect from unauthorized access, alteration, or destruction. However, no method of data transmission or storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">7. Changes to This Privacy Policy</h2>
              <p className="text-gray-300">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Effective Date.&quot; Your continued use of the Service after any modifications constitute acceptance of the revised policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">8. Contact Us</h2>
              <p className="text-gray-300">
                If you have any questions or concerns about this Privacy Policy or our practices, please contact us at:
                <br /><br />
                Email: support@boring-tool.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 