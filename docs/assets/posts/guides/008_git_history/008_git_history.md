<!--
date=2022-06-20
topic=Git
-->
<img class='full' src='assets/posts/guides/008_git_history/thumbnail.png'>

# Git History

Let's assume you are building your own application on the codebase of a repository and are interesting in keeping the Git history of the repository you built upon in tact. Futher, assuming that you have already created your own repostiory, you seek for a way to copy the entire Git hostory of the source directory into yours. Here is how it is done:

### Step 1: Clone respository you want to build your application upon:

```TS
git clone --bare https://github.com/source-repository.git
```

### Step 2: Jump inside the cloned repository:

```TS
cd source-repository.git
```

### Step 3: Push the existing codebase to your own repository.

There are two options to essential reacha very similar goal. With the <code>--mirror</code> flag, all <code>refs</code> such as <code>refs/heads</code> will be mirrored to your own repository, which overrides all existing branches. Assuming you had a <code>master</code> branch in your own directory, while the repository you want to build upon posses a <code>main</code> branch, instead of a <code>master</code> branch, you would remove your existing master branch and ended up by only having a main branch in your own diretory. By using the --all flag, you may push all branches, defined under <code>refs/heads</code>. Depending on your organisation's setup, --mirror might be discouraged, as mirroring a repository may lead to the deletion of your master branch, if not existing in the repository.

```TS
git push --mirror https://github.com/<user_name>/target-repository.git
or
git push --all https://github.com/<user_name>/target-repository.git
```

### Step 4 (Optional): Finally, jump into your own directory:

```TS
git clone --mirror https://github.com/<user_name>/target-repository.git
cd load-test
git log
```
