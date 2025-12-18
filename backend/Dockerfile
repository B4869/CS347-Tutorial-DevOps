# Stage 1: Build TypeScript
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files และติดตั้ง dependencies ทั้งหมด (รวม devDependencies สำหรับ build)
COPY package*.json ./
RUN npm install --production=false

# Copy source code และ build TypeScript
COPY . .

# ARG สำหรับ Prisma generate (ใช้ dummy URL เพื่อความปลอดภัย)
ARG DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

# Generate Prisma Client
RUN npx prisma generate
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app

# ติดตั้ง curl สำหรับ healthcheck
RUN apk add --no-cache curl

# Copy เฉพาะ production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy compiled JavaScript จาก builder stage
COPY --from=builder /app/dist ./dist
# Copy Prisma Client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# สร้าง logs directory
RUN mkdir -p logs

# Healthcheck: เช็คว่า server พร้อมใช้งาน
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/ || exit 1

EXPOSE 3000

# Run compiled JavaScript file
CMD ["node", "dist/src/server.js"]