FROM node:18

#CREATE APP DIRECTORY
WORKDIR /usr/src/app
#INSTALL APP DEPENDENCIES
COPY package*.json ./

RUN npm install 
#BUNDLE APP SOURCE
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
