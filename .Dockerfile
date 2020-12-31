FROM cimg/node:14.0.0

LABEL author="Ochowo Ikongbeh"

WORKDIR /demo-app

COPY package*.json ./

RUN npm install

COPY . ./

CMD [ "npm", "start" ]