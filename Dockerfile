
# Node 22 slim
FROM node:22-slim

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

# Use env vars at runtime
CMD ["npm", "start"]
