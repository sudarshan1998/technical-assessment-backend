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
    const allBeers = await getAllBeers()
    return successResponse({data: allBeers})
  } catch (error) {
    console.error("Error " + error)
    return interServerError({ error: "Internal server error." })
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
  // DynamoDB query to get all items from database
  const allBeers = await dynamoDB.scan(params).promise()
  if(allBeers.Items) return allBeers.Items
  return []
}
