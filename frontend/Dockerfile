FROM node:20 AS build

WORKDIR /cwlfrontend
COPY package*.json ./
COPY build/ ./build/

RUN npm install
FROM nginx:alpine
COPY --from=build /cwlfrontend/build /usr/share/nginx/html
CMD ["nginx","-g","daemon off;"]