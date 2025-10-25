FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY packages/backend/package*.json ./packages/backend/

RUN npm ci

COPY packages/backend ./packages/backend

WORKDIR /app/packages/backend

RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/packages/backend/dist ./dist
COPY --from=builder /app/packages/backend/node_modules ./node_modules
COPY --from=builder /app/packages/backend/package*.json ./
COPY --from=builder /app/packages/backend/prisma ./prisma

EXPOSE 3000

CMD ["npm", "start"]
