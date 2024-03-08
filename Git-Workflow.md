# GitHub Workflow Guidelines for Lund University's `biodiversitydata-se` Project

To minimize conflicts among us (developers) in terms of maintaining a clean and organized codebase and to ensure a smooth and efficient code review process we've established the following guidelines.
  

## Basic Principles

1.  **Branching Strategy**: Use branches for all **new changes, features, fixes, and refactoring**. Avoid direct commits to the `develop` branch (We agreed not to commit directly to the main or develop branch).

2.  **Code Reviews**: All changes must undergo code review before merging into the `develop` branch to ensure quality and consistency.

3.  **Continuous Integration**: Ensure that the `main` branch always contains a working version of the application.

## General Workflow Steps:

  

-  **Pull Before Push:**

-  **Create New Branches for Changes:**

-  **Review and Merge then Push:**
  

## Workflow Rules:

### 1. Creating Branches

- We (every developer) should create a new branch for each change we want to make.

- Branch names should be descriptive and reflect the purpose of the change.

- Branch creation commands (in this order):
	- git checkout develop
	- git pull
	- git branch your_new_branch
	- git checkout your_new_branch
  

### 2. Making Changes

- We (developers) work on our respective branches, making changes and improvements.

- Follow the project's coding standards and guidelines while making modifications (evolving standards are occuring during the development process, so if we're uncertain about how to proceed or if the modification might impact existing standards, we should consult with our team members via Slack).

- Write descriptive self-explanatory Git commit message 
	- Format: [JIRA issue #]: short  description  of  the  change
	- Example: 57: added colors

- Commit regularly

### 3. Create Pull Request (PR)
- Once changes are ready, initiate a PR for review (to facilitate code reviews, do not push directly to the develop branch. Instead, push changes to feature branches.)

- Generally, for every branch you need to create **only one** PR. 

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

- once resolved - commit and push your changes

- **IF** any problems occur during merge and you are unsure, ask the team on the Slack. Command to abort the merge:
	- git merge --abort
  

### 3. Code Reviews 
- **As a reviewer**
	- Check the changed files
	- (OPTIONAL) Run the code on your local machine
	- If something is not clear, leave a comment in the PR, preferably on the line that is not clear
	- **Approve** only if you have no comments to for clarification/changing
- **As a PR creator**
	- Answer comments and questions
	- Fix the changes according to comments
	- You do not have to create new PR or branch for fixing the code, every push is automatically updated in the PR
  

### 5. Merging Changes

- After approval, merge the changes into the develop branch.

- Delete the branch from the repository (can be done with one button after approving the merge)

- Ensure that the `develop` branch remains stable and functional at all times.

- **Avoid pushing directly to the `develop branch`.**

  

### 6. Pulling Changes

- Before making any new changes, pull the latest changes from the `develop` branch to stay up-to-date.

- Resolve any merge conflicts locally before proceeding.
	- **However** there should not be any at this stage, please ask the team on Slack in this case. 

  

### 7. **Documentation:**

- Document any significant changes (at least leave comments on Slack), including reasons for modifications, to ensure transparency and clarity for all team members.