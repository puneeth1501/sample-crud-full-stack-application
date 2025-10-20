# CI/CD Pipeline Flow

## 🔄 How the Combined CI/CD Works

```
┌─────────────────────────────────────────────────────────────┐
│                    Developer Pushes Code                     │
│                  git push origin master                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   GitHub Actions Triggered                   │
│              "Deploy Full Stack Application"                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
        ┌────────────────┴────────────────┐
        │                                  │
        ▼                                  ▼
┌──────────────────┐              ┌──────────────────┐
│   Job 1: START   │              │                  │
│  Backend to Dev  │              │  (Jobs 2 & 3    │
│                  │              │   wait for       │
│  • Install deps  │              │   Job 1)         │
│  • AWS auth      │              │                  │
│  • Deploy Lambda │              │                  │
│  • Deploy API GW │              │                  │
│  • Deploy DDB    │              │                  │
└────────┬─────────┘              └──────────────────┘
         │
         ▼
    ✅ Dev Deployed
         │
         ├──────────────────┬─────────────────────┐
         │                  │                     │
         ▼                  ▼                     ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   Job 2:         │ │   Job 3:         │ │                  │
│  Backend to Prod │ │  Frontend Deploy │ │  (Run in         │
│                  │ │                  │ │   parallel)      │
│  • Install deps  │ │  • Install deps  │ │                  │
│  • AWS auth      │ │  • Build React   │ │                  │
│  • Deploy Lambda │ │  • Deploy Vercel │ │                  │
│  • Deploy API GW │ │                  │ │                  │
│  • Deploy DDB    │ │                  │ │                  │
└────────┬─────────┘ └────────┬─────────┘ └──────────────────┘
         │                    │
         ▼                    ▼
    ✅ Prod Deployed     ✅ Frontend Live
         │                    │
         └──────────┬─────────┘
                    ▼
        ┌───────────────────────┐
        │  🎉 ALL DEPLOYMENTS   │
        │      COMPLETE!        │
        └───────────────────────┘
```

## 📊 Job Dependencies

```
Job 1 (Backend Dev)
    │
    ├─→ Job 2 (Backend Prod)  ← Must wait for Job 1
    │
    └─→ Job 3 (Frontend)      ← Must wait for Job 1

Note: Jobs 2 and 3 run in PARALLEL after Job 1 completes
```

## ⏱️ Timing Estimate

| Job | Duration | Description |
|-----|----------|-------------|
| **Job 1: Backend Dev** | ~2-3 mins | Deploy Lambda + API Gateway + DynamoDB to dev |
| **Job 2: Backend Prod** | ~2-3 mins | Deploy Lambda + API Gateway + DynamoDB to prod |
| **Job 3: Frontend** | ~1-2 mins | Build React + Deploy to Vercel |

**Total Pipeline Time**: ~4-5 minutes (Jobs 2 & 3 run in parallel)

## 🔐 Secrets Used

| Job | Secrets Required |
|-----|------------------|
| **Backend Dev** | `AWS_ACCESS_KEY_ID`<br>`AWS_SECRET_ACCESS_KEY` |
| **Backend Prod** | `AWS_ACCESS_KEY_ID`<br>`AWS_SECRET_ACCESS_KEY` |
| **Frontend** | `REACT_APP_API_URL`<br>`VERCEL_TOKEN`<br>`VERCEL_ORG_ID`<br>`VERCEL_PROJECT_ID` |

## 🎯 What Gets Deployed

### Backend Deployment (Dev & Prod)
```
AWS Resources Created:
├── Lambda Functions (5)
│   ├── task-manager-api-{stage}-createTask
│   ├── task-manager-api-{stage}-getTask
│   ├── task-manager-api-{stage}-listTasks
│   ├── task-manager-api-{stage}-updateTask
│   └── task-manager-api-{stage}-deleteTask
├── API Gateway
│   └── REST API with 5 endpoints + CORS
├── DynamoDB Table
│   └── task-manager-api-tasks-{stage}
├── IAM Roles
│   └── Lambda execution roles
└── CloudWatch Logs
    └── Log groups for each function
```

### Frontend Deployment
```
Vercel Deployment:
├── Build React app (optimized production build)
├── Deploy to Vercel CDN
├── Environment variables injected
│   └── REACT_APP_API_URL
└── Live URL generated
    └── https://task-manager-frontend.vercel.app
```

## 🔄 When Does CI/CD Trigger?

The pipeline triggers on:
```yaml
on:
  push:
    branches:
      - master
```

**Meaning**: Every time you push to the `master` branch, the entire pipeline runs.

