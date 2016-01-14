FROM mhart/alpine-node

RUN mkdir /app

# make sure all commands
WORKDIR /app

# copy package.json
COPY package.json .

# If you have native dependencies, you'll need extra tools
# RUN apk-install make gcc g++ python

# Install dependencies
RUN npm install

# If you had native dependencies you can now remove build tools
# RUN apk del make gcc g++ python && \
#   rm -rf /tmp/* /root/.npm /root/.node-gyp

COPY . .
