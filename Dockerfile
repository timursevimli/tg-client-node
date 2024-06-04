FROM node:20-alpine AS build
WORKDIR /usr/src
COPY package*.json .
RUN apk add --no-cache --virtual .gyp python3 make g++ \
    && npm ci --only=production

FROM node:20-alpine
WORKDIR /usr/src
COPY --from=build /usr/src/node_modules /usr/src/node_modules
COPY . .
ENV NODE_ENV=production
CMD ["npm", "start"]
