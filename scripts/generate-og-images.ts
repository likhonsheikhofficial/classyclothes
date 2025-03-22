import fs from 'fs'
import path from 'path'
import { createCanvas, loadImage, registerFont } from 'canvas'
import { siteConfig } from '../lib/seo-config'

async function generateOGImage() {
  // Create directory if it doesn't exist
  const imagesDir = path.join(process.cwd(), 'public', 'images')
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true })
  }
  
  // Register fonts
  registerFont(path.join(process.cwd(), 'public', 'fonts', 'Inter-Bold.ttf'), { family: 'Inter', weight: 'bold' })
  registerFont(path.join(process.cwd(), 'public', 'fonts', 'Inter-Regular.ttf'), { family: 'Inter', weight: 'normal' })
  
  // Create canvas
  const width = 1200
  const height = 630
  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')
  
  // Load background image
  const backgroundImage = await loadImage(path.join(process.cwd(), 'public', 'images', 'og-background.jpg'))
  
  // Draw background
  context.drawImage(backgroundImage, 0, 0, width, height)
  
  // Add overlay gradient
  const gradient = context.createLinearGradient(0, 0, 0, height)
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.6)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)')
  context.fillStyle = gradient
  context.fillRect(0, 0, width, height)
  
  // Load logo
  const logo = await loadImage(path.join(process.cwd(), 'public', 'images', 'logo-dark.png'))
  
  // Draw logo
  const logoWidth = 200
  const logoHeight = (logo.height / logo.width) * logoWidth
  context.drawImage(logo, 50, 50, logoWidth, logoHeight)
  
  // Add text
  context.fillStyle = '#ffffff'
  context.font = 'bold 60px Inter'
  context.fillText(siteConfig.name, 50, height / 2)
  
  context.font = '40px Inter'
  context.fillText(siteConfig.description, 50, height / 2 + 80)
  
  // Add warning text
  context.fillStyle = '#ff6b6b'
  context.font = 'bold 30px Inter'
  context.fillText('WARNING: Beware of fake websites!', 50, height - 100)
  context.fillStyle = '#ffffff'
  context.font = '25px Inter'
  context.fillText('Official website: ' + siteConfig.url, 50, height - 60)
  
  // Save the image
  const buffer = canvas.toBuffer('image/jpeg')
  fs.writeFileSync(path.join(imagesDir, 'og-banner.jpg'), buffer)
  
  console.log('OG image generated successfully!')
}

async function main() {
  try {
    await generateOGImage()
  } catch (error) {
    console.error('Error generating OG image:', error)
    process.exit(1)
  }
}

main()

