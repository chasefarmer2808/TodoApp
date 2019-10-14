FROM node:10
WORKDIR /usr/src/app
COPY server/package*.json ./
RUN npm install
COPY server ./server
COPY dist ./dist
EXPOSE 3000
CMD ["node", "server/app.js"]