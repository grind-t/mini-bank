FROM node:23
WORKDIR /app
COPY ./src ./src
COPY package.json .
RUN npm install --omit=dev
CMD ["npm", "start"]
