  

# Full-Stack REST API Application on AWS

## The Challenge

  

### First Part: Serverless Backend

Build a Serverless Framework REST API with AWS API Gateway which supports CRUD functionality (Create, Read, Update, Delete) *don't use service proxy integration directly to DynamoDB from API Gateway

  

Please use GitHub Actions CI/CD pipeline, AWS CodePipeline, or Serverless Pro CI/CD to handle deployments.

  

You can take screenshots of the CI/CD setup and include them in the README.

  

The CI/CD should trigger a deployment based on a git push to the master branch which goes through and deploys the backend Serverless Framework REST API and any other resources e.g. DynamoDB Table(s).

  

### Second Part: React Frontend

Build a frontend application in React that connects to the serverless backend application. The React application must use all 4 CRUD functionality.

  

The frontend should be visually appealing and utilizes modern web design. Please use widely practiced CSS library instead of using your own custom CSS

  

Application must follow responsive web design for at least 4 different device sizes.

  

Deployment of the React application is up to your choice. Please provide your entry point url of the react application when finished.

  

### Requirements

0. All application code must be written using Javascript. Typescript is acceptable as well. Backend application is written in Node.js and frontend application written in React

  

1. Backend AWS Infrastructure needs to be automated with IAC using [Serverless Framework](https://www.serverless.com)

  

2. The API Gateway REST API should store data in DynamoDB

  

3. There should be 4-5 lambdas that include the following CRUD functionality (Create, Read, Update, Delete) *don't use service proxy integration directly to DynamoDB from API Gateway

  

4. Build the CI/CD pipeline to support multi-stage deployments e.g. dev, prod

  

5. The template should be fully working and documented

  

6. A public GitHub repository must be shared with frequent commits

  

7. A video should be recorded (www.loom.com) of you talking over the application code, IAC, and any additional areas you want to highlight in your solution to demonstrate additional skills

  

Please spend only what you consider a reasonable amount of time for this.

  

## Optionally



Please feel free to include any of the following to show additional experience:



1. Make the project fit a specific business case, instead of a skeleton CRUD request/response.

2. AWS Lambda packaging

3. Organization of YAML files

4. Bash/other scripts to support deployment

5. Unit tests, integration tests, load testing, etc

6. Setup AWS Cognito as part of the backend task and use it for app signup/login. All pages accessible only to authorized users except signup/login

---

# Implementation

## Live Application URLs

- **Frontend Application**: https://task-manager-puneeth.surge.sh/
- **Backend API (Dev)**: https://98z2qivi58.execute-api.us-west-2.amazonaws.com/dev
- **Backend API (Prod)**: https://98z2qivi58.execute-api.us-west-2.amazonaws.com/prod
- **GitHub Repository**: https://github.com/puneeth1501/sample-crud-full-stack-application
- **Demo Video**: https://www.loom.com/share/2cd7d2f4c3b7453098d62027bd0e41e3?sid=be51e6ed-f674-4501-959d-1cd53a9e1e77

## Architecture Overview

This is a full-stack serverless task management application built with:

```
┌─────────────┐     HTTPS      ┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│   React     │───────────────▶│ API Gateway  │────▶│   Lambda    │────▶│  DynamoDB    │
│  (Surge)    │                │  (REST API)  │     │  Functions  │     │    Table     │
└─────────────┘                └──────────────┘     └─────────────┘     └──────────────┘
     │                                                      │
     │                                                      │
     └──────────────────── CORS Enabled ──────────────────┘
```

### Technology Stack

**Backend:**
- AWS Lambda (Node.js 18)
- API Gateway (REST API)
- DynamoDB (NoSQL Database)
- Serverless Framework (Infrastructure as Code)
- AWS SDK v3

**Frontend:**
- React 18
- Bootstrap 5 (CSS Framework)
- Bootstrap Icons
- Axios (HTTP Client)
- Surge.sh (Hosting)

**DevOps:**
- GitHub Actions (CI/CD)
- Multi-stage deployments (dev, prod)

## Project Structure

```
code-challenge-6/
├── backend/
│   ├── src/
│   │   └── handlers/
│   │       ├── createTask.js      # POST /tasks - Create new task
│   │       ├── getTask.js         # GET /tasks/{id} - Get single task
│   │       ├── listTasks.js       # GET /tasks - List all tasks
│   │       ├── updateTask.js      # PUT /tasks/{id} - Update task
│   │       └── deleteTask.js      # DELETE /tasks/{id} - Delete task
│   ├── serverless.yml             # Infrastructure as Code
│   ├── package.json
│   └── .gitignore
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.js        # Create/Edit task form
│   │   │   └── TaskList.js        # Task list display with cards
│   │   ├── services/
│   │   │   └── api.js             # API service layer (Axios)
│   │   ├── App.js                 # Main application component
│   │   ├── App.css                # Responsive styles
│   │   └── index.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
├── .github/
│   └── workflows/
│       └── deploy-all.yml         # CI/CD pipeline (dev + prod)
└── README.md
```

## Requirements Fulfilled

| # | Requirement | Status | Implementation |
|---|-------------|--------|----------------|
| 0 | JavaScript/Node.js + React | ✅ | Backend: Node.js 18, Frontend: React 18 |
| 1 | Serverless Framework IaC | ✅ | `backend/serverless.yml` with all resources |
| 2 | API Gateway + DynamoDB | ✅ | REST API with DynamoDB table |
| 3 | 4-5 Lambda functions (no direct proxy) | ✅ | 5 Lambda functions with business logic |
| 4 | CI/CD multi-stage (dev, prod) | ✅ | GitHub Actions with dev → prod pipeline |
| 5 | Working and documented | ✅ | Fully functional with comprehensive docs |
| 6 | Public GitHub repository | ✅ | Frequent commits with clear history |
| 7 | Loom video walkthrough | ⏳ | [Add link after recording] |

### Backend Implementation Details

**5 Lambda Functions (No Direct Proxy):**
1. **createTask** - Validates input, generates UUID, adds timestamps
2. **getTask** - Retrieves single task by ID
3. **listTasks** - Returns all tasks with count
4. **updateTask** - Validates existence, updates fields, updates timestamp
5. **deleteTask** - Validates existence before deletion

**Key Features:**
- ✅ Full CRUD operations
- ✅ Input validation
- ✅ Error handling with proper HTTP status codes
- ✅ CORS enabled for all endpoints
- ✅ Automatic UUID generation
- ✅ Timestamps (createdAt, updatedAt)
- ✅ DynamoDB Document Client for simplified operations

**Infrastructure:**
- Region: us-west-2
- Runtime: Node.js 18
- Billing: Pay-per-request (DynamoDB)
- IAM: Least privilege principle

### Frontend Implementation Details

**CRUD Operations:**
- **Create**: Click "New Task" → Fill form → Submit
- **Read**: View all tasks in card layout, filter by status
- **Update**: Click "Edit" on any task → Modify → Save
- **Delete**: Click trash icon → Confirm deletion

**Responsive Design (4+ Device Sizes):**
1. **Mobile** (< 768px): Single column, stacked layout
2. **Tablet** (768px - 991px): 2-column grid
3. **Desktop** (992px - 1199px): 3-column grid
4. **Large Desktop** (1200px+): 3-column with max-width

**UI Features:**
- Modern gradient background
- Card-based task display
- Status badges (Pending, In Progress, Completed)
- Filter buttons with task counts
- Loading states
- Error handling with user-friendly messages
- Confirmation dialogs for destructive actions
- Hover effects and animations

## CI/CD Pipeline

### GitHub Actions Workflow

The CI/CD pipeline automatically deploys both backend and frontend on push to master branch.

**Pipeline Flow:**
```
Push to master
    │
    ▼
┌─────────────────────┐
│ Deploy Backend Dev  │ (2-3 minutes)
└──────────┬──────────┘
           │
           ├────────────────────┬──────────────────────┐
           ▼                    ▼                      ▼
┌─────────────────────┐  ┌──────────────────┐  ┌────────────────┐
│ Deploy Backend Prod │  │ Deploy Frontend  │  │ (In Parallel)  │
│  (2-3 minutes)      │  │  to Surge.sh     │  │                │
└─────────────────────┘  └──────────────────┘  └────────────────┘
           │                     │
           └──────────┬──────────┘
                      ▼
              ✅ Deployment Complete
```

**Multi-Stage Deployment:**
- **Dev Environment**: Deployed first for testing
- **Prod Environment**: Deployed after dev succeeds
- **Frontend**: Deployed in parallel with prod

**Screenshot Placeholders:**

![CI/CD Workflow Configuration](./docs/screenshots/01-github-actions-workflow.png)
*Figure 1: GitHub Actions workflow file showing automated deployment pipeline*

![Successful Pipeline Run](./docs/screenshots/02-pipeline-success.png)
*Figure 2: Successful deployment showing all three jobs (Deploy Backend Dev, Deploy Backend Prod, Deploy Frontend)*

![Backend Dev Deployment Logs](./docs/screenshots/03-backend-dev-logs.png)
*Figure 3: Backend deployment to dev environment with Serverless Framework output*

![Backend Prod Deployment Logs](./docs/screenshots/04-backend-prod-logs.png)
*Figure 4: Backend deployment to prod environment*

![Frontend Deployment Logs](./docs/screenshots/05-frontend-surge-logs.png)
*Figure 5: Frontend build and deployment to Surge.sh*

![GitHub Secrets Configuration](./docs/screenshots/06-github-secrets.png)
*Figure 6: GitHub repository secrets for CI/CD (AWS credentials, API URL, Surge token)*

### Required GitHub Secrets

To enable CI/CD, configure these secrets in GitHub repository settings:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `AWS_ACCESS_KEY_ID` | AWS access key for deployments | `AKIA...` |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | `wJalr...` |
| `REACT_APP_API_URL` | Backend API endpoint | `https://...amazonaws.com/dev` |
| `SURGE_TOKEN` | Surge.sh deployment token | `ebe31...` |

## API Documentation

### Base URLs

- **Development**: `https://98z2qivi58.execute-api.us-west-2.amazonaws.com/dev`
- **Production**: `https://98z2qivi58.execute-api.us-west-2.amazonaws.com/prod`

### Endpoints

#### 1. Create Task
```http
POST /tasks
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the code challenge",
  "status": "pending"
}

Response: 201 Created
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Complete project",
  "description": "Finish the code challenge",
  "status": "pending",
  "createdAt": "2025-10-20T10:30:00.000Z",
  "updatedAt": "2025-10-20T10:30:00.000Z"
}
```

#### 2. List All Tasks
```http
GET /tasks

Response: 200 OK
{
  "tasks": [...],
  "count": 5
}
```

#### 3. Get Single Task
```http
GET /tasks/{id}

Response: 200 OK
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Complete project",
  ...
}
```

#### 4. Update Task
```http
PUT /tasks/{id}
Content-Type: application/json

{
  "title": "Updated title",
  "status": "completed"
}

Response: 200 OK
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Updated title",
  "status": "completed",
  "updatedAt": "2025-10-20T11:00:00.000Z"
}
```

#### 5. Delete Task
```http
DELETE /tasks/{id}

Response: 200 OK
{
  "message": "Task deleted successfully"
}
```

### Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

## Setup Instructions

### Prerequisites

- Node.js 18+
- AWS Account with appropriate permissions
- AWS CLI configured
- Serverless Framework CLI (`npm install -g serverless`)
- Surge CLI (`npm install -g surge`)
- Git

### Local Development

#### Backend

```bash
cd backend

# Install dependencies
npm install

# Deploy to dev
serverless deploy --stage dev

# Deploy to prod
serverless deploy --stage prod

# View logs
serverless logs -f createTask --stage dev

# Remove deployment
serverless remove --stage dev
```

#### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=https://your-api-url.amazonaws.com/dev" > .env

# Start development server
npm start

# Build for production
npm run build

# Deploy to Surge
cd build
surge --domain your-domain.surge.sh
```

### AWS Resources Created

When deployed, the following AWS resources are created:

- **Lambda Functions**: 5 functions (create, get, list, update, delete)
- **API Gateway**: REST API with CORS enabled
- **DynamoDB Table**: `task-manager-api-tasks-{stage}`
- **IAM Roles**: Lambda execution roles with DynamoDB permissions
- **CloudWatch Logs**: Log groups for each Lambda function

### Cost Estimation

This application uses AWS Free Tier:
- Lambda: 1M requests/month (free)
- API Gateway: 1M calls/month (free)
- DynamoDB: 25GB storage, 25 read/write units (free)

**Estimated cost**: $0/month for moderate usage

## Testing the Application

### Manual Testing

1. **Open the frontend**: https://task-manager-puneeth.surge.sh/
2. **Create a task**: Click "New Task", fill form, submit
3. **View tasks**: See all tasks displayed in cards
4. **Edit task**: Click "Edit", modify, save
5. **Delete task**: Click trash icon, confirm

### API Testing with curl

```bash
# Set API URL
API_URL="https://98z2qivi58.execute-api.us-west-2.amazonaws.com/dev"

# Create task
curl -X POST $API_URL/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","description":"Testing","status":"pending"}'

# List tasks
curl $API_URL/tasks

# Get specific task
curl $API_URL/tasks/{task-id}

# Update task
curl -X PUT $API_URL/tasks/{task-id} \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated","status":"completed"}'

# Delete task
curl -X DELETE $API_URL/tasks/{task-id}
```

## Implementation Highlights

### Business Case
Implemented as a **Task Management System** instead of generic CRUD:
- Real-world use case for project/team task tracking
- Meaningful field names (title, description, status)
- Status workflow (pending → in-progress → completed)

### AWS Lambda Packaging
- AWS SDK v3 (lighter, modular)
- Proper dependency management
- Handler functions separated by responsibility
- Shared DynamoDB client configuration

### YAML Organization
- Clean, well-structured `serverless.yml`
- Explicit CORS configuration
- Environment variables for flexibility
- IAM roles with least privilege

### Additional Features
- Input validation in Lambda functions
- Proper error handling with meaningful messages
- UUID generation for task IDs
- Automatic timestamps (createdAt, updatedAt)
- CORS headers in all responses

## Troubleshooting

### Common Issues

**CORS Errors:**
- Ensure backend is deployed with updated CORS configuration
- Check browser console for specific error messages

**Frontend not connecting to API:**
- Verify `.env` file has correct `REACT_APP_API_URL`
- Hard refresh browser (Ctrl+Shift+R)
- Check API is accessible: `curl {API_URL}/tasks`

**CI/CD failing:**
- Verify all GitHub secrets are configured
- Check GitHub Actions logs for specific errors
- Ensure AWS credentials have required permissions

## Future Enhancements

- [ ] Add authentication with AWS Cognito
- [ ] Implement task categories/tags
- [ ] Add due dates and reminders
- [ ] Enable task assignment to users
- [ ] Add search and advanced filtering
- [ ] Implement pagination
- [ ] Add unit and integration tests
- [ ] Set up CloudWatch dashboards
- [ ] Add API rate limiting
- [ ] Implement data backup/export

## Repository

**GitHub**: https://github.com/puneeth1501/sample-crud-full-stack-application

Regular commits demonstrate development process and best practices.

## Demo Video

**Loom Video**: https://www.loom.com/share/2cd7d2f4c3b7453098d62027bd0e41e3?sid=be51e6ed-f674-4501-959d-1cd53a9e1e77

The video walkthrough covers:
- Application architecture
- Code structure and organization
- Infrastructure as Code (serverless.yml)
- CI/CD pipeline configuration
- Live demo of CRUD operations
- Responsive design demonstration



