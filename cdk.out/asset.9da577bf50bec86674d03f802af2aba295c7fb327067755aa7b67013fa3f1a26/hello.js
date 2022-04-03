
exports.main = async function (event, context) { 
    console.log("ALEX EVENT : " + JSON.stringify(event, null, 2));
    //return context.logStreamName;
    return  {
        statusCode: 200,
        body: 'Hello from Lambda Alex'
    }
}