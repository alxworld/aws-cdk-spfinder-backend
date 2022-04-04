// import { S3 } from 'aws-sdk';

// const s3Client = new S3();


async function handler(event: any, context: any) { 

    //const buckets = await s3Client.listBuckets().promise();

    console.log("ALEX EVENT : " + JSON.stringify(event, null, 2));
    
    return  {
        statusCode: 200,
        //body: 'List of Alex buckets in AlexWorld : ' + JSON.stringify(buckets.Buckets)
        body: 'List of Alex buckets in AlexWorld : '
    }
    
}
    
export { handler }    
