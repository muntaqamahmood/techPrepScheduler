FROM node:14-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

ENV REACT_APP_BASE_URL=http://localhost:5000/api

CMD [ "npm", "start" ]

