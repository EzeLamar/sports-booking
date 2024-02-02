Working with git
----------------

Branch name template: `<task_type>/SB-<card_number>-<branch_description>`

Task types:
*   task
*   bugfix

It is important to start the `branch_description` with a capital letter.

Examples: 
* `task/SB-12-Add-Navbar-component`
* `bugfix/SB-14-Wrong-text-color`

No merge commits should be pushed to the repository. If merge with master
commits happened in the branch, please make a git rebase -i master while
on your branch and remove all merge commits before the push.

Precommit Hooks
----------------------

1. You can use this snippet to automatically check code styles:

```bash
npm run lint
```

2. TODO: Add Prettier checks.

Commits
----------------------
Commit description template: `SB-<card_number>: <commit_description>`

Keep the description of the commits short and concise with no more than 65 symbols.

Push/Pull Proccess
-------------
To avoid the generation of merge commits we use rebase instead of merge as follows:

```bash
git fetch origin master
git checkout <branch-to-push>
git rebase -i origin/master
//resolve the conflicts
```

Amend commit without modify its description:
```bash
git commit --amend --no-edit
```

Create and link local branch to repository:

```bash
git push -u origin HEAD
```

Update remote branch previously linked:
```bash
git push --force-with-lease
```
			

Submitting PR
-------------

Before you'll be able to merge it to master you have to receive at least `one approval`. Sometimes you want to get feedback on very early stage of implementation which can not actually be merged to master. To distinguish different types of PRs we use the next labels:
 - `WIP`: when you think the changes are not ready to be merged to master. In that case reviewers should not approve it, only leave comments to discuss the changes.
 - `Ready for Code Review`: whenever you think that it can be merged to master. In that case once the PR got approval it can be merged to master anytime.

PRs without any label are considered as `WIP`
