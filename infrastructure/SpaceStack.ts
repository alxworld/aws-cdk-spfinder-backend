import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { RestApi, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { GenericTable } from './GenericTable';
import { Effect as IAMEffect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class SpaceStack extends Stack {
    
    // api gateway
    private api = new RestApi(this, 'SpaceApi');

    // dynamodb table
    //private spacesTable = new GenericTable('SpacesTable', 'spaceID', this);
    private spacesTable = new GenericTable(this, {tableName: 'SpacesTable', primaryKey: 'spaceId', createLambdaPath: 'Create'});

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);
        
        const helloLambda = new LambdaFunction(this, 'helloLambda', {
            runtime: Runtime.NODEJS_14_X,
            code: Code.fromAsset(join(__dirname, '..', 'services', 'hello')),
            handler: 'hello.main'
        });

        const helloLambdaNodeJS = new NodejsFunction(this, 'helloLambdaNodeJS', {
            entry: (join(__dirname, '..', 'services', 'node-lambda','hello.ts')),
            handler: 'handler' 
        });

        // Hello API Lambda integration ( linking API Gateway with Lambda )
        const helloLambdaIntegration = new LambdaIntegration(helloLambdaNodeJS);
        const helloLamdaResource = this.api.root.addResource('hello');
        helloLamdaResource.addMethod('GET', helloLambdaIntegration);

        // S3 Access Grants
        // const s3ListPolicy = new PolicyStatement();
        // s3ListPolicy.addActions('s3.*');
        // s3ListPolicy.addResources('*');
        helloLambdaNodeJS.addToRolePolicy(new PolicyStatement({
            effect: IAMEffect.ALLOW,
            actions: ['s3:ListAllMyBuckets'],
            resources: ['*']
        }));

        // Spaces API integration
        const spaceResource = this.api.root.addResource('spaces'); 
        spaceResource.addMethod('POST', this.spacesTable.createLambdaIntegration);

    
    }
    
}