### Example:
```bash
# You make changes
git add .
git commit -m "Add new feature"
git push origin master    # ← This triggers the pipeline!
```

## 🎬 Step-by-Step Execution

### 1. Code Push
```bash
Developer: git push origin master
```

### 2. GitHub Actions Starts
```
GitHub: "Deploy Full Stack Application" workflow detected
Starting 3 jobs...
```

### 3. Job 1 Executes (Backend Dev)
```
✓ Checkout code
✓ Setup Node.js 18
✓ Install dependencies (npm install)
✓ Configure AWS credentials (using secrets)
✓ Run: npm run deploy:dev
  → Serverless Framework packages Lambda functions
  → Creates CloudFormation stack
  → Deploys to AWS
✓ Deployment complete!
```

### 4. Jobs 2 & 3 Execute in Parallel

**Job 2 (Backend Prod):**
```
✓ Same steps as Job 1
✓ But deploys to prod stage
✓ Different stack name
```

**Job 3 (Frontend):**
```
✓ Checkout code
✓ Setup Node.js 18
✓ Install dependencies
✓ Build React app (npm run build)
  → Uses REACT_APP_API_URL from secrets
  → Creates optimized production bundle
✓ Deploy to Vercel
  → Uses VERCEL_TOKEN for auth
  → Uses ORG_ID and PROJECT_ID
  → Uploads build to Vercel CDN
✓ Deployment complete!
```

### 5. All Done!
```
✅ Backend Dev deployed to AWS
✅ Backend Prod deployed to AWS
✅ Frontend deployed to Vercel
🎉 Pipeline successful!
```

## 📱 Viewing Pipeline Progress

Go to GitHub Actions:
```
https://github.com/puneeth1501/sample-crud-full-stack-application/actions
```

You'll see:
- **Workflow runs** - List of all pipeline executions
- **Click on a run** - See all 3 jobs
- **Click on a job** - See detailed logs for each step
- **Green checkmarks** ✅ - Successful steps
- **Red X** ❌ - Failed steps (click to see error)

## 🚨 What If Something Fails?

### If Job 1 Fails (Backend Dev)
```
❌ Job 1: Backend Dev - FAILED
⏸️ Job 2: Backend Prod - SKIPPED (depends on Job 1)
⏸️ Job 3: Frontend - SKIPPED (depends on Job 1)
```
**Fix the issue, then push again to retry.**

### If Job 2 Fails (Backend Prod)
```
✅ Job 1: Backend Dev - SUCCESS
❌ Job 2: Backend Prod - FAILED
✅ Job 3: Frontend - SUCCESS (still runs!)
```
**Dev and Frontend are deployed, only Prod failed.**

### If Job 3 Fails (Frontend)
```
✅ Job 1: Backend Dev - SUCCESS
✅ Job 2: Backend Prod - SUCCESS
❌ Job 3: Frontend - FAILED
```
**Backend is deployed, only Frontend failed.**

## 🎯 Best Practices

### 1. Always Check Logs
```
GitHub Actions → Click workflow → Click failed job → Read error
```

### 2. Test Locally First
```bash
# Backend
cd backend
npm run deploy:dev

# Frontend
cd frontend
npm run build
vercel --prod
```

### 3. Commit Messages
```bash
# Good commit messages help track what changed
git commit -m "feat: Add task filtering feature"
git commit -m "fix: Resolve API connection issue"
git commit -m "docs: Update README"
```

### 4. Monitor AWS Costs
```
Check AWS CloudWatch and billing dashboard regularly
This app should stay in free tier with moderate use
```

## 🎓 Understanding the Workflow File

The workflow is defined in:
```
.github/workflows/deploy-all.yml
```

Key sections:
```yaml
name: Deploy Full Stack Application  # Workflow name

on:
  push:
    branches:
      - master                        # When to trigger

jobs:                                 # What to do
  deploy-backend-dev:                # Job 1
    needs: []                         # No dependencies

  deploy-backend-prod:               # Job 2
    needs: deploy-backend-dev        # Wait for Job 1

  deploy-frontend:                   # Job 3
    needs: deploy-backend-dev        # Wait for Job 1
```

## 📚 Resources

- **GitHub Actions Docs**: https://docs.github.com/actions
- **Serverless Framework Docs**: https://www.serverless.com/framework/docs
- **Vercel Docs**: https://vercel.com/docs
- **AWS Lambda Docs**: https://docs.aws.amazon.com/lambda/

---

**Next**: Follow GITHUB_SECRETS_SETUP.md to configure all required secrets!
