import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";

const dynamoDB: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    await addBeer(event)
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};

const addBeer = async (event: APIGatewayProxyEvent) => {
  const beerId: AWS.DynamoDB.PutItemInputAttributeMap = getUuid()
  if(!beerId) {
    return {
      statusCode: 400,
      body: JSON.stringify({error: "Error generating beerId"})
    }
  }
  // Parse the request body
  const body = JSON.parse(event.body);
  const params: AWS.DynamoDB.PutItemInput = {
    Item: {
      beer_id: beerId,
      name: body.name,
      genre: body.genre,
      description: body.description
    },
    TableName: "BeersTable"
  };

  await dynamoDB.put(params).promise()
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Item saved successfully" }),
  };
}

const getUuid = () => {
  const { v4: uuidv4 } = require('uuid');
  const uuid = uuidv4();
  return uuid
}