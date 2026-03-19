# opencode-federal-platform-pack
# Pinned base - node:20-alpine (no :latest)
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci 2>/dev/null || npm install

COPY . .

# Tests run in CI verify stage; avoid duplicate run in image build
RUN npm run verify

ENTRYPOINT ["node"]
CMD ["--version"]
