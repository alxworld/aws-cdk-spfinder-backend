import {DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context  } from 'aws-lambda';
import { v4 as uuid } from 'uuid';

const TABLE_NAME = process.env.TABLE_NAME;
//const TABLE_NAME = 'SpacesTable';

const dbClient = new DynamoDB.DocumentClient();

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: 'Hello from Alex DynamoDB'
    }

    const item = typeof event.body == 'object'? event.body: JSON.parse(event.body);
    item.spaceId = uuid(); 

    try {
        await dbClient.put({
            TableName: TABLE_NAME!,
            Item: item
        }).promise();
    } catch (error){
        //result.body = error.message
        result.body = 'Got an error Alex : ' + error;
        console.log(error);
    }
    result.body = JSON.stringify(`Created new item with id : ${item.spaceId}`);
    
    return result;

}

export {handler}