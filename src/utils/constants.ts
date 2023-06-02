/**
 * This file contains the variables and constants which are frequently used
 * /** */

 //Header for the cors policy
const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Credentials': false,
}

export const successResponse = (body: {}) => {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({body})
  }
}

export const interServerError = (body: {}) => {
  return {
    statusCode: 500,
    headers,
    body: JSON.stringify({body})
  }
}

export const otherError = (body: {}) => {
  return {
    statusCode: 400,
    headers,
    body: JSON.stringify({body})
  }
}
