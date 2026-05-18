import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: [
          'AhrefsBot', 
          'SemrushBot', 
          'DotBot', 
          'PetalBot', 
          'MJ12bot', 
          'Rogerbot', 
          'MegaIndex.ru', 
          'BLEXBot', 
          'CCBot', 
          'GPTBot', 
          'cohere-ai', 
          'Anthropic-ai', 
          'Google-Extended'
        ],
        disallow: '/',
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
