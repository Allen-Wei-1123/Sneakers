from node
WORKDIR /sneakers
copy package.json .

run npm install --production
copy . .
expose 8085
cmd ["node","./src/server.js"]


