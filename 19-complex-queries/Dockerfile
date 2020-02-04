# Use node image which comes with basic alpine (linux) distribution
FROM node:12.14.0-alpine3.9

# Install build dependencies - Python which is used by bcrypt library
RUN apk --no-cache add --virtual builds-deps build-base python

# Create folder inside docker container
RUN mkdir -p /usr/src/app
# Go inside the folder in docker container
WORKDIR /usr/src/app
# Copy our project packages and environmental variable files into docker container
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
COPY .env /usr/src/app/

# Copy remaining files and folders into docker container
COPY . /usr/src/app/

# Install node modules using NPM
RUN npm install

# Expose the port from docker
EXPOSE 4000

# Install wait module
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

# Wait for any container to run before running the API project
CMD /wait && npm start