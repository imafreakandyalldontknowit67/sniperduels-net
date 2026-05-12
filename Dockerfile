# Multi-stage build for Next.js standalone output

FROM node:20-alpine AS deps
WORKDIR /app
# `npm ci` enforces lockfile match (no silent dep drift) and fails on missing
# integrity hashes — a basic supply-chain guard. Lockfile must exist.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/data ./data
# Critical: next.config.js MUST be present at runtime — `next start` reads it
# on boot. Without it, `images.remotePatterns` is empty and /_next/image
# returns HTTP 400 for every external image (this is what was breaking the
# weapon thumbnails on /snipers /knives — they hotlink images.sniperduels.com).
COPY --from=builder /app/next.config.js ./next.config.js

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["npx", "next", "start", "-p", "3000"]
