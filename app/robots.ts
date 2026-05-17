import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/config';

// AI crawler allowlist — these are the bots we want indexing the site for
// AI Overviews / ChatGPT search / Perplexity / Claude citations. Listed
// explicitly so a future restrictive '*' rule wouldn't silently block them.
const AI_BOTS = [
  'GPTBot',          // OpenAI training + ChatGPT browsing
  'OAI-SearchBot',   // OpenAI search index
  'ChatGPT-User',    // ChatGPT on-demand fetches
  'ClaudeBot',       // Anthropic Claude
  'Claude-Web',      // Anthropic web fetches
  'anthropic-ai',    // legacy Anthropic UA
  'PerplexityBot',   // Perplexity AI
  'Perplexity-User', // Perplexity on-demand fetches
  'Google-Extended', // Google AI/Bard training opt-in
  'GoogleOther',     // Google "other" crawlers (incl. AI features)
  'Applebot-Extended', // Apple AI training
  'CCBot',           // Common Crawl (powers many LLMs)
  'Bytespider',      // ByteDance / Doubao
  'DuckAssistBot',   // DuckDuckGo AI
  'cohere-ai',       // Cohere
  'YouBot',          // You.com AI
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      // Explicit allow for AI crawlers — same scope as the wildcard rule but
      // makes the intent unambiguous and survives future wildcard tightening.
      ...AI_BOTS.map(userAgent => ({
        userAgent,
        allow: '/',
        disallow: ['/api/'],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
