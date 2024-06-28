# Installation, setups and environments

## Prerequisites:
- **Node.js:** Ensure Node.js is installed on your machine.
- **Git:** Ensure Git is installed for version control.

## Installation Steps:

1. Clone the Git repository:
    ```bash
    git clone https://github.com/biodiversitydata-se/biologging-sensor-client.git
    ```

2. Navigate to the project directory:
    ```bash
    cd biologging-sensor-data
    ```

3. Checkout the develop branch:
    ```bash
    git checkout develop
    ```

4. Install project dependencies:
    ```bash
    npm install
    ```

## Development server:
Starting the development server:
```bash
npm run dev
```

## Deployment
For deployment, Node.js server can be used by:
1. Building the application:
```bash
npm run build
```

If any errors, they should be fixed, warnings are ok. 

2. Starting the application:
```bash
npm run start
```

## Setup on TEST environment
### Prerequisites:
- Git and Node as before
- ensure file `.env.local` is present

### `.env.local` setup
1. add `NEXT_PUBLIC_NODE_ENV` and save:
```
NEXT_PUBLIC_NODE_ENV=test
```

Note: it is needed because the URL address for the test server ends without trailing '/', which breaks the routing of the pages - it removes the "biologging-client-dev/" from "http://canmove-dev.ekol.lu.se/biologging-client-dev/" URL when routing. Therefore, it is added there manually. It can be seen in the src/components/links.tsx. 

## Setup in custom environment
If some specifica behaviour should be done on the environment, `.env.local` file needs to be present, which represent environment variables. The variable needs to start with "NEXT_PUBLIC_..." to be used in the project. File `next.config.js` can also be used for configuration of the application to change behaviour for th environments, or just general. 

## Example: configuring custom URL for assets
This situation occured when setting up the test environment, so just adding explanation here. Setup needs to be done in "biologging-sensor-data/next.config.js/".

1. check if test environment
```
const isTest = process.env.NEXT_PUBLIC_NODE_ENV === 'test'
```

2. add to 'nextConfig' object ternary operator for custom url for assets for test env:
```
assetPrefix: isTest ? 'http://canmove-dev.ekol.lu.se/biologging-client-dev/' : undefined,
```