FROM ubuntu:24.04

RUN apt-get update \
    && apt-get install -y --no-install-recommends nodejs npm \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY app.js ./

EXPOSE 3000
CMD ["npm", "run", "start"]
