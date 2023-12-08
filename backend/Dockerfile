FROM node:21-alpine
WORKDIR /app
ADD . .
RUN npm install
EXPOSE 5055
CMD [ "node", "server.js"]