# GitHub Workflow Guidelines for Lund University's `biodiversitydata-se` Project

To create a collaborative and productive environment around working with the codebase, please follow the procedures listed in this document. These procedures are in place to help all contributors be clear of how to work in this repository and to have software quality on the contributed code. 
  
## Collaborative Development Model in Use

For now, the collaborative development model used in this repo is the "Shared repository" model. Details can be found [here](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/getting-started/about-collaborative-development-models).

The release branch is called `main`.

The main integration branch for latest development is called `develop`.

## Basic Principles

1.  **Branching Strategy**: Create branches for all **new changes, features, fixes, and refactoring**. Avoid direct commits to the `develop` and `main` branches.

2.  **Code Reviews**: All changes must undergo code review before merging into the `develop` branch to ensure quality and consistency.

3.  **Continuous Integration**: Ensure that the `main` branch always contains a working version of the application.

## General Workflow Steps:

-  **Pull Before Push:**

-  **Create New Branches for Changes:**

-  **Review and Merge then Push:**
  

## Workflow Rules:

### 1. Creating Branches

- Create a new branch for each change you want to make.

- Branch names should be descriptive and reflect the purpose of the change.

- Preparation work if you have newly cloned the repo and want to track another remote branch than `main` branch:
	- git checkout --track origin/<branch name, e.g. develop> 

- Branch creation commands (in this order):
	- git checkout develop
	- git pull
	- git branch your_new_branch
	- git checkout your_new_branch
  

### 2. Making Changes

- Follow the project's coding standards and guidelines while making modifications (evolving standards are occuring during the development process, so if we're uncertain about how to proceed or if the modification might impact existing standards, we should consult with our team members via Slack).

- Write a descriptive self-explanatory Git commit message 
	- Format: [JIRA issue #]: short  description  of  the  change
	- Example: 57: added colors

- Commit regularly

### 3. Create Pull Request (PR)
- When you ready to submit your changes, start the procedure to create a pull request (PR) to initiate a code review:
	- git push --set-upstream origin [name of your_branch] for the first time you are pushing your new branch to the remote repo. 
		- This will create a connection between your local branch with the branch of the same name on the repo, such that all subsequent commits on your local branch when pushed will update the branch on the remote.
		- Result: in GitHub, under Branches, you should see a new entry for your branch.
	- In GitHub, create a new PR and choose the base branch to be the `develop` branch. This is the branch the changes when approved will be pushed to.

- For every branch, create **only one** PR. 

- When creating PR, write in PR comment:
	- Link to task in Jira;
	- (OPTIONAL) Summarise what has been done + explain design decisions, if relevant

- **IMPORTANT:** Check for merge conflicts - when selecting merging your branch into develop, on the right you can have either
	- green text: **Able to merge.** These branches can be automatically merged.
		- create PR
	- red text:  **Can’t automatically merge.** Don’t worry, you can still create the pull request. - MERGE CONFLICTS 
		- create pull request (without assigning reviewers here) 
		- resolve merge conflicts according to section 4 of this  document
		- the PR contain the latest version now

- After the creation of your PR, check the "Files changes" tab in the PR. Do you recognize the changes, are there only changes that you know you did for the PRs? Or are there any additional changes which you do not recognize? If so, something went wrong, ask the team about the Slack about it.

- Select team members (2 of the 3 developers for now: Khosiyat, Yuliia, Zuzana) for the PR.

### 4. Merge conflicts
- Merge conflicts need to be resolved on your local version on the branch you are merging. Commands: 
	- git checkout develop
	- git pull
	- git checkout your_branch
	- git merge develop

- In this stage, you will have merge conflicts visible. It is up to you ho to resolve it, but keep in mind, you probably do not want to overwrite changes made by someone else on the develop branch, as these changes were already approved. **If in any doubt, ask the team on the Slack**.

- Commit and push your changes after resolving

- **IF** any problems occur during merge and you are unsure, ask the team on the Slack. Command to abort the merge:
	- git merge --abort
  

### 3. Code Reviews 
- **As a reviewer**
	- Check the changed files
	- (OPTIONAL) Run the code on your local machine
	- If something is not clear, leave a comment in the PR, preferably on the line that is not clear
	- **Approve** only if you have no comments to for clarification/changing
	- Check the contribution guidelines in this document have been followed. Flag to the PR submitter if otherwise.
- **As a PR creator**
	- Answer comments and questions
	- Fix the changes according to comments
	- You do not have to create new PR or branch for fixing the code. Every subsequent new commit to the same branch and push to the remote is automatically updated in the PR.
  

### 5. Merging Changes

- After approval, merge the changes into the develop branch.

- Delete the branch from the repository (can be done with one button after approving the merge)

- Ensure that the `develop` branch remains stable and functional at all times.

- **Avoid pushing directly to the `develop branch`.**

  

### 6. Pull Changes to Update Your Local Repo 

- Before making any new changes, pull the latest changes from the `develop` branch to stay up-to-date:
	- git pull

- Resolve any merge conflicts locally before proceeding.
	- **However** there should not be any at this stage, please ask the team on Slack in this case. 

- To update the list of remote branches on your local machine, e.g. past feature branches you created have been deleted due to closed PRs, run:
	- git remote update origin --prune
	- git branch –all to see all local and remote branches locally.
		- Result: a list of remotes/origin/[branch name] should show on the output list.

### 7. **Documentation:**

- Document any significant changes, including reasons for modifications, at the appropriate location.
	- What is considered appropriate location? 
		- It depends on the content. Discuss with your fellow reviewers to determine the location.
		- Place documentation at a location where the reader will most likely look when they need the explanation.
	- If it's related to explaining the code, e.g. some cryptic variable or logic, the most appropriate place would be with the code snippet or source code file where the code snippet is found.
	- If it's a "big picture" explanation about the software design, consider placing it in a separate design-docs folder.
