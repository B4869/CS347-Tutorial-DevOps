# Stage 1: Build TypeScript
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files และติดตั้ง dependencies ทั้งหมด (รวม devDependencies สำหรับ build)
COPY package*.json ./
RUN npm install --production=false

# Copy source code และ build TypeScript
COPY . .
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

# สร้าง logs directory
RUN mkdir -p logs

# Healthcheck: เช็คว่า server พร้อมใช้งาน
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/api/demo || exit 1

EXPOSE 5000

# Run compiled JavaScript file
CMD ["node", "dist/server.js"]