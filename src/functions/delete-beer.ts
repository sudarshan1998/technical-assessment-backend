import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";

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
    return {
      statusCode: 200,
      body: JSON.stringify({message: "Item deleted successfully."})
    }
  } catch (error) {
    console.error("Error " + error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error." }),
    };
  }
};

/**
 * Function to delete item in dynamodb
 * @param event 
 * @returns void
 */
const deleteBeer = async (event: APIGatewayProxyEvent)=> {
  const params: AWS.DynamoDB.DeleteItemInput = {
    Key: {
			"beer_id": {
				S: event.pathParameters!.beer_id
			}
    },
    TableName: process.env.BEERS_TABLE!
  };
  try {
  // DynamoDB query to delete item in database
    await dynamoDB.delete(params).promise()
  } catch (error) {
    console.info("Error " + error)
  }
}