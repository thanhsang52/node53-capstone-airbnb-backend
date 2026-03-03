FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma.config.ts ./

RUN npm ci

COPY prisma ./prisma/
COPY src ./src/

RUN npx prisma generate
RUN npm run build
RUN ls -la dist

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma.config.ts ./

RUN npm ci --only=production && npm cache clean --force

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/prisma ./prisma
COPY docker-entrypoint.sh ./docker-entrypoint.sh

RUN chmod +x /app/docker-entrypoint.sh

EXPOSE 5008

CMD ["./docker-entrypoint.sh"]
