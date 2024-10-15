FROM node:20.12.2-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH="/app/node_modules/.bin:$PATH"

# install app dependencies
COPY package.json ./
RUN npm install --silent

# add app
COPY . ./

# Expose port
EXPOSE 3000

# start app
CMD ["npm", "run", "start"]
