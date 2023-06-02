import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";
import { successResponse, interServerError } from "../utils/constants"

const dynamoDB: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();

/**
 * Handler to handle the main business logic
 * @param event 
 * @returns http response
 */
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    await deleteBeer(event)
    return successResponse({message: `Item ${event.pathParameters!.beer_id} deleted successfully.`})
  } catch (error) {
    console.error("Error " + error)
    return interServerError({ error: "Internal server error." })
  }
};

/**
 * Function to delete item in dynamodb
 * @param event 
 * @returns void
 */
const deleteBeer = async (event: APIGatewayProxyEvent)=> {
  const params = {
    Key: {
      "beer_id": event.pathParameters!.beer_id,
    },
    TableName: process.env.BEERS_TABLE!
  };
  // DynamoDB query to delete item in database
  await dynamoDB.delete(params).promise()
}
