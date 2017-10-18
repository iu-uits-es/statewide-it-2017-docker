FROM node:6.11.4 as node-build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY public /usr/src/app/public/
COPY src /usr/src/app/src/
RUN npm run build


FROM maven:3.5.0-jdk-8 as mvn-build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY --from=node-build /usr/src/app/build /usr/src/app/build/
COPY pom.xml /usr/src/app/
RUN mvn dependency:resolve dependency:resolve-plugins verify --fail-never -s /usr/share/maven/ref/settings-docker.xml
COPY src /usr/src/app/src/
RUN mvn package -s /usr/share/maven/ref/settings-docker.xml


FROM openjdk:8u131-jdk-alpine
RUN mkdir -p /usr/src/app && \
    adduser -S todo && \
    chown -R todo /usr/src/app
WORKDIR /usr/src/app
USER todo
COPY --from=mvn-build /usr/src/app/target/todo-app.jar /usr/src/app/
CMD java -jar /usr/src/app/todo-app.jar
EXPOSE 8080
