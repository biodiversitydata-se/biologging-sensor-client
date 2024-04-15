## Getting Started

To run the app on your local machine,

**Pre-requisites:**
* Install Git (https://git-scm.com/)
* Install NodeJS (https://nodejs.org/en)

**Steps**:
1. Set up and clone this repository onto your local machine. See [GitHub's getting started instructions](https://docs.github.com/en) if you are using GitHub for the first time.
2. In the command line window, navigate to the directory where you have stored the cloned files
3. cd biologging-sensor-client`
4. `npm install` if you are running the app for the first time or if you are aware new libraries have been added to the application code since the last time you ran this command.
5. Run the command below:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. If the port `3000` has been used by another application, check the command line window messages for the port that is used.

## TEST server

you can ssh with your account blggext
several commands are available :
```
git pull
npm install
npm run dev
```

assure that .env.local file is present 

for security reasons, several commands are disabled (cd for instance)

if you want to see the logs in the terminal, you can run the app by using 
```
npm run dev
```
if you want to make it run permanently (background), please run :
```
pm2 --name biologging-client start npm -- run dev
```
you can see the process running here :
```
pm2 ps
```
to delete the process, please use 
```
pm2 delete ID
```
ID being the id of the app launched (most of the time : 0 )
