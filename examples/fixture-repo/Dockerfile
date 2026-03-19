# Fixture for demo - intentionally uses :latest to trigger quality-gate warning
FROM node:20
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . .
CMD ["node", "index.js"]
