import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";
import { getUuid } from "../utils/uuid"

// Request from the front end
type RequestBody = {
  name: string,
  image_url: string,
  genre: string,
  price: string,
  description: string
}

const dynamoDB: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

/**
 * Handler to handle the main business logic
 * @param event 
 * @returns http response
 */
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // Parse the request body
  const body: RequestBody = JSON.parse(event.body!);
  const errors: string[] = validateRequestBody(body)

  if (errors.length > 0) {
    return {
      statusCode: 500,
      body: JSON.stringify({error: errors})
    }
  }

  try {
    await addBeer(body)
    return {
      statusCode: 200,
      body: JSON.stringify({message: "Item saved successfully."})
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
 * Function to write in dynamodb
 * @param event 
 * @returns void
 */
const addBeer = async (body: RequestBody)=> {
  const beerId: AWS.DynamoDB.PutItemInputAttributeMap = getUuid()
  if(!beerId) {
    console.error("Error: Error generating beerId" )
    return {
      statusCode: 400,
      body: JSON.stringify({error: "Error generating beerId"})
    }
  }
  
  const params = {
    Item: {
      "beer_id": beerId,
      "name": body.name,
      "image": body.image_url,
      "genre": body.genre,
      "price": body.price,
      "description": body.description
    },
    TableName: process.env.BEERS_TABLE!
  };
  // DynamoDB query to write item in database
  await dynamoDB.put(params).promise()
}

/**
 * Function to validate the request body
 * @param body contains the request body in json
 * @returns array of array containing string
 */
const validateRequestBody = (body: RequestBody) => {
  let errors: string[] = []
  if (body.name.length === 0) {
    errors.push("The field 'name' cannot be empty")
  }
    
  if (body.image_url.length === 0) {
    errors.push("The field 'image' cannot be empty")
  }
  
  if (body.genre.length === 0) {
    errors.push("The field 'genre' cannot be empty")
  }
    
  if (body.price.length === 0) {
    errors.push("The field 'price' cannot be empty")
  }
      
  if (body.description.length === 0) {
    errors.push("The field 'description' cannot be empty")
  }
  return errors
}

export { validateRequestBody, addBeer }
