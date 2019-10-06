FROM mongodb:4.2
LABEL Peace Oyedeji <oyedejipeacea@gmail.com>

# SETUP DATABASES
ENV MONGODB_DATABASE 'stackoverflow'
ENV MONGODB_ROOT_PASSWORD 'stackoverflow'
ENV MONGODB_USER 'stackoverflow'
ENV MONGODB_PASSWORD 'stackoverflow'


ENV NODE_ENV=development
COPY package.json package-lock.json ./

RUN apt-get update && \
    apt-get install curl software-properties-common make -y && \
    curl -sL https://deb.nodesource.com/setup_12.x | bash -

RUN apt-get update && \
    apt-get install -y \
    nodejs

RUN apt-get install build-essential -y

RUN mkdir /backend
WORKDIR /

COPY package-*.json .
RUN npm install

COPY . .

EXPOSE 80
COPY stackoverflow-entrypoint.sh /stackoverflow-entrypoint.sh

CMD ["sh", "stackoverflow-entrypoint.sh"]