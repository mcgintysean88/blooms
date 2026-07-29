import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif text-sage-dark mb-8 text-center">Privacy Policy</h1>
            
            <div className="prose prose-lg mx-auto text-body">
              <p className="text-center mb-8 italic">Last Updated: March 23, 2025</p>
              
              <h2 className="text-2xl font-serif text-sage-dark mt-8 mb-4">Introduction</h2>
              <p>
                Welcome to Blooms By Beth ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website bloomsbybethchs.com (the "Site").
              </p>
              <p>
                Please read this Privacy Policy carefully. By accessing or using our Site, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree to this Privacy Policy, please do not access or use our Site.
              </p>
              
              <h2 className="text-2xl font-serif text-sage-dark mt-8 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-serif text-sage-dark mt-6 mb-2">Personal Information</h3>
              <p>
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Register on our Site</li>
                <li>Place an order</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us through our "Contact Us" form</li>
                <li>Participate in contests, surveys, or promotions</li>
              </ul>
              <p>
                This information may include:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Name</li>
                <li>Email address</li>
                <li>Mailing address</li>
                <li>Phone number</li>
                <li>Payment information</li>
                <li>Any other information you choose to provide</li>
              </ul>
              
              <h3 className="text-xl font-serif text-sage-dark mt-6 mb-2">Information Automatically Collected</h3>
              <p>
                When you visit our Site, we may automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Operating system</li>
                <li>Pages visited</li>
                <li>Time and date of your visit</li>
                <li>Time spent on those pages</li>
                <li>Referring website addresses</li>
              </ul>
              <p>
                We collect this information using cookies, web beacons, and other tracking technologies to improve your browsing experience, analyze Site usage, and enhance our service offerings.
              </p>
              
              <h2 className="text-2xl font-serif text-sage-dark mt-8 mb-4">How We Use Your Information</h2>
              <p>
                We may use the information we collect for various purposes, including to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and fulfill your orders</li>
                <li>Send you order confirmations and updates</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Send you technical notices and support messages</li>
                <li>Send you marketing communications about our products, services, and promotions</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Protect against, identify, and prevent fraud and other illegal activity</li>
              </ul>
              
              <h2 className="text-2xl font-serif text-sage-dark mt-8 mb-4">Disclosure of Your Information</h2>
              <p>
                We may share your information with third parties in the following situations:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>With service providers who perform services on our behalf (e.g., payment processing, data analysis, email delivery, hosting services)</li>
                <li>To comply with legal obligations</li>
                <li>To protect and defend our rights and property</li>
                <li>With your consent or at your direction</li>
              </ul>
              
              <h2 className="text-2xl font-serif text-sage-dark mt-8 mb-4">Third-Party Links</h2>
              <p>
                Our Site may contain links to third-party websites that are not affiliated with us. We are not responsible for the privacy practices or content of these third-party sites, and we encourage you to review their privacy policies before providing them with your information.
              </p>
              
              <h2 className="text-2xl font-serif text-sage-dark mt-8 mb-4">Data Security</h2>
              <p>
                We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no data transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
              </p>
              
              <h2 className="text-2xl font-serif text-sage-dark mt-8 mb-4">Your Choices</h2>
              
              <h3 className="text-xl font-serif text-sage-dark mt-6 mb-2">Cookies</h3>
              <p>
                Most web browsers are set to accept cookies by default. You can choose to set your browser to refuse cookies or alert you when cookies are being sent. Please note that some parts of our Site may not function properly if you disable cookies.
              </p>
              
              <h3 className="text-xl font-serif text-sage-dark mt-6 mb-2">Marketing Communications</h3>
              <p>
                You can opt out of receiving marketing emails from us by following the unsubscribe instructions included in each email or by contacting us directly.
              </p>
              
              <h2 className="text-2xl font-serif text-sage-dark mt-8 mb-4">Children's Privacy</h2>
              <p>
                Our Site is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
              
              <h2 className="text-2xl font-serif text-sage-dark mt-8 mb-4">Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The updated version will be indicated by an updated "Last Updated" date, and the updated version will be effective as soon as it is accessible.
              </p>
              
              <h2 className="text-2xl font-serif text-sage-dark mt-8 mb-4">Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <p className="my-4">
                Blooms By Beth<br />
                1130 Greenview Lane<br />
                Mount Pleasant, SC 29464<br />
                plant@bloomsbybethchs.com
              </p>
              
              <h2 className="text-2xl font-serif text-sage-dark mt-8 mb-4">South Carolina-Specific Privacy Information</h2>
              <p>
                Under South Carolina law, residents have certain rights regarding their personal information. While South Carolina does not currently have a comprehensive consumer privacy law like California or Virginia, we respect all applicable laws concerning data collection and use in South Carolina.
              </p>
              
              <h2 className="text-2xl font-serif text-sage-dark mt-8 mb-4">Your Rights Under Federal Law</h2>
              <p>
                Under federal laws such as the CAN-SPAM Act, you have the right to opt out of receiving marketing emails. Additionally, you may have other rights under federal consumer protection laws.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 