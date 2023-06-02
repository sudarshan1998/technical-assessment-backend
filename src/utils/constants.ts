const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': false,
  }

export const successResponse = (body: any) => {
    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({body})
    }
}

export const interServerError = (body: any) => {
    return {
        statusCode: 500,
        headers,
        body: JSON.stringify({body})
    }
}

export const otherError = (body: any) => {
    return {
        statusCode: 400,
        headers,
        body: JSON.stringify({body})
    }
}