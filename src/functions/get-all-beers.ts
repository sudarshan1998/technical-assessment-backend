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
    const allBeers = await getAllBeers()
    return {
      statusCode: 200,
      body: JSON.stringify({data: allBeers})
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
 * Function to get all items from dynamodb
 * @param event 
 * @returns void
 */
const getAllBeers = async ()=> {
  const params: AWS.DynamoDB.ScanInput = {
    TableName: process.env.BEERS_TABLE!
  };
  try {
  // DynamoDB query to get all items from database
    const allBeers = await dynamoDB.scan(params).promise()
		return allBeers.Items
  } catch (error) {
    console.info("Error " + error)
  }
}
