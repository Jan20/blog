<!--
date=2025-01-18
topic=engineering
summary=Outlines a range or reasons to use Vim
-->

# Why Using Vim?

Fundamentally, Vim is just a screen-based text editor. So, why would we prefer Vim over, let’s say, VS Code to edit files? It does not come with syntax highlighting or many of the niceties we are used to from modern IDEs. Moreover, it is rather notorious for its steep learning curve to accomplish what might seem like relatively simple tasks.

Personally, Vim’s **simplicity**, **speed**, and **availability right from the terminal** have convinced me over the past two years. It has become my default editor for writing blog posts, taking notes, and an integral part of my terminal setup. I truly enjoy working with a tool that is unobtrusive, does what it is supposed to do, is always available, and allows me to stay in the flow.

The steep learning curve is, to some extent, offset by Vim’s longevity. We only have to learn how to use Vim once and can benefit from our invested time for decades to come.

## How I Use Vim

The way I work inside my terminal heavily depends on a range of text files containing commands, links, contacts, tasks, etc. Each file is bound to an alias, which can be as simple as pressing a single letter and may look like this:

```TS
alias v='eval $(cat $DOTFILES_DIR/lists/config.txt | fzf)'      # CONFIG
```

By pressing the `v` key, we are presented with a list of files to add or directories to jump to.

![TEXT](assets/posts/engineering/why-using-vim/config.png)

Each file begins with a line that opens the corresponding file in Vim for quick adjustments, eliminating the need to search for it in the file system and open inside another text editor or IDE.

```TS
vim -c 'set filetype=sh' $DOTFILE_DIR/lists/config.txt          # EDIT
```

That setup might seem a bit complicated at first, but it has proven to be extremely efficient. Feel free to take a look at the [Efficient Terminal Setup](http://localhost:4200/engineering/efficient-terminal-setup) to get the full picture of the concept.

## Configuration 

Vim can be configured to match our personal preferences by adjusting the `~/.vimrc` file in our home directory, as shown below.

```TS
syntax on
colorscheme desert
nnoremap <Leader>t :terminal<CR>
autocmd BufNewFile,BufRead *.hcl,*.tf set filetype=hcl
autocmd BufNewFile,BufFilePre,BufRead *.md set filetype=markdown.pandoc
call plug#begin()
Plug 'tpope/vim-sensible'
Plug 'hashivim/vim-terraform'
call plug#end()
```

## Some Useful Commands

Vim comes with a plethora of keyboard shortcuts. There are quite a few resources out there providing a comprehensive overview of the most useful commands, such as the [Vim Cheat Sheet](https://vim.rtorr.com). However, when I started out, I found the following keyboard shortcuts especially useful:

* `dd` to delete a full line
* `I` to insert at the beginning of a line
* `A` to insert at the end of a line
* `gf` to go to a linked file
* `Ctrl + o` to return to the previous file
* `gx` to follow a link to a web page
* `o` insert a new line
* `D` Delete everything to the end of a line
