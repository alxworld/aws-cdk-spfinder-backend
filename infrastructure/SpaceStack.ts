import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';

export class SpaceStack extends Stack {
    
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);
        
        const helloLambda = new LambdaFunction(this, 'helloLambda', {
            runtime: Runtime.NODEJS_14_X,
            code: Code.fromAsset(join(__dirname, '..', 'services', 'hello')),
            handler: 'hello.main'
        }) 
    }
    
}
