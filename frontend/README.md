# vue3-events-app-v2.....

This template should help get you started developing with Vue 3 in Vite........

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production using mock data

```sh
npm run build-mock
```

### Stoping and Deleting docker container

```sh
docker stop vue3-events-app-frontend 
docker rm vue3-events-app-frontend 
```

### Building frontend docker image

```sh
Linux:
export OS_BASE_URL="http://example.com"

Windows:
set OS_BASE_URL=http://example.com

npm run build-docker
docker build -t vue3-events-app-frontend:3.0.2 .
docker run -d --name vue3-events-app-frontend -p 8085:80 vue3-events-app-frontend:3.0.2
docker container logs vue3-events-app-frontend
```

### Deploy the image to docker hub

```sh
docker login
docker tag vue3-events-app-frontend:3.0.2 renatomatos79/aws-udemy:vue3-events-app-frontend-3.0.2
docker push renatomatos79/aws-udemy:vue3-events-app-frontend-3.0.2
docker container run -d --name vue3-events-app-frontend-3.0.2 -p 80:80 renatomatos79/aws-udemy:vue3-events-app-frontend-3.0.2
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Api Requests

Using Visual Studio Code, install Thunder Client extension and run the commands right below

### Get admin token

```sh
POST http://localhost:5114/api/token
content-type: application/json
{
    "username": "admin",
    "password": "admin"
}
```

### Get user token

```sh
POST http://localhost:5114/api/token
content-type: application/json
{
    "username": "renato",
    "password": "renato"
}
```
