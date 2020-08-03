A microservice to contain reports from assurance scanning and store them in a document store in MongoDB

Using the MERN stack ths serivce has a backend and frontend element. The backend provides routes for reports to be posted to. Currently only working for small (very small) trivy reports. These get posted to an available mongodb in reportsstore

### Requirements

mongodb instance
node

### How to install

1. node.js /npm      : brew install node
   node -v   : v14.7.0
   https://medium.com/@hayasnc/how-to-install-nodejs-and-npm-on-mac-using-homebrew-b33780287d8f

2. MongoDB
   brew tap mongodb/brew
   brew install mongodb-community@4.2

   brew services start mongodb-community@4.2
   brew services stop mongodb-community@4.2
   
   https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/


### How to run

1. Setup mongodb to run as below
2. cd to report_service root and run 'node app.js'
    may have to : 
                npm install dotenv
3. cd to report_client root and run 'npm start'
    may have to do a :  npm update

### environment variables

Shouldnt really share .env files around, but for now this is the contents of mine. Create a .env file in the root of the project and these will be picked up

APP_PORT=3000
CLIENT_PORT=8000
MONGODB_CONNECTION_STRING=mongodb://127.0.0.1:27017/reportstore

### Todo:

* This design is based on a Trivyy report, needs to be made more flexible and robust for other types of reports without breaking - e.g. the service expects a vulnerability element in the passed report
* Fix api to accept more reports. The Details component in the client is tied to the format of a Trivy Report. We could create components for each report type to display the content displayed within, choosing the component depending on the report submitted

* In which case, the API needs to expect the report type as well as the report in json format

* Pritify the created at time
* Identify the pipeline run number
* Put details in the tooltip

* Detail Table sorting


