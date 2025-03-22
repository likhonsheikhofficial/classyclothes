import { NextApiRequest, NextApiResponse } from 'next'
import { scanForScamSites } from '@/lib/scam-scanner'
import { generateSitemap } from '@/lib/sitemap-generator'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for API key to secure this endpoint
  const apiKey = req.headers['x-api-key'] || req.query.apiKey
  
  if (!apiKey || apiKey !== process.env.SCAN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  
  try {
    // Scan for scam sites
    const scamSites = await scanForScamSites()
    
    // Generate sitemap
    await generateSitemap()
    
    return res.status(200).json({
      success: true,
      message: 'Scam sites scanned and sitemap generated successfully',
      scamSites,
    })
  } catch (error) {
    console.error('Error scanning scam sites:', error)
    return res.status(500).json({
      success: false,
      message: 'Error scanning scam sites',
      error: (error as Error).message,
    })
  }
}

