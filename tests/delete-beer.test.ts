import { handler } from '../src/functions/delete-beer';
import { APIGatewayProxyEvent } from 'aws-lambda';
import AWS from 'aws-sdk';

// Mock the AWS SDK DynamoDB DocumentClient
jest.mock('aws-sdk', () => {
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => ({
        delete: jest.fn().mockReturnThis(),
        promise: jest.fn(),
      })),
    },
  };
});

describe('handler', () => {
  let mockEvent: APIGatewayProxyEvent;
  let mockDelete: jest.Mock;

  beforeEach(() => {
    // Initialize the mock event
    mockEvent = {
      pathParameters: {
        beer_id: 'sample_id',
      },
    } as any;

    // Reset the mock implementation before each test
    mockDelete = jest.fn().mockReturnThis();
    (AWS.DynamoDB.DocumentClient as jest.Mock).mockImplementation(() => ({
      delete: mockDelete,
      promise: jest.fn(),
    }));
  });

  it('should delete the item and return 200 status code', async () => {
    // Set up the mock implementation for successful deletion
    const mockDeletePromise = jest.fn().mockResolvedValue({});
    mockDelete.mockReturnValue({ promise: mockDeletePromise });

    // Invoke the handler
    const result = await handler(mockEvent);

    // Verify the response
    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({ message: 'Item deleted successfully.' }),
    });
  });
});
