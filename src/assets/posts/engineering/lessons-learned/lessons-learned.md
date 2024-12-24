<!--
date=2024-11-30
topic=Lessons Learned
summary=Lists the most important lessons learned as senior software developer.
-->

# Lessons Learned

After working for well over five years as a software engineer, I’d like to share some of the lessons I’ve learned over the years.

## ⏱️ Being Efficient Matters 

Writing software comes down to turning ideas into reality, balancing speed and quality in the process. Applying a few generic strategies can help keep things moving forward.

* **Breaking up complex tasks** by defining very fine-grained, executable steps. By doing so, we can realize early on whether input from another team is required or if further clarification is needed. Of course, there is also the possibility that we simply lack knowledge of parts of the codebase or a certain technology. Nevertheless, reducing the uncertainty about a task early on is always a good starting point.

* **Eliminating inefficiencies** by removing as much manual toil as possible from the development process and reducing context switching, such as jumping between tasks or multiple applications. I always aim to have only one task in progress at a time and prefer to keep only one shell or one IDE open.

* **Automate recurrent tasks** by defining shell commands, writing scripts, extending pre-commit hooks, or adding steps to a CD/CI pipeline. My rule of thumb is that whenever I find myself repeating a task more than three times, I think about a way to automate it.

## 🎠  Optimize for Fun

Writing outstanding software is a long game. It can easily take months, if not years, to make an idea a reality, let alone maintaining a piece of software long-term. Therefore, I strongly recommend making the journey of writing and maintaining code as enjoyable as possible. Personally, I have the most fun finding initial solutions, refactoring code, improving an application’s architecture, and writing tests (which can actually be a rather satisfying experience).

On the flipside, I am not a great fan of tampering with CI/CD pipelines and monitoring. However, there are approaches to make activities we normally despise more enjoyable. For me, automating as much as possible is normally the key, and it works well for CI/CD pipelines or deploying software in general.

## 🐚 Embracing the Shell

No other program has a greater effect on a developer’s productivity than a shell like **zsh** or **bash**. To be honest, when starting out, trying to accomplish anything with the shell might seem a bit tedious, underwhelming, and strangely unpolished. Yet, after mastering some fundamental concepts, installing a few CLI tools, and learning how to chain commands together, things become much more interesting.

## 📚 Keep Learning

There are constantly new technologies to learn, new concepts emerging, and only limited time available for learning. Yet, setting aside time to learn new skills is paramount.

## 🌴 Keep It Simple

There is an overabundance of tools and applications promising to improve developer productivity. However, over the years, I have become more minimalistic, especially when it comes to the number of tools and applications I use. It turned out that there is a lot that can be accomplished using VIM and a bit of shell scripting alone. Rather than jumping to the next shiny tool, I tend to stick to a very small number of applications I know inside and out.

For instance, I moved almost entirely away from note-taking apps and use plain markdown (.md) files instead—one file for tasks, another for jotting down thoughts, and a few draft files for blog posts. Rather than having notes scattered across multiple applications, all notes are easy to find and can be edited by any text editor. In addition, it’s convenient to have a shortcut in place to open them quickly in VIM. This approach is simple, does not rely on any applications forcing a premium subscription on you, and is extendable.

## 🔖 Document Projects

It is a basic concept, but spending a little bit of time on documentation pays off in the long run. For the most part, I am a huge fan of keeping documentation as close to the code as possible. Especially for simpler projects, a well-structured `README.txt` can be sufficient.

Personally, I tend to always include an `.env` file outlining the expected environment variables. In the end, software is meant to be shared. A well-structured README file can be an excellent starting point for jumping into a new project.
