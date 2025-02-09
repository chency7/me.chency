# 构建阶段
FROM node:latest AS builder
RUN npm install -g pnpm

WORKDIR /app

# 复制 package.json 和 lockfile
COPY package.json pnpm-lock.yaml ./
COPY .env.production .env

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制所有源代码和配置文件
COPY . .

# 生成 contentlayer 内容
RUN pnpm contentlayer build

# 构建应用
RUN pnpm build

# 生产阶段
FROM node:latest AS runner
RUN npm install -g pnpm

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3033

# 复制必要文件
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/.env ./

# 复制配置文件
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/postcss.config.js ./
COPY --from=builder /app/tailwind.config.js ./
COPY --from=builder /app/global.css ./

# 安装生产依赖
RUN pnpm install --prod --frozen-lockfile

# 复制构建产物和必要文件
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.contentlayer ./.contentlayer
COPY --from=builder /app/app ./app

# 暴露端口
EXPOSE 3033

# 启动命令
CMD ["pnpm", "start"] 