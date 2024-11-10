<!--
date=2024-10-13
topic=Focus
summary=Post is about outlining how a terminal can be used effectively.
-->

# Efficient Terminal Setup

For years, zsh has been my preferred shell and a faithful companion in my daily development work. It’s irreplaceable for navigating directories, editing files, and performing more advanced tasks like interacting with Kubernetes clusters or cloud environments using various CLI tools—some of which have rather counterintuitive commands, follow conventions that are hard to remember, or produce outputs I often want to transform or use as inputs for other operations.

I used to rely on either Googling the same commands repeatedly or creating cheatsheets in Notion and OneNote. However, leaving the terminal just to look up an obscure command proved to be inefficient. So, why leave the terminal in the first place? Couldn’t we just save commands that are hard to remember in a text file, search through its content, and execute the command we want?

It turns out this is trivial to set up, highly efficient, and fun to use. Let’s jump into it.

## Getting Started

**Step 1:** Install our only external dependency we need which is [fzf](https://github.com/junegunn/fzf). Fzf is a simple fuzzy finder that takes list-like inputs and allows us to quickly select an item from the list.

```TS
brew install fzf
```

**Step 2:** Validate whether fzf is working as expected by running something like in zsh:

```TS
cd $(find . -maxdepth 3 -d | fzf)
```

Here we pipe the output of the find command to fzf, so taht we can simply select a directory to navigate to and call the cd command to jump to the selected directory. 

![fzf](assets/posts/engineering/efficient-terminal-setup/fzf.png)

**Step 3:** Create a command.txt file to create alias' for requently used commands. 

```TS
mkdir -p ~/Developer/tools/terminal-setup/dot-files && touch ~/Developer/tools/terminal-setup/dot-files/commands
```

**Step 4:** Let's bind our cd $(find . -maxdepth 3 -d | fzf) command to an alias and add it to the commands file. 

```TS
echo '"alias f=cd $(find . -maxdepth 3 -d | fzf)"' >> ~/Developer/tools/terminal-setup/dot-files/commands
```

**Step 5:** Add the newly reated commands.txt file in the ~/.zshrc file and source it.

```TS
echo "source $HOME/Developer/tools/terminal-setup/dot-files/commands" >> ~/.zshrc && source ~/.zshrc
```

**Step 6:** Verify that the commands.txt file got sourced as expected by pressting the `f` key. We should be able to jump to a desired directory.

![Directory Selection](assets/posts/engineering/efficient-terminal-setup/fzf_directoy_selection.png)

## Defining Command Lists 

Now, let’s revisit our initial question of how to make it as easy as possible to quickly find and execute complex commands. A straightforward solution is to create a new directory for storing command lists. Assuming we want a convenient way to save and recall Docker-related commands, we could take the following steps:

**Step 1:** Create a new directory for storing command lists and create an empty docker.txt file in it: 

```TS
mkdir -p ~/Developer/tools/terminal-setup/lists && touch ~/Developer/tools/terminal-setup/lists/docker.txt
```

**Step 2:** Let's add open the newly created `~/Developer/tools/terminal-setup/lists/docker.txt` file and add the following content (or any other commands you like to use instead). The only important line is the first one `vim -c 'set filetype=bash' ~/Developer/tools/terminal-setup/lists/docker.txt"` allowing us to easily edit the docker.txt file with vim.

```TS
vim -c 'set filetype=bash' ~/Developer/tools/terminal-setup/lists/docker.txt  # EDIT
open -a Docker                                                                # OPEN DOCKER
docker logs $(basename $PWD)                                                  # GET LOGS
docker kill $(docker ps --quiet)                                              # KILL CONTAINERS
docker exec -it $(basename $PWD) /bin/sh                                      # OPEN SHELL
docker run -d -p 8080:80 --name $(basename $PWD) "$(basename $PWD):latest"    # RUN CONTAINER
docker rmi $(docker images --quiet)                                           # REMOVE ALL IMAGES
docker build --progress=plain -t "$(basename $PWD):latest" .                  # BUILD IMAGE
cd docker && docker-compose -f docker-compose.yml up -d                       # DOCKER COMPOSE
docker images                                                                 # LIST IMAGES
docker stop $(docker ps -q)                                                   # STOP CONTAINERS
docker rm -f $(docker ps -a -q)                                               # REMOVE CONTAINERS
docker compose down                                                           # COMPOSE DOWN
docker volume ls                                                              # LIST VOLUMES
docker volume prune                                                           # PRUNE
docker ps                                                                     # LIST CONTAINERS
docker-compose up -d                                                          # COMPOSE UP
osascript -e 'quit app "Docker"'                                              # CLOSE DOCKER
```

**Step 3:** Now, we can add the following command to the commands file that got created in the previous section.

```TS
echo "alias d='eval \$(cat ~/Developer/tools/terminal-setup/lists/docker.txt | fzf)'" >> ~/Developer/tools/terminal-setup/dot-files/commands
```

**Step 4:** To make the command defined above accessable via pressing the `d` key, we must source the `~/.zshrc` file.

```TS
source ~/.zshrc
```

**Step 5:** We now can press `d` to select a command stored in the docker.txt file and execute it.

![Select Command](assets/posts/engineering/efficient-terminal-setup/select-command.png)

**Step 6 (optional):** Search for "EDIT" and hit enter to open the docker.txt with vim.

![Select Command](assets/posts/engineering/efficient-terminal-setup/edit-option.png)

**Step 7 (optional):** Edit the docker.txt and add or remove commands as you like.

![Select Command](assets/posts/engineering/efficient-terminal-setup/edit.png)

I'm still flabbergasted by how much time can be saved by leaving the terminal less often and just having to type a couple of letters and letting fzf do the heavy lifting. I hope this post has been helpful for you!

## Next Steps

Checkout my [Dotfiles Repository](https://github.com/Jan20/dotfiles) if you want to set up your terminal more efficiently. In this post, I only outlined my Docker command list. However, I am working on having one list in place for every technology I use frequently. I have essentially replaced my Browser's bookmarks list with a [web-pages.txt](https://github.com/Jan20/dotfiles/blob/93d798956f5b008071d74b39af6192e84d518fe8/lists/web-pages.txt#L1) file. It is astonishingly how much time can be saved by jumping from the terminal directly to the desired webpage rather than opening a browser and scrolling through the brookmarks until finding the right page.