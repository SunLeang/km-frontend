FROM node:18-slim

RUN apt-get update && apt-get -y install procps
WORKDIR "/app"
COPY ./package.json ./
RUN npm install
COPY . .

EXPOSE 3000

RUN rm -rf ./build
RUN npm run build

CMD ["node", "build/index.js"]