import type { GetStaticProps } from "next"
import Link from "next/link"
import { SEO } from "@/components/seo"
import { JsonLd } from "@/lib/json-ld"
import { siteConfig } from "@/lib/seo-config"

export default function RefundReturnsPage() {
  return (
    <>
      <SEO
        title="Refund and Returns Policy"
        description="Learn about Classy Clothes' refund and returns policy for your purchases."
        ogType="website"
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Refund and Returns Policy",
          description: "Learn about Classy Clothes' refund and returns policy for your purchases.",
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
            "@id": `${siteConfig.url}/refund-returns`,
          },
        }}
      />

      <div className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Refund and Returns Policy</h1>
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <div className="prose max-w-none">
            <p>
              Thank you for shopping at Classy Clothes. We want to ensure your shopping experience is as pleasant as
              possible. This Refund and Returns Policy outlines our guidelines for returns, exchanges, and refunds.
            </p>

            <h2>1. Returns</h2>
            <p>
              We accept returns of unused, unworn items in their original packaging within 7 days of delivery. To be
              eligible for a return, your item must be in the same condition that you received it, unworn or unused,
              with tags, and in its original packaging.
            </p>

            <h3>Non-Returnable Items</h3>
            <p>The following items cannot be returned:</p>
            <ul>
              <li>Items that have been worn, washed, or altered</li>
              <li>Custom or personalized orders</li>
              <li>Intimate or sanitary goods</li>
              <li>Sale items (unless defective)</li>
            </ul>

            <h3>Return Process</h3>
            <p>To initiate a return, please follow these steps:</p>
            <ol>
              <li>Contact our customer service at {siteConfig.contactEmail} within 7 days of receiving your order</li>
              <li>Provide your order number and details of the item(s) you wish to return</li>
              <li>
                Our customer service team will guide you through the return process and provide a return authorization
              </li>
              <li>Package the item(s) securely with all original packaging and tags</li>
              <li>Ship the item(s) to the address provided by our customer service team</li>
            </ol>

            <h2>2. Exchanges</h2>
            <p>
              If you need to exchange an item for a different size or color, please follow the same process as for
              returns. Once we receive the returned item, we will process your exchange and ship the new item to you.
            </p>
            <p>
              Please note that exchanges are subject to availability. If the requested exchange item is not available,
              we will issue a refund for the returned item.
            </p>

            <h2>3. Refunds</h2>
            <p>
              Once we receive and inspect your return, we will notify you of the status of your refund. If your return
              is approved, we will initiate a refund to your original method of payment. The time it takes for the
              refund to appear in your account depends on your payment provider's processing times.
            </p>

            <h3>Refund Processing Times</h3>
            <ul>
              <li>bKash: 3-5 business days</li>
              <li>Credit/Debit Cards: 5-10 business days</li>
              <li>Cash on Delivery: 7-14 business days (via bank transfer)</li>
            </ul>

            <h2>4. Damaged or Defective Items</h2>
            <p>
              If you receive a damaged or defective item, please contact our customer service within 24 hours of
              receiving the package. Include photos of the damaged items and packaging, and we'll arrange a replacement
              or refund.
            </p>
            <p>
              For damaged or defective items, we will cover the return shipping costs and expedite the replacement or
              refund process.
            </p>

            <h2>5. Late or Missing Refunds</h2>
            <p>
              If you haven't received your refund within the timeframes mentioned above, please check your bank account
              again. Then contact your credit card company or bank, as it may take some time for the refund to be
              officially posted. If you've done all of this and still have not received your refund, please contact our
              customer service.
            </p>

            <h2>6. Shipping Costs</h2>
            <p>
              Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted
              from your refund unless the return is due to our error (you received an incorrect or defective item).
            </p>

            <h2>7. Sale Items</h2>
            <p>Only regular-priced items may be refunded. Sale items cannot be refunded unless they are defective.</p>

            <h2>8. Contact Us</h2>
            <p>If you have any questions about our Refund and Returns Policy, please contact us:</p>
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

