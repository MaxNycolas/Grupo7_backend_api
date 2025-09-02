# Imagem base
FROM node:18

# Definir diretório de trabalho dentro do container
WORKDIR /app

# Copiar arquivos de dependência
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o resto do código
COPY . .

# Expor a porta (vai usar a variável PORT, default 3000)
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "start"]


