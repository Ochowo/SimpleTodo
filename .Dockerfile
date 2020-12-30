FROM  node:12.16.1

LABEL author="Ochowo Ikongbeh"
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 3000
CMD ["npm", "start"]
 