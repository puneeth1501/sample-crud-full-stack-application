# GitHub Secrets Setup Guide

This guide shows you how to set up all the secrets needed for automated CI/CD deployment.

## 🔐 Secrets You Need to Add

Go to your GitHub repository:
**https://github.com/puneeth1501/sample-crud-full-stack-application/settings/secrets/actions**

You need to add **5 secrets** total:

---

## 1. AWS_ACCESS_KEY_ID

**What**: Your AWS access key for deploying the backend

**How to get it**:
- You should already have this from when you ran `aws configure`
- To view it: `cat ~/.aws/credentials`
- Look for: `aws_access_key_id = AKIA...`

**In GitHub**:
- Click "New repository secret"
- Name: `AWS_ACCESS_KEY_ID`
- Value: Paste your access key (starts with `AKIA`)
- Click "Add secret"

---

## 2. AWS_SECRET_ACCESS_KEY

**What**: Your AWS secret key for deploying the backend

**How to get it**:
- Same as above: `cat ~/.aws/credentials`
- Look for: `aws_secret_access_key = ...`

**In GitHub**:
- Click "New repository secret"
- Name: `AWS_SECRET_ACCESS_KEY`
- Value: Paste your secret key
- Click "Add secret"

---

## 3. REACT_APP_API_URL

**What**: Your backend API Gateway URL (so frontend knows where to connect)

**How to get it**:
```bash
# Deploy backend first if you haven't
cd backend
npm install
serverless deploy --stage dev

# Copy the base URL from the output
# Example: https://abc123xyz.execute-api.us-east-1.amazonaws.com/dev
```

**In GitHub**:
- Click "New repository secret"
- Name: `REACT_APP_API_URL`
- Value: `https://YOUR_API_URL/dev` (replace with your actual URL)
- Click "Add secret"

**Example value**:
```
https://abc123xyz.execute-api.us-east-1.amazonaws.com/dev
```

---

## 4. VERCEL_TOKEN

**What**: Token that allows GitHub to deploy to your Vercel account

**How to get it**:

### Step-by-step:

1. **Go to Vercel tokens page**: https://vercel.com/account/tokens

2. **Click "Create Token"** button

3. **Fill in the form**:
   - Token Name: `GitHub Actions CI/CD`
   - Scope: Select your account (or team)
   - Expiration: Never (or set a date)

4. **Click "Create Token"**

5. **Copy the token** (it looks like: `vercel_abc123...`)
   - ⚠️ **IMPORTANT**: You'll only see this once! Copy it now!

**In GitHub**:
- Click "New repository secret"
- Name: `VERCEL_TOKEN`
- Value: Paste your Vercel token
- Click "Add secret"

---

## 5. VERCEL_ORG_ID

**What**: Your Vercel organization/account ID

**How to get it**:

### Method 1: From Vercel CLI (Easiest)

```bash
# Navigate to frontend folder
cd /Users/puneethchowdary/Desktop/project/code-challenges/code-challenge-6/frontend

# Link your project to Vercel
vercel link

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - What's your project's name? task-manager-frontend
# - In which directory is your code located? ./ (press Enter)

# After linking, check the file:
cat .vercel/project.json
```

You'll see something like:
```json
{
  "orgId": "team_abc123xyz",
  "projectId": "prj_def456uvw"
}
```

Copy the `orgId` value.

### Method 2: From Vercel Dashboard

1. Go to: https://vercel.com/account
2. Look at the URL, it will be something like:
   - `https://vercel.com/puneeth1501` → Your username is `puneeth1501`
3. Or check your team settings for the team ID

**In GitHub**:
- Click "New repository secret"
- Name: `VERCEL_ORG_ID`
- Value: Paste your org ID (from `project.json` or dashboard)
- Click "Add secret"

---

## 6. VERCEL_PROJECT_ID

**What**: Your Vercel project ID

**How to get it**:

Same as above - after running `vercel link`:

```bash
cat frontend/.vercel/project.json
```

Copy the `projectId` value.

**In GitHub**:
- Click "New repository secret"
- Name: `VERCEL_PROJECT_ID`
- Value: Paste your project ID
- Click "Add secret"

---

## ✅ Verification Checklist

After adding all secrets, verify you have all 5:

Go to: https://github.com/puneeth1501/sample-crud-full-stack-application/settings/secrets/actions

You should see:
- ✅ `AWS_ACCESS_KEY_ID`
- ✅ `AWS_SECRET_ACCESS_KEY`
- ✅ `REACT_APP_API_URL`
- ✅ `VERCEL_TOKEN`
- ✅ `VERCEL_ORG_ID`
- ✅ `VERCEL_PROJECT_ID`

---

## 🚀 Testing the CI/CD Pipeline

Once all secrets are added:

```bash
# Make a small change
cd /Users/puneethchowdary/Desktop/project/code-challenges/code-challenge-6

# Commit and push
git add .
git commit -m "Test combined CI/CD pipeline"
git push origin master
```

Then watch it work:
**https://github.com/puneeth1501/sample-crud-full-stack-application/actions**

You should see:
1. 🟡 "Deploy Full Stack Application" workflow starts
2. 🔵 "Deploy Backend to Dev" runs first
3. 🔵 "Deploy Backend to Prod" runs after dev succeeds
4. 🔵 "Deploy Frontend to Vercel" runs in parallel with prod
5. 🟢 All jobs complete successfully!

---

## 🎯 Quick Reference

| Secret Name | Where to Get It | Example Value |
|-------------|----------------|---------------|
| `AWS_ACCESS_KEY_ID` | `~/.aws/credentials` | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | `~/.aws/credentials` | `wJalrXUtnFEMI/K7MDENG...` |
| `REACT_APP_API_URL` | `serverless deploy` output | `https://xyz.execute-api.us-east-1.amazonaws.com/dev` |
| `VERCEL_TOKEN` | https://vercel.com/account/tokens | `vercel_abc123...` |
| `VERCEL_ORG_ID` | `vercel link` → `.vercel/project.json` | `team_abc123xyz` |
| `VERCEL_PROJECT_ID` | `vercel link` → `.vercel/project.json` | `prj_def456uvw` |

---

## 🆘 Troubleshooting

### Can't find AWS credentials
```bash
cat ~/.aws/credentials
```

### Need to regenerate AWS keys
1. Go to AWS IAM Console
2. Find your user
3. Security credentials tab
4. Create new access key

### Vercel link fails
```bash
# Make sure you're logged in
vercel login

# Try linking again
cd frontend
vercel link
```

### GitHub Actions failing
1. Check that all 6 secrets exist
2. Check for typos in secret names (they're case-sensitive!)
3. View the workflow logs for specific errors
4. Make sure AWS credentials have correct permissions

---

## 📝 Order of Operations

Follow this order to avoid errors:

1. ✅ Add AWS secrets to GitHub
2. ✅ Deploy backend manually once to get API URL
3. ✅ Add `REACT_APP_API_URL` secret to GitHub
4. ✅ Run `vercel login` locally
5. ✅ Run `vercel link` in frontend folder
6. ✅ Get Vercel token from dashboard
7. ✅ Add all 3 Vercel secrets to GitHub
8. ✅ Push code and watch CI/CD work!

---

**Next**: After setting up secrets, refer to SETUP_GUIDE.md for deployment instructions.
