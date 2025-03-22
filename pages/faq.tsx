import type { GetStaticProps } from "next"
import Link from "next/link"
import { SEO } from "@/components/seo"
import { JsonLd } from "@/lib/json-ld"
import { generateFAQSchema } from "@/lib/json-ld"
import { siteConfig } from "@/lib/seo-config"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "How can I place an order?",
      answer:
        "You can place an order by browsing our website, selecting the items you want, and adding them to your cart. Then proceed to checkout, fill in your shipping and payment details, and confirm your order.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including bKash, Cash on Delivery (COD), and Atlos payment gateway. You can choose your preferred payment method during checkout.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping times vary depending on your location. For Dhaka city, delivery usually takes 1-2 business days. For outside Dhaka, it may take 2-4 business days. International shipping may take 7-14 business days.",
    },
    {
      question: "Do you offer free shipping?",
      answer:
        "Yes, we offer free shipping on orders over ৳2000 within Bangladesh. For orders below this amount, a standard shipping fee applies.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 7 days of delivery if the item is unused, unworn, and in its original packaging. Please refer to our Returns & Refund Policy page for more details.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive a tracking number via email or SMS. You can use this number to track your order on our website under 'Track Your Order' section.",
    },
    {
      question: "What if my order arrives damaged?",
      answer:
        "If your order arrives damaged, please contact our customer service within 24 hours of receiving the package. Include photos of the damaged items and packaging, and we'll arrange a replacement or refund.",
    },
    {
      question: "Do you offer size exchanges?",
      answer:
        "Yes, we offer size exchanges within 7 days of delivery. The item must be unused, unworn, and in its original packaging. Please contact our customer service to initiate an exchange.",
    },
    {
      question: "How can I contact customer service?",
      answer: `You can contact our customer service team via email at ${siteConfig.contactEmail}, by phone at ${siteConfig.phoneNumber}, or through the contact form on our website. Our customer service hours are ${siteConfig.businessHours}.`,
    },
    {
      question: "Are there any discounts or promotions available?",
      answer:
        "Yes, we regularly offer discounts and promotions. Subscribe to our newsletter to stay updated on our latest offers, or follow us on social media for announcements.",
    },
    {
      question: "How do I know if an item is in stock?",
      answer:
        "If an item is available for purchase on our website, it is in stock. If an item is out of stock, it will be marked as 'Out of Stock' and you won't be able to add it to your cart.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "You can cancel your order if it hasn't been shipped yet. Please contact our customer service as soon as possible to request a cancellation. Once an order has been shipped, it cannot be cancelled.",
    },
  ]

  return (
    <>
      <SEO
        title="Frequently Asked Questions"
        description="Find answers to common questions about Classy Clothes products, ordering, shipping, returns, and more."
        ogType="website"
      />
      <JsonLd data={generateFAQSchema(faqs)} />

      <div className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
          <p className="text-gray-600 mb-8 text-center">
            Find answers to the most common questions about our products and services.
          </p>

          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="bg-amber-50 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              If you couldn't find the answer to your question, please feel free to contact our customer service team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-6 rounded-md font-medium transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/"
                className="bg-white hover:bg-gray-100 text-gray-800 py-2 px-6 rounded-md font-medium transition-colors border"
              >
                Return to Homepage
              </Link>
            </div>
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

