## Getting Started

To run the app on your local machine,

**Pre-requisites:**
* Install Git (https://git-scm.com/)
* Install NodeJS (https://nodejs.org/en)

**Steps**:
1. Set up and clone this repository onto your local machine. See [GitHub's getting started instructions](https://docs.github.com/en) if you are using GitHub for the first time.
2. In the command line window, navigate to the directory where you have stored the cloned files
3. `cd biologging-sensor-client`
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

## PRODUCTION

```
npm run build
npm start
```

or with pm2 :

```
pm2 --name biologging-client start npm -- start
```

so far problems encountered :
https://github.com/biodiversitydata-se/biologging-sensor-client/issues/102

to be solved :
not working on port 3000 to get a proper url. try with htaccess and apache2 with RewriteRule ?

# Development and Testing Environment

## Global Packages

- **Node.js**: v20.10.0
- **npm**: v9.8.1

## Project Dependencies

- **@fortawesome/fontawesome-svg-core**: ^6.5.1
- **@fortawesome/free-brands-svg-icons**: ^6.5.1
- **@fortawesome/free-regular-svg-icons**: ^6.5.1
- **@fortawesome/free-solid-svg-icons**: ^6.5.1
- **@fortawesome/react-fontawesome**: ^0.2.0
- **@types/react-leaflet**: ^3.0.0
- **ag-grid-react**: ^31.2.0
- **axios**: ^1.6.2
- **bootstrap**: ^3.4.1
- **chart.js**: ^4.4.1
- **chartjs-adapter-date-fns**: ^3.0.0
- **copy-to-clipboard**: ^3.3.3
- **date-fns**: ^3.6.0
- **leaflet**: ^1.9.4
- **next**: 14.0.3
- **react**: ^18.2.0
- **react-chartjs-2**: ^5.2.0
- **react-dom**: ^18.2.0
- **react-leaflet**: ^4.2.1
- **react-spinners**: ^0.13.8

- **@fortawesome/fontawesome-svg-core**: 6.5.1
- **@fortawesome/free-brands-svg-icons**: 6.5.1
- **@fortawesome/free-regular-svg-icons**: 6.5.1
- **@fortawesome/free-solid-svg-icons**: 6.5.1
- **@fortawesome/react-fontawesome**: 0.2.0
- **@types/leaflet**: 1.9.8
- **@types/node**: 20.11.8
- **@types/react-dom**: 18.2.18
- **@types/react-leaflet**: 3.0.0
- **@types/react**: 18.2.48
- **ag-grid-react**: 31.2.0
- **autoprefixer**: 10.4.17
- **axios**: 1.6.7
- **bootstrap**: 3.4.1
- **chart.js**: 4.4.1
- **chartjs-adapter-date-fns**: 3.0.0
- **copy-to-clipboard**: 3.3.3
- **date-fns**: 3.6.0
- **eslint-config-next**: 14.0.3
- **eslint**: 8.56.0
- **leaflet**: 1.9.4
- **next**: 14.0.3
- **postcss**: 8.4.33
- **react-chartjs-2**: 5.2.0
- **react-dom**: 18.2.0
- **react-leaflet**: 4.2.1
- **react**: 18.2.0
- **typescript**: 5.3.3


## Necessary Documentation
- [About Page](https://github.com/biodiversitydata-se/biologging-sensor-client/blob/%23JIRA120_Additional_documentation/design-docs/about_page.md)
- [Add New Diagram](https://github.com/biodiversitydata-se/biologging-sensor-client/blob/%23JIRA120_Additional_documentation/design-docs/add_diagram.md)
- [Add New Page](https://github.com/biodiversitydata-se/biologging-sensor-client/blob/%23JIRA120_Additional_documentation/design-docs/add_page.md)
- [Api Datamodel](https://github.com/biodiversitydata-se/biologging-sensor-client/blob/%23JIRA120_Additional_documentation/design-docs/api_datamodel.md)
- [Config](https://github.com/biodiversitydata-se/biologging-sensor-client/blob/%23JIRA120_Additional_documentation/design-docs/config.md)
- [Git Specifics](https://github.com/biodiversitydata-se/biologging-sensor-client/blob/%23JIRA120_Additional_documentation/design-docs/git_specifics.md)
- [Installation Guide](https://github.com/biodiversitydata-se/biologging-sensor-client/blob/%23JIRA120_Additional_documentation/design-docs/installation_guide.md)
- [SDBI Header Footer](https://github.com/biodiversitydata-se/biologging-sensor-client/blob/%23JIRA120_Additional_documentation/design-docs/sdbi_header_footer.md)


