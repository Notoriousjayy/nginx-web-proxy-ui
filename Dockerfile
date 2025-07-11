FROM node:18-alpine AS build
WORKDIR /usr/src/app

# Copy deps from the root
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of your app (assuming src/ and webpack.config.js live at the root)
COPY . ./
RUN npm run build

FROM nginx:stable-alpine

# Make sure this file actually exists at the root
COPY nginx.default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
