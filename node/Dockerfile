FROM node:6.11.4-alpine as build-env
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install

COPY public /usr/src/app/public/
COPY src /usr/src/app/src/
RUN npm run build


FROM node:6.11.4-alpine
RUN mkdir -p /usr/src/app && \
    adduser -S todo && \
    chown -R todo /usr/src/app
WORKDIR /usr/src/app
USER todo

COPY --from=build-env /usr/src/app/build /usr/src/app/build/
COPY scripts /usr/src/app/scripts/
RUN npm install express body-parser mongodb
CMD node scripts/server.js
EXPOSE 3000
