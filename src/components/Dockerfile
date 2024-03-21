# Build stage
FROM node:alpine as build-stage
WORKDIR /app

# Ensure you copy package.json and package-lock.json
COPY ./package*.json ./

# Set the NODE_ENV to production
ENV NODE_ENV=production

RUN npm install

# Now copy the rest of your application's source code
COPY . ./

RUN npm run build

# Serve stage
FROM nginx:stable-alpine as serve-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
