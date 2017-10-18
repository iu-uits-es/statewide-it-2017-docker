FROM microsoft/aspnetcore-build:2.0 AS build-env
WORKDIR /app
COPY *.csproj package.json ./
RUN dotnet restore
RUN npm install
ENV NODE_ENV production
ENV BABEL_ENV production

COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM microsoft/aspnetcore:2.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "TodoApp.dll"]
