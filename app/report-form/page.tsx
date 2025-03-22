"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, AlertTriangle, Globe, Image as ImageIcon, User, Mail, MessageSquare } from "lucide-react"
import { Metadata } from "next"
import { SiteVerification } from "@/components/site-verification"

export const metadata: Metadata = {
  title: "Report a Scam Website | Classy Clothes",
  description: "Use this form to report fake websites or online scams impersonating Classy Clothes. Help us protect customers from fraud.",
  openGraph: {
    title: "Report a Scam Website | Classy Clothes",
    description: "Use this form to report fake websites or online scams impersonating Classy Clothes. Help us protect customers from fraud.",
    url: "https://classyclothes.coupons/report-form",
    type: "website",
  },
}

export default function ReportFormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    scamUrl: "",
    description: "",
    howDiscovered: "",
    attachments: null,
  })
  
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      attachments: e.target.files
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simple validation
    if (!formData.email || !formData.scamUrl) {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: "Please fill in all required fields."
      })
      return
    }
    
    // This would normally send the data to a server
    // For now, we'll just simulate a successful submission
    setSubmitStatus({
      submitted: true,
      success: true,
      message: "Thank you for your report. Our security team will investigate this matter and take appropriate action."
    })
    
    // Clear the form
    setFormData({
      name: "",
      email: "",
      scamUrl: "",
      description: "",
      howDiscovered: "",
      attachments: null,
    })
  }

  return (
    <div className="container px-4 py-8 max-w-3xl mx-auto">
      <Link href="/emergency-contacts" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Emergency Contacts
      </Link>
      
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
        <div className="flex items-start">
          <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
          <div>
            <h1 className="text-xl font-semibold text-red-800">Report a Scam Website</h1>
            <p className="text-red-700 mt-1">
              Help us protect customers by reporting websites that impersonate Classy Clothes.
            </p>
          </div>
        </div>
      </div>
      
      <SiteVerification />
      
      {submitStatus.submitted && submitStatus.success ? (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="inline-flex items-center justify-center bg-green-100 p-3 rounded-full mb-4">
            <Send className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold mb-3 text-green-800">Report Received</h2>
          <p className="text-green-700">{submitStatus.message}</p>
          <div className="mt-6">
            <Link 
              href="/"
              className="inline-flex items-center py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white border rounded-lg shadow-sm p-6 mt-8">
          <h2 className="text-xl font-semibold mb-6">Report Form</h2>
          
          {submitStatus.submitted && !submitStatus.success && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-3 rounded-md">
              {submitStatus.message}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <User className="h-4 w-4 mr-1 text-gray-400" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Mail className="h-4 w-4 mr-1 text-gray-400" />
                    Your Email <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="scamUrl" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Globe className="h-4 w-4 mr-1 text-gray-400" />
                  Suspicious Website URL <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="url"
                  id="scamUrl"
                  name="scamUrl"
                  value={formData.scamUrl}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://suspicious-website.com"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1 text-gray-400" />
                  Description of the Issue
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please describe what makes you believe this is a fake website. Include any suspicious features you noticed."
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="howDiscovered" className="block text-sm font-medium text-gray-700 mb-1">
                  How did you discover this website?
                </label>
                <select
                  id="howDiscovered"
                  name="howDiscovered"
                  value={formData.howDiscovered}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">-- Select an option --</option>
                  <option value="search">Search engine result</option>
                  <option value="social">Social media ad or post</option>
                  <option value="email">Email or message</option>
                  <option value="friend">Recommended by friend</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="attachments" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <ImageIcon className="h-4 w-4 mr-1 text-gray-400" />
                  Attach Screenshots (optional)
                </label>
                <input
                  type="file"
                  id="attachments"
                  name="attachments"
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  You can attach screenshots of the suspicious website to help our investigation.
                </p>
              </div>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Report
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600">
        <p>
          <strong>Privacy note:</strong> Information submitted through this form will only be used to investigate and address
          the reported website. We take your privacy seriously and will not share your personal information with third parties.
        </p>
      </div>
    </div>
  )
}
