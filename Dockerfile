# base image
FROM node:10-alpine

# create app directory and use it as the working directory
RUN mkdir -p /app/web
WORKDIR /app/web

# install and cache app dependencies
COPY package*.json /app/web
COPY yarn.lock /app/web
RUN yarn

# copy all files to the working directory
COPY . /app/web

# expose ports
EXPOSE 3000

# start app
CMD ["yarn", "start"]
