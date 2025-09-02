# Usando Node 18 LTS
FROM node:18

# Definir diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Definir variável de ambiente padrão (caso não venha do Easypanel)
ENV PORT=3000

# Expor a porta para fora do container
EXPOSE 3000

# Rodar a aplicação
CMD ["npm", "start"]



