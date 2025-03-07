FROM node:latest
WORKDIR /usr/app/
COPY package*.json ./
RUN npm install
COPY . .
COPY src/ ./src
# COPY dist/ ./dist
COPY server.ts ./
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "watching"]