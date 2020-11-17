# Deployment instructions
- export your AWS credentials
- ```aws cloudformation create-stack --stack-name graphqlMutationApi --template-body file://template.yaml --region eu-west-1 --capabilities CAPABILITY_NAMED_IAM```