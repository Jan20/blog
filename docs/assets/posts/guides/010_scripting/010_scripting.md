# Bash Scripting
Bash scripts have been a stable for more than 20 years providing an exceptionally amount of freedom for writing small, self-contained pieces of code. Bash scripts may be used for automating tasks, scraping data or start applications.

## Running Python Modules
Personally, I am using Bash scripts primarily to invoke Python modules. Let's assume we had Python module that allows to retrieve stock market data. To execute a function defined in a sub-module, it is possible to run the function inside an arbitrary directy as shown below as long a *__main__.py* file serving as entrypoint exists.

**app/__main__.py:**
```TS
from app.database import populate_table

populate_table('nasdaq')
```

The module shown above can be invoked by a manage.sh script featuring a load_data() function that calls the desired Python module.
**manage.sh:**
```TS
#!/bin/sh

load_data() {
    echo "Fetch stock market data"
    cd ..
    /Users/jan/Developer/AI/Alpha/env/bin/python -m app
}

COMMAND=$(toLower ${1})
case "${COMMAND}" in
    "load")
        load_data
    ;;
esac
```
