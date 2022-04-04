// import { S3 } from 'aws-sdk';

// const s3Client = new S3();


exports.main = async function (event, context) { 
    
    //const buckets = await s3Client.listBuckets().promise();
   
    console.log("New Updated EVENT : " + JSON.stringify(event, null, 2));
    console.log("New Updated logStreamName : " + JSON.stringify(context, null, 2));
    return context.logStreamName;
    // return  {
    //     statusCode: 200,
    //     body: 'List of Alex buckets in AlexWorld : ' + JSON.stringify(buckets.Buckets)
    // }
}