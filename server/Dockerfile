FROM node:23-slim
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY src .
CMD ["npm", "start"]
