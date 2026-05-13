FROM node:20-alpine

# Instala ferramentas de build (necessário se algum módulo nativo precisar compilar – ex: bcrypt, sqlite3)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copia os arquivos de manifesto
COPY package*.json ./

# Instala TODAS as dependências (produção + desenvolvimento)
RUN npm install

# Copia o restante do código fonte
COPY . .

# Gera o cliente Prisma (se estiver usando)
RUN npx prisma generate

# Compila TypeScript para JavaScript (cria a pasta dist/)
RUN npm run build

# Remove as devDependencies (opcional, mas reduz a imagem final)
RUN npm prune --production

EXPOSE 3000

# Inicia o servidor a partir do código compilado
CMD ["node", "dist/server.js"]