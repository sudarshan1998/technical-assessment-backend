import { handler } from "../src/functions/get-all-beers";
import AWS from "aws-sdk";

describe("handler", () => {
  let scanSpy: jest.SpyInstance;

  beforeEach(() => {
    scanSpy = jest.spyOn(AWS.DynamoDB.DocumentClient.prototype, "scan");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return success response with all beers", async () => {
    const expectedResponse = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': false
        },
        body: '{"body":{"data":[{"image":"sample-image","beer_id":"sample-id","description":"asdf","price":"adf","name":"adfadf","genre":"adsfasdf"}]}}'
    };

    scanSpy.mockReturnValue({
      promise: jest.fn().mockResolvedValue({
        Items: [
          {
            image: "sample-image",
            beer_id: "sample-id",
            description: "asdf",
            price: "adf",
            name: "adfadf",
            genre: "adsfasdf",
          },
        ],
      }),
    });

    const event = {} as any;

    const result = await handler(event);

    expect(scanSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedResponse);
  });

  it("should return internal server error response when getAllBeers throws an error", async () => {
    const expectedResponse = {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': false
        },
        body: '{"body":{"error":"Internal server error."}}'
    };

    scanSpy.mockReturnValue({
      promise: jest.fn().mockRejectedValue(new Error("Database error")),
    });

    const event = {} as any;

    const result = await handler(event);
    expect(scanSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedResponse);
  });
});
