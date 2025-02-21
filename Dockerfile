# Base stage 
FROM node:22-alpine AS base

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

# Development stage
FROM node:22-alpine AS dev

WORKDIR /usr/src/app

COPY --from=base /usr/src/app/node_modules ./node_modules
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]



# Build stage 
FROM node:22-alpine AS build

WORKDIR /usr/src/app

COPY --from=base /usr/src/app/node_modules ./node_modules
COPY . .

RUN npm run build

# Productin stage -------------- this for testing nginx setup leter
FROM node:22-alpine AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/build ./

EXPOSE 2000

CMD [ "npm", "run", "preview" ]