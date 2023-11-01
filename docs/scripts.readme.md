# emojiTracker BE Scripts

### Deployment Scripts (Lambda)
```sh
# Deploy to dev
npm run deploy-dev-product # deploy api
npm run deploy-dev-scripts # deploy scripts
```

```sh
# Deploy to prod
npm run deploy-prod-product # deploy api
npm run deploy-prod-scripts # deploy scripts
```

### Execution Scripts
```sh
#Start Server
npm run start-server
```

---

### Code Generation Script
```sh
# Generate .env
npm run generate-env {profile} # [test,dev,prod]
```

```sh
# Update .env (Currently, it updates version info)
npm run generate-ctrl-ctx {profile} # [test,dev,prod]
```

```sh
# Build IAM Sql
npm run build-iam-sql
```

```sh
# Build Routes
npm run build-routes
```

---

### Testing Related Scripts

```sh
# Setup Docker
npm run setup-docker
```

```sh
# Generate emoji-tracker Test Token
npx ts-node devops/scripts/iam-handler/generate-emoji-tracker-test-token.ts
```

```sh
# Deploy Lambda Locally
npm run lambda-deploy-local
```