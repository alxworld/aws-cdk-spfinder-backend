import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { RestApi, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { GenericTable } from './GenericTable';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

export class SpaceStack extends Stack {
    
    // api gateway
    private api = new RestApi(this, 'SpaceApi');

    // dynamodb table
    private spacesTable = new GenericTable('SpacesTable', 'spaceID', this);

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);
        
        const helloLambda = new LambdaFunction(this, 'helloLambda', {
            runtime: Runtime.NODEJS_14_X,
            code: Code.fromAsset(join(__dirname, '..', 'services', 'hello')),
            handler: 'hello.main'
        }) 

        // Hello API Lambda integration ( linking API Gateway with Lambda )
        const helloLambdaIntegration = new LambdaIntegration(helloLambda);
        const helloLamdaResource = this.api.root.addResource('hello');
        helloLamdaResource.addMethod('GET', helloLambdaIntegration);

        // S3 Access Grants
        const s3ListPolicy = new PolicyStatement();
        s3ListPolicy.addActions('s3.listAllMyBuckets');
        s3ListPolicy.addResources('*');
        helloLambda.addToRolePolicy(s3ListPolicy);

    
    }
    
}
