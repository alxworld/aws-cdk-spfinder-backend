# aws-cdk-spfinder-backend
aws-cdk-spfinder-backend

Initialize GitHub repo and checkout locally

npm init -y

npm i -D aws-cdk aws-cdk-lib constructs ts-node typescript

cdk.json 
{
    "app": "npx infrastructure/Launcher.ts"
}

cdk synth  - error regarding tsconfig target

get ts-config file from other project for safety