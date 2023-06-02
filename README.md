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
Test the service is up.

```
/healthcheck
```

## POST: Beer

Endpoint: ```https://ocgj9x4mbh.execute-api.ap-southeast-2.amazonaws.com/dev/beer```

Request Body:
```
{
    "name": "sample-name7",
    "image_url": "sample_image",
    "price": "0.001",
    "genre": "sample-genre",
    "description": "sample-description"
}
```

This API is to add the beers in the database.

## GET: Beers

Endpoint: ```https://ocgj9x4mbh.execute-api.ap-southeast-2.amazonaws.com/dev/beers```

This API get all the beers from the server.

## DELETE: Beer

Endpoint: ```/dev/beer/{beer_id}

This API required ```beer_id``` as path parameter

Note: Unfortunately, this API couldn't be deployed due to some technical glitches. To test locally; we can use ```serverless offline``` or ```sls offline```.

# Testing

Then run
```
npm run test

```

## Test coverage

The test coverage is more than 80% for all the APIs.

![Screenshot from 2023-06-02 16-29-23](https://github.com/sudarshan1998/technical-assessment-backend/assets/23524244/5398dd86-495e-4ed7-82bb-e3fe8325bc7e)