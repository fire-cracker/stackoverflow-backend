FROM node:latest
LABEL Peace Oyedeji <oyedejipeacea@gmail.com>

# SETUP DATABASES
ENV MONGO_INITDB_ROOT_USERNAME: 'root'
ENV MONGO_INITDB_ROOT_PASSWORD: 'example'

ENV NODE_ENV=development
COPY package.json package-lock.json ./

RUN mkdir /backend
WORKDIR /

COPY package-*.json .
RUN npm install

COPY . .

EXPOSE 80
COPY stackoverflow-entrypoint.sh /stackoverflow-entrypoint.sh

CMD ["sh", "stackoverflow-entrypoint.sh"]