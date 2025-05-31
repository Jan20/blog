<!--
date=2025-01-18
topic=engineering
summary=Outlines a range or reasons for using Vim
-->

# Why Using Vim?

Fundamentally, Vim is just a screen-based text editor. So, why would we prefer Vim over, let’s say, VS Code to edit files? It does not come with syntax highlighting or many of the niceties we are used to from modern IDEs. Moreover, it is rather notorious for its steep learning curve to accomplish what might seem like relatively simple tasks.

For me, Vim offers three core advantages over other text editor which are:

1. **🖥️ Availability inside the terminal:** Being able to ajust any files quickly without having to open a file in a dedicted application is the single reason why I switched to Vim in the first place. Vim is hand-down the best tool to use to make quick edits without loosing focus.

2. **⏱️ Speed:** Starting an application or even switching windows takes time. However, assuming that we spend most of our time with an open terminal anyways, Vim is the fastest way to edit files.

3. **🪶Lightweightness:** Vim does not come with a fancy user experience, AI features, or premium subscription options which is a good thing. It does what it is supposed to do - nothering more.

However, Vim comes with a serious learning curve. On the flip side, Vim's fundamental commands have not change much in decates. So, going through the learning curve can well be worth it.

## How I Use Vim

The way I work inside my terminal heavily depends on a range of text files containing commands, links, contacts, tasks, etc. Each file is bound to an alias, which can be as simple as pressing a single letter and may look like this:

```TS
bindkey -s "^v" 'eval $(cat $DOTFILES_DIR/lists/config.txt | fzf)\n'
```

By pressing the `control` + `v` key, we are presented with a list of files to add or directories to jump to.

![TEXT](assets/posts/engineering/why-using-vim/config.png)

Each file begins with a line that opens the corresponding file in Vim for quick adjustments, eliminating the need to search for it in the file system and open it inside a text editor.

```TS
vim $DOTFILE_DIR/lists/config.txt
```

That setup might seem a bit complicated at first, but it has proven to be extremely efficient. Feel free to take a look at the [Efficient Terminal Setup](https://janladicha.de/engineering/efficient-terminal-setup) to get the full picture of the concept.

## Configuring Vim 

Vim can extensively be configured to match pretty much every use case. Personally, I have not looked too deeply in customising vim. If you like to apply your custom configuration, you just create a `~/.vimrc` file in our home directory.

```TS
syntax on
colorscheme desert
set tabstop=4
set shiftwidth=4
set softtabstop=4
set expandtab
nnoremap <Leader>\ :terminal<CR>
autocmd BufNewFile,BufRead *.hcl,*.tf set filetype=hcl
autocmd BufNewFile,BufFilePre,BufRead *.md set filetype=markdown.pandoc
autocmd BufNewFile,BufFilePre,BufRead *.txt set filetype=bash
call plug#begin()
Plug 'tpope/vim-sensible'
Plug 'hashivim/vim-terraform'
call plug#end()
```

## Some Useful Commands

Vim comes with a plethora of keyboard shortcuts. There are quite a few resources out there providing a comprehensive overview of the most useful commands, such as the [Vim Cheat Sheet](https://vim.rtorr.com). However, when I started out, I found the following keyboard shortcuts especially useful:

| Command    | Description                                                      |
|------------|------------------------------------------------------------------|
| `dd`       | Delete a full line                                               |
| `I`        | Inserts characters at the beginning of a line                    |
| `A`        | Inserts characters at the end of a line                          |
| `Ctrl + o` | Retrun to the previous file                                      |
| `gf`       | Jump to a linked file                                            |
| `gx`       | Jumt to a link to a web page                                     |
| `o`        | insert a new line                                                |
| `D`        | Delete everything to the end of a line                           |
| `:retab`   | replaces all sequences of spaces used for indentation with tabs  |
