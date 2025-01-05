# ExamProjectSoft2ndSem
## About this repository
This repository is made as part of our exams for System Integration, Development of  Big Systems and Software Quality.

The repository includes two applications located in the "Project" folder and are a backend and a frontend for a high fidelity prototype of a food ordering application. 

In the "Documentation" folder you can view any pdf documents, videos and other for each individual exam, as well as the work assignment document.

## How to run the applications
To run the applications locally you will need to have Node.js installed and to be part of your system variables.

If you do not have [Node.js](https://nodejs.org/en/download/prebuilt-installer) installed you can do it by following the link and downloading a prebuilt installer or one of the other options.

With Node.js installed you can navigate to the downloaded GitHub repository folder. 

Select one of the two application folders,`/Project/client` or `/Project/api` , and follow the steps below. Repeat for the other application folder. 


Start a command terminal in the folder and write the command `npm install` which should download and install all dependicies for the application.

With the dependicies installed, run `npm run test` or `npm run testCoverage`.

This will then run all the tests in the application. With the command including coverage, it will display the static test coverage including coverage of statements, branches, functions and lines, as well as the coverage for each individual file and lastly it will display the uncovered lines for each file.

## How to start the application locally
Start a command terminal and then in the both the client folder and api folder write the command `npm install` which should download and install all dependicies for the application if not done already.

With dependicies installed return to the Project folder and run `setupKubePods.bat`

The "api" (Backend) runs on port [3001](http://localhost/3001).

The "client" (Frontend) runs on port [5173](http://localhost/5173).

Grafana runs on port [3000](http://localhost:3000).

Prometheus runs on port [9090](http://localhost:9090).

If any of the links fail to connect you may need to check that the ports aren't already in use. Kubernetes/Docker has been known to keep ports when containers/pods have been stopped/removed/deleted even after restarting your computer. 

The commands
`netstat -ano | findstr :<yourPortNumber>`
and
`taskkill /PID <typeyourPIDhere> /F`
can help in killing applications running on a port.

After clearing the ports try restarting docker, as the application killed may have been docker itself, and/or the containers/pods.

### Logins

When using the application, either remotly or locally, you will need to login. We have not included a way to create new users and so you will need to make use of one of the already existing ones.

| Role | Username | Password |
| :--- | :----: | ---: |
| Customer | Abejægeren | test123 |
| Customer | user | test123 |
| Admin | admin | test123 |
| Restaurant | MarioPizzaMaker | test123 |
| Delivery | bestdriver | test123 |

## Automation
Navigate the folders to `/.github/workflows` to view any yaml files made for automation of the workflow using GitHub Actions.

"issues.yml" were meant to automate our use of Project on GitHub by automating the creation and closing of issues and branches, but it failed due to GitHub removing the functionality from GitHub and not replacing it with an updated method.

"testBuildDeploy.yml" runs on the "deploy" branch and automaticly tests and transfer the newest version of our applications to a remote droplet and then deploys them.

!NO LONGER WORKS!
To acess the remote frontend navigate to `http://134.122.90.179/`.
