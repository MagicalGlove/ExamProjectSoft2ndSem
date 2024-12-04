# ExamProjectSoft2ndSem
## About this repository
This repository is made as part of our exams for System Integration, Development of  Big Systems and Software Quality.

The repository includes two applications located in the "Project" folder and are a backend and a frontend for a high fidelity food ordering application. 

In the "Documentation" folder you can view any pdf documents, videos and other for each individual exam, as well as the work assignment document.

## How to run the applications
To run the applications locally you will need to have Node.js installed and to be part of your system variables.

If you do not have [Node.js](https://nodejs.org/en/download/prebuilt-installer) installed you can do it by following the link and downloading a prebuilt installer or one of the other options.

With Node.js installed you can navigate to the downloaded GitHub repository folder. 

Select one of the two application folders,`/Project/client` or `/Project/api` , and follow the steps below. Repeat for the other application folder. 

### How to test
Start a command terminal in the folder and write the command `npm install` which should download and install all dependicies for the application.

With the dependicies installed, run `npm run test` or `npm run testCoverage`.

This will then run all the tests in the application. With the command including coverage, it will display the static test coverage including coverage of statements, branches, functions and lines, as well as the coverage for each individual file and lastly it will display the uncovered lines for each file.

### How to start the application locally
Start a command terminal in the folder and write the command `npm install` which should download and install all dependicies for the application if not done already.

With dependicies installed, run `npm run dev`.

You should then see in the terminal which port the application is running on.
The "api" (Backend) runs on port [3001](http://localhost/3001) and "client" (Frontend) runs on port [5173](http://localhost/5173).

To stop the application from the terminal use "Ctrl + C".

## Automation
Navigate the folders to `/.github/workflows` to view any yaml files made for automation of the workflow using GitHub Actions.

"issues.yml" were meant to automate our use of Project on GitHub by automating the creation and closing of issues and branches, but it failed due to GitHub removing the functionality from GitHub and not replacing it with an updated method.

"testBuildDeploy.yml" runs on the "deploy" branch and automaticly tests and transfer the newest version of our applications to a remote droplet and then deploys them.

To acess the remote frontend navigate to [`http://134.122.90.179/`](http://134.122.90.179/).
