<!--
date=2024-10-13
topic=Focus
summary=Post is about outlining how a terminal can be used effectively.
-->

# Supercharing Your Shell

For years, zsh as my prefered shell has been a faithful companion in my daily development. It's irreplacable for navigating through directories, creating and changing file as well as carrying out more and more advanced tasks utilizing various cli tools. Some of which offer rather counter intuive commands or follow conventions that are simple hard to remember.

I resorted to either Google the same commands over and over again or creating cheatsheets in Notion or OneNote. Yet, leaving the terminal just to look up some obscure command is not really efficient. Yet, recently I have found an approach that has vastly improved some of my workflows and may save you a lot of time as well. The basic idea is to save basically all commonly used commands from various CLIs into simple text files, reading those file via fzf (fuzzy finder) and upon selecting a command to execute it. Sounds rather trivial on surface but can bring us astonishingly if used correctly. Let's jump into it.

## Getting Started

**Step 1:** Install the fuzzy finder [fzf](https://github.com/junegunn/fzf)

```TS
brew install fzf
```

**Step 2:** Validate whether fzf is working as expected by running something like in zsh:

```TS
cd $(find . -maxdepth 3 -d | fzf)
```

By combining cd, find and fzf, we can simply jump into a directory by taking advantage of fzf's fuzzy finding algorithm.

![fzf](assets/posts/engineering/embracing-the-terminal/fzf.png)



Stating the obvious, we could just take our zsh history, pipe all previously executed commands to the fuzzy finder fzf and execute the selected command. Something like the line below certainly does the trick.

```TS
alias dd='eval $(cat ~/.zsh_history | fzf)'
```

However, the zsh history can become a very messy place rather quickly and adds a bit of mental load I prefer to avoid. I still like to keep one or two needly curated lists of commands I use frequently. Here is what I did:

```TS
brew install bat
brew install fzf
```

Afterwards, I added a new directory to host lists of used commands and later also for frequently accessed web pages. It is astonishing how much time can be saved by jumping from the Terminal to the desired page straight away instead of opening a browser and select a bookmark.

```TS
mkdir -p ~/Developer/tools/terminal-setup/lists
cd ~/Developer/tools/terminal-setup/lists
touch commands.txt
touch web-pages.txt
```

Next, I've adjusted my zshrc file to add a few handy functions.

```TS
vim ~/.zshrc
```

For the longest time I was moving through my directories using the `cd` command. However, just pressing `f` to find a directory leveraging fzf has saved me quite a bit of time (see implementation below). The same holds true for my custom `ff` command, that looks for a file using fzf, gives a preview of the respective file and opens the file in vim.

Yet, pressing `jj` to list and executing frequently used commands has turned out to be huge! The command saves so much time right away as it allows me to type less, make careless errors and frees up mental capacity to better spend elswhere.

```TS
# Searches and opens a directory
open_dir() {
   local DIRECTORY=$(find . -type d ! -path '*/.git/*' ! -path '*/google-cloud-sdk/*' ! -path '*/venv/*' ! -path '*/node_modules/*' ! -path '*/.angular/*' | fzf)
   [[ -n "$DIRECTORY" ]] && cd "$DIRECTORY"
}
alias f=open_dir

# Opening a file with vim
open_local_file() {
  local FILE=$(find . ! -type d ! -path '*/.angular/*' ! -path '*/node_modules/*' ! -path '*/venv/*' ! -path '*/.git/*' | fzf --preview='bat --color=always {}') 
  [ -n "$FILE" ] && vim "$FILE"
}
alias ff=open_local_file

alias dd='eval $(cat ~/.zsh_history | fzf)'
alias jj='eval $(cat ~/Developer/tools/terminal-setup/lists/commands.txt | fzf)'
alias ll='eval $(cat ~/Developer/tools/terminal-setup/lists/web-pages.txt | fzf)'
```

Finally, I've sourced the updated ~/.zshrc file so the functions get available in the current session.

```TS
source ~/.zshrc
```

Feel free to take a look at my complete setup in the follow repository:

[Github Repo](https://github.com/Jan20/terminal-setup)

I'm still flabbergasted by how much time can be saved by leaving the Terminal less often and just having to type a couple of letters and letting fzf do the heavy lifting. I hope this post has been helpful for you!
