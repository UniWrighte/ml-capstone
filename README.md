# Quickstart

You will need to install `Node.js` and `npm` for this application to work. You will also need `Python3`. Here are instructions on how to install on your OS:

https://nodejs.org/en/download/

https://www.python.org/downloads/

To run the application (UNIX systems only):

navigate to project root dir

run:

    ./run.sh

you may need to modify permissions on the file:

    chmod +x run.sh

The python service may linger. Kill with:

    kill -9 $(lsof -t -i:8081 -sTCP:LISTEN)