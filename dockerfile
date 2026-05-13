FROM node:20-alpine
WORKDIR /app

# Instala compiladores e Python (necessários para node-gyp)
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install --only=production

COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "start"]