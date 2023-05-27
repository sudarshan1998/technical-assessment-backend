# Introduction
A Serverless APIs for beer product.

In this project, we will create an APIs for adding, updating and deleting the beer.

## Technology Used

### Programming Language

- Typescript + Node.js as a programming language
- Jest framework for unit test

### AWS Services

- Lambda
- Cloudformation
- Dynamodb
- API Gateway

## Getting up and running
First install `serverless` and get that up and running. documentation [here](https://serverless.com/framework/docs/providers/aws/guide/quick-start/).

You can use the standard `sls` commands or utilise the npm scripts in the project.

Then:

```
npm install
```

## Deployment

```
npm run deploy
```

## To remove:
```
npm run remove
```

# API interactions
The API url can be found either the console output, or programatically accessed via the `.serverless/output.json` object.

## GET: Healthcheck
Test the service is up

```
/healthcheck
```

# Testing

To test, first deploy the application to your desired AWS stack.
Then run
```
npm run test
```

This will use the generated API url to automatically test the application.