<!--
date=2023-02-06
topic=Python
summary=Gives an introduciton to virtual environments and dependency management in Python.
-->

# Virtual Envs & Dependencies

Python is one of the world's most popular programming languages that plays a central role in machine learning. Although Python is most certainly beginner-friendly, it comes with a set of concepts that may feel counterintuitive, especially coming from other programming languages. Thus, I like to highlight some of Python's less intuitive aspects.

## Virtual Environments

Though Python comes pre-installed on many operating systems, including MacOS and most Linux distributions, it is recommended not to use a system's default Python installation for custom projects. Instead, we want to clearly separate project-specific dependencies from those used by the system and prefer to work with the latest Python version, rather than a slightly outdated pre-installed one. The standard approach for achieving this is to create a self-contained, virtual environment for each project. A virtual environment usually contains a Python interpreter along with all dependencies needed by a project. Using virtual environments makes it much easier to manage dependencies independently from each other and to share Python code in general.

Virtual environments can essentially be created in three different ways. The first one, which I would recommend for most beginners, is to create a new project through a dedicated Python IDE like PyCharm, which automatically creates a virtual environment on project initialization.

A second approach to create a virtual environment is to use Python’s <code>venv</code> module as shown below. The syntax seems to be a bit odd that first. Why does a <code>-m</code> flag need to be included to create an environment? The reason for this is that Python comes with a exceptionally rich standard library organised in a number of modules. The <code>venv</code> module is just one one of many that can be executed with providing the <code>-m</code> flag. The second venv statement can technically be any path or name. Names like to <code>env</code> of <code>virtual_env</code> would be fine as well.

``` TS
python -m venv venv
```

Although using Python's <code>venv</code> module to create virtual environments is recommended in most cases, a virtual environment generated with <code>venv</code> will always be initialised with the same Python version that is used by the system. This can be problematic when building on legacy libraries that require previous Python versions. For these cases, the <code>virtualenv</code> third-party tool is available, which provides a third option for creating virtual environments. The tool allows specifying the exactPython version such as <code>Python3.8</code>.

```TS
sudo pip3 install virtualenv
virtualenv venv --python=Python3.8
```

There is hardly any benefit in creating a virtual environment alone, because once created, the default Python version of the system is still active. However, each virtual environment comes with an activation script that can be run as follows.

``` TS
source venv/bin/activate
```

After the script has been executed, the shell's Python environment gets set to the desired one. Of course it is also possible to leave a virtual environment again by running the following command.

``` TS
source deactivate
```

## Dependency Management

The most common way to install Python dependencies is to use Python's **preferred installer program** much more commonly referred to by the abbriviation PIP. The package manager offers a simple <code>install</code> command as show below.

```TS
pip install [DESIRED PACKAGE]
```

PIP allows to print a list of all dependencies installed gobally or within a virtual environment by running the following command.

```TS
pip list
```

Installed dependencies can be persisted by writing the output of pip's freeze command to a file conventionally named requirements.txt. It is recommanded to include always include a requirements.txt file outlining a project's dependencies and their respective versions. 

```TS
pip freeze > requirements.txt
```

## Recap

Although Python is a beginner-friendly language, it comes with a few concepts that are less intuitive. For starters, it is always recommended to set up a new virtual environment for every Python project to tie dependencies to one project and one project only. In addtion, creating a requirements.txt document containing a list of all required dependencies and their respective versions makes checking out and running a project on another machine much easier. Thanks for your interest.