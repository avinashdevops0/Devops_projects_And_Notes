FROM node:18-alpine
WORKDIR /app
COPY index.js .
RUN npm init -y && npm install express body-parser uuid
CMD ["node", "index.js"]
