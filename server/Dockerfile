FROM node:14-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 5001

CMD [ "npm", "run", "start:prod" ]

