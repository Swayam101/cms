FROM node:20-alpine

VOLUME [ "/usr/app/uploads" ]
ENV NODE_ENV=development
ENV TZ="Asia/Kolkata"


RUN mkdir -p /usr/app/
WORKDIR /usr/app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY ./ ./
RUN yarn build

RUN npm install pm2 -g 

EXPOSE 3000
CMD ["pm2-runtime", "./dist/app.js"]