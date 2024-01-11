# Log Ingester and Query App
> This is Log Ingester/Query 


## Technologies Used
- python 
- django-rest-framework
- Reactjs
- MongoDB
- sqlite3
- Docker < integration in progress >
- celery < integration in progress >


## Features

- Users can ingest logs via script or using Backend API < integration with Frontend is in progress >
- Users can use query dashboad depending upon the filters of their choice



## Setup

Here is the following procedure to run these APIs in your system 

- clone this repository in your local machine using following command

gitclone repository-url 

- check if you have python installed in your system and if it's not installed from here ( https://www.python.org/downloads/ )

- Now open the cloned repository folder and run the following command to install all the required dependencies :

pip install -r requirements.txt

Now you have your basics set up 

- Run the local server using the command 

- navigate to project src directory and run following commands
      - npm run start-backend
      - npm run start
 


Now you access the APIs in your systems and use endpoints to query the logs.

## Project Status

Project is: _in progress_.


## Room for Improvement

- Adding frontend for better user interface
- optimizing API methodology
- integrating automation such as dockerization of the project and application of celery.
