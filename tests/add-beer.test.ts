import { handler, addBeer, validateRequestBody } from '../src/functions/add-beer';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('Handler', () => {
  // Mock the necessary dependencies and set up initial test data

  const mockDynamoDBPut = jest.fn().mockReturnValue({ promise: jest.fn() });
  const mockDynamoDBDocumentClient = jest.fn().mockImplementation(() => ({
    put: mockDynamoDBPut,
  }));
  const mockUuid = jest.fn().mockReturnValue('mocked-uuid');

  const mockEvent: APIGatewayProxyEvent = {
    body: JSON.stringify({
      name: 'Test Beer',
      image_url: 'test-image-url',
      genre: 'Test Genre',
      price: '9.99',
      description: 'Test Description',
    }),
  } as any;

  beforeAll(() => {
    process.env.BEERS_TABLE = "Sample"
    jest.mock('aws-sdk', () => ({
      DynamoDB: {
        DocumentClient: mockDynamoDBDocumentClient,
      },
    }));
    jest.mock('../src/utils/uuid', () => ({
      getUuid: mockUuid,
    }));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a successful response when the request body is valid', async () => {
    const result = await handler(mockEvent);
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(JSON.stringify({ message: 'Item saved successfully.' }));
  });

  it('should return an error response when the request body is invalid', async () => {
    const invalidEvent: APIGatewayProxyEvent = {
      body: JSON.stringify({
        name: '',
        image_url: '',
        genre: '',
        price: '',
        description: '',
      }),
    } as any;

    const result = await handler(invalidEvent);

    expect(result.statusCode).toBe(500);
    expect(result.body).toContain('The field');
    expect(mockDynamoDBPut).not.toHaveBeenCalled();
  });

});

describe('validateRequestBody', () => {
  it('should return an empty array when the request body is valid', () => {
    const body = {
      name: 'Test Beer',
      image_url: 'test-image-url',
      genre: 'Test Genre',
      price: '9.99',
      description: 'Test Description',
    };

    const result = validateRequestBody(body);

    expect(result).toEqual([]);
  });

  it('should return an array of error messages when the request body is invalid', () => {
    const body = {
      name: '',
      image_url: '',
      genre: '',
      price: '',
      description: '',
    };

    const result = validateRequestBody(body);

    expect(result.length).toBe(5);
    expect(result).toContain("The field 'name' cannot be empty");
    expect(result).toContain("The field 'image' cannot be empty");
    expect(result).toContain("The field 'genre' cannot be empty");
    expect(result).toContain("The field 'price' cannot be empty");
    expect(result).toContain("The field 'description' cannot be empty");
  });
});
