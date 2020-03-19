# NodeJs AUTH0 Demo App
Fully working nodejs auth0 application with added UI.

# Modules Used

 - passport - an authentication middleware for Node.js
- passport-auth0 - an Auth0 authentication strategy for Passport
- express-session - a middleware to manage sessions
- dotenv - a module to load environment variables from a .env file
# Features
- Added a beautiful landing page
- My profile dashboard
### Installation

Install the dependencies and devDependencies and start the server.

```sh
$ cd nodejs-Auth0-Demo
$ npm install 
$ node app
```

For production environments...

```sh
$ npm install --production
$ NODE_ENV=production node app
```
#### For more reference
[Official Auth0 Node.js Docs](https://auth0.com/docs/quickstart/webapp/nodejs/01-login?download=true)
###### NOTE :
       - Don't forget to make and .env file and add Auth0 domain, api secret and client id.
#### Screenshots
![Landing Page](https://github.com/anurag0608/nodejs-Auth0-Demo/blob/master/ss/1.png)
![Auth0 Api](https://github.com/anurag0608/nodejs-Auth0-Demo/blob/master/ss/2.png)
![User Profile](https://github.com/anurag0608/nodejs-Auth0-Demo/blob/master/ss/3.png)
