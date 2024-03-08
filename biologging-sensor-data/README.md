## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


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
