<!--
date=2022-06-27
topic=Python
-->

<img class='full' src='assets/posts/guides/007_python_virtual_environments/thumbnail.png'>

# Virtual Environments

It is considered best practice to run Python applications inside isolated environments different from our system's default Python installation. Virtual environments contain a Python interpreter as well as a set of libraries and dependencies needed to run a self-contained Python project. By only including those dependencies that are required to run a Python project, it becomes much easier to containerize and deploy the project.

## Virtual Environments

Virtual environments are either created automatically by an IDE such as PyCharm or can be created manually:

```TS
python -m venv venv
```

Please make sure to include the <code>-m</code> flag as it lets the <code>venv</code> library module run as a script creating a virtual environment.

After having created an virtual environment, the virtual environment needs to be activated:

```TS
source venv/bin/activate
```

Finally, a once activated virtual environment can be deactivated by using the following command:

```TS
source deactivate
```

## Persisting an Environment's Dependencies

Installed dependencies can be persisted by writing the output of pip's freeze command to a file, conventionally named requirements.txt

```TS
pip freeze > requirements.txt
```
