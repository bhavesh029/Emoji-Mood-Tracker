PROFILE=$1
MODULE=$2
rm .env
npm run generate-env $1
npx ts-node devops/scripts/ci-cd/deployment/lambda-deployment/setup-lambda-files.ts $MODULE 
npx sls deploy
rm .env