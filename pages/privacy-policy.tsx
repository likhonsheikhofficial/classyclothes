import type { GetStaticProps } from "next"
import Link from "next/link"
import { SEO } from "@/components/seo"
import { JsonLd } from "@/lib/json-ld"
import { siteConfig } from "@/lib/seo-config"

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Learn about how Classy Clothes collects, uses, and protects your personal information."
        ogType="website"
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy",
          description: "Learn about how Classy Clothes collects, uses, and protects your personal information.",
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: {
              "@type": "ImageObject",
              url: `${siteConfig.url}/images/logo-dark.png`,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/privacy-policy`,
          },
        }}
      />

      <div className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <div className="prose max-w-none">
            <p>
              At Classy Clothes, we are committed to protecting your privacy. This Privacy Policy explains how we
              collect, use, and safeguard your information when you visit our website or make a purchase.
            </p>

            <h2>1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, such as when you:</p>
            <ul>
              <li>Create an account</li>
              <li>Make a purchase</li>
              <li>Sign up for our newsletter</li>
              <li>Contact our customer service</li>
              <li>Participate in surveys or promotions</li>
            </ul>

            <p>The types of information we may collect include:</p>
            <ul>
              <li>Personal information (name, email address, phone number, shipping address)</li>
              <li>Payment information (credit card details, billing address)</li>
              <li>Order history and preferences</li>
              <li>Communications with our customer service team</li>
            </ul>

            <p>We also automatically collect certain information when you visit our website, including:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages you view</li>
              <li>Time and date of your visit</li>
              <li>Referring website</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders, products, and services</li>
              <li>Provide customer support</li>
              <li>Send you marketing communications (if you've opted in)</li>
              <li>Improve our website and services</li>
              <li>Detect and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>We may share your information with third parties in the following circumstances:</p>
            <ul>
              <li>Service providers who help us operate our business (payment processors, shipping companies)</li>
              <li>Professional advisors (lawyers, accountants, insurers)</li>
              <li>Government authorities when required by law</li>
              <li>In connection with a business transfer (merger, acquisition, sale of assets)</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access,
              alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic
              storage is 100% secure, so we cannot guarantee absolute security.
            </p>

            <h2>5. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section.
            </p>

            <h2>6. Cookies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience on our website. You can manage your
              cookie preferences through your browser settings.
            </p>

            <h2>7. Children's Privacy</h2>
            <p>
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal
              information from children under 13.
            </p>

            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2>9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p>
              Email: {siteConfig.contactEmail}
              <br />
              Phone: {siteConfig.phoneNumber}
              <br />
              Address: Mirpur 12, Dhaka, Bangladesh
            </p>
          </div>

          <div className="mt-12 text-center">
            <Link href="/" className="text-amber-600 hover:text-amber-700 font-medium">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}

