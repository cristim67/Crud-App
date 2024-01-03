# Simple crud app example

This is a simple project with a server and a client for a user management app. The server is built with [Node.js](https://nodejs.org/en/) and MongoDB. The client is built with [React](https://reactjs.org/).

## Prerequisites

- ✅ [NodeJs](https://nodejs.org) >= 16.0.0
- ✅ [npm](https://www.npmjs.com/)
- ✅ [genezio](https://genez.io/)

## Project Structure

Inside the project folder, you will find the following files and folders:

```
├── server/
│   ├── db/
│   ├── backendService.ts
│   ├── package.json
│   └── tsconfig.json
├── client/
│   ├── src/
│   ├── package.json
|   └── tsconfig.json
├── genezio.yaml
├── README.md
├── .genezioignore
```

Genezio looks for `genezio.yaml` to read the settings for deploying the project or for spinning a local dev server for testing.

The `backend` directory contains the implementation of the server side of the project.

The `frontend` directory contains a simple React application that talks with the genezio server.

## Run the project

### Clone this example

Clone the repository:

```
git clone https://github.com/cristim67/Crud-App
```

### Test your project locally

Test the project locally:

```
genezio local
```

Open a new terminal, navigate to the following directory, and run npm start to launch the application:

```
cd ./client
npm run install-local-sdk
npm start
```

### Deploy your project with genezio

If you wish to deploy your project to the Genezio infrastructure, follow these steps:

Log in to Genezio using the command genezio login:

```
genezio login
```

Deploy your project using the genezio deploy command from the `./genezio-examples/typescript/crud-app` directory.

```
genezio deploy
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command                  | Action                       |
| :----------------------- | :--------------------------- |
| `npm install -g genezio` | Installs genezio globally    |
| `genezio login`          | Logs in to genezio           |
| `genezio local`          | Starts a local server        |
| `genezio deploy`         | Deploys a production project |
| `genezio --help`         | Get help using genezio       |
