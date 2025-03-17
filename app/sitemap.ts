import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bloomsbybeth.com' // Replace with your actual domain

  // Define your routes
  const routes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/contact',
  ]

  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
} 