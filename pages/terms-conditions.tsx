import type { GetStaticProps } from "next"
import Link from "next/link"
import { SEO } from "@/components/seo"
import { JsonLd } from "@/lib/json-ld"
import { siteConfig } from "@/lib/seo-config"

export default function TermsConditionsPage() {
  return (
    <>
      <SEO
        title="Terms and Conditions"
        description="Read the terms and conditions for using the Classy Clothes website and services."
        ogType="website"
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Terms and Conditions",
          description: "Read the terms and conditions for using the Classy Clothes website and services.",
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
            "@id": `${siteConfig.url}/terms-conditions`,
          },
        }}
      />

      <div className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <div className="prose max-w-none">
            <p>
              Welcome to Classy Clothes. These terms and conditions outline the rules and regulations for the use of our
              website.
            </p>

            <h2>1. Introduction</h2>
            <p>
              By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use
              Classy Clothes's website if you do not accept all of the terms and conditions stated on this page.
            </p>

            <h2>2. Intellectual Property Rights</h2>
            <p>
              Other than the content you own, under these terms, Classy Clothes and/or its licensors own all the
              intellectual property rights and materials contained in this website.
            </p>
            <p>
              You are granted a limited license only for purposes of viewing the material contained on this website.
            </p>

            <h2>3. Restrictions</h2>
            <p>You are specifically restricted from all of the following:</p>
            <ul>
              <li>publishing any website material in any other media;</li>
              <li>selling, sublicensing, and/or otherwise commercializing any website material;</li>
              <li>publicly performing and/or showing any website material;</li>
              <li>using this website in any way that is or may be damaging to this website;</li>
              <li>using this website in any way that impacts user access to this website;</li>
              <li>
                using this website contrary to applicable laws and regulations, or in any way may cause harm to the
                website, or to any person or business entity;
              </li>
              <li>
                engaging in any data mining, data harvesting, data extracting, or any other similar activity in relation
                to this website;
              </li>
              <li>using this website to engage in any advertising or marketing.</li>
            </ul>

            <h2>4. Your Content</h2>
            <p>
              In these terms and conditions, "Your Content" shall mean any audio, video, text, images, or other material
              you choose to display on this website. By displaying Your Content, you grant Classy Clothes a
              non-exclusive, worldwide, irrevocable, royalty-free, sublicensable license to use, reproduce, adapt,
              publish, translate, and distribute it in any and all media.
            </p>
            <p>
              Your Content must be your own and must not be invading any third-party's rights. Classy Clothes reserves
              the right to remove any of Your Content from this website at any time without notice.
            </p>

            <h2>5. No Warranties</h2>
            <p>
              This website is provided "as is," with all faults, and Classy Clothes express no representations or
              warranties, of any kind related to this website or the materials contained on this website.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              In no event shall Classy Clothes, nor any of its officers, directors, and employees, be held liable for
              anything arising out of or in any way connected with your use of this website.
            </p>

            <h2>7. Indemnification</h2>
            <p>
              You hereby indemnify to the fullest extent Classy Clothes from and against any and/or all liabilities,
              costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any
              of the provisions of these terms.
            </p>

            <h2>8. Severability</h2>
            <p>
              If any provision of these terms is found to be invalid under any applicable law, such provisions shall be
              deleted without affecting the remaining provisions herein.
            </p>

            <h2>9. Variation of Terms</h2>
            <p>
              Classy Clothes is permitted to revise these terms at any time as it sees fit, and by using this website
              you are expected to review these terms on a regular basis.
            </p>

            <h2>10. Assignment</h2>
            <p>
              Classy Clothes is allowed to assign, transfer, and subcontract its rights and/or obligations under these
              terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of
              your rights and/or obligations under these terms.
            </p>

            <h2>11. Entire Agreement</h2>
            <p>
              These terms constitute the entire agreement between Classy Clothes and you in relation to your use of this
              website, and supersede all prior agreements and understandings.
            </p>

            <h2>12. Governing Law & Jurisdiction</h2>
            <p>
              These terms will be governed by and interpreted in accordance with the laws of Bangladesh, and you submit
              to the non-exclusive jurisdiction of the courts located in Bangladesh for the resolution of any disputes.
            </p>

            <h2>13. Contact Information</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us at {siteConfig.contactEmail}
              .
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

