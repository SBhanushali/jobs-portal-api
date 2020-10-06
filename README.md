FORMAT: 1A
HOST: http://localhost:8080/

# Jobs Portal 

Job Portal is a simple API allowing companaies to create jobs and common people to search jobs

## Looking for the documentation? 📝

This API Blueprint demonstrates a real world example documenting a portion of  => https://shivambhanushali.docs.apiary.io/#


## Description Of Usual Server Responses:

+ 200 `OK` - the request was successful (some API calls may return 201 instead).
+ 201 `Created` - the request was successful and a resource was created.
+ 400 `Bad Request` - the request could not be understood or was missing required parameters.
+ 404 `Not Found` - resource was not found.


## Jobs Collection [/jobs]

You may create your own jobs using this action. It takes a JSON
object  
+ companyName(`String`) : Company Name 
+ jobTitle(`String`) : Job Title, 
+ jobDescription(`String`) : Job Description, 
+ location(`Object`) : Job Loacation
    + sublocality_level_1(`String`) 
    + locality(`String`)
    + administrative_area_level_1(`String`)
    + administrative_area_level_2(`String`)
    + country(`String`, `required`)
+ skills(`[String]`): Skills/Keywords

### Create a New Job [POST]



+ Request (application/json)

        {
            "companyName":"Crio.do",
            "jobTitle":"Software Engineer",
            "location":{
                "locality":"Pune",
                "administrative_area_level_1":"Maharashtra",
                "country":"India"
            },
            "jobDescription":"lorem ipsum",
            "skills":["Computer Science", "SQL", "Databases", "Design"]
        }

+ Response 201 (application/json)

    + Body

            {
                "success": true,
                "message": "Job created"
            }

## Find by Location [/jobs?location={location}]

### List Jobs by Location [GET]
Search by sublocality_level_1(`String`) > locality(`String`) > administrative_area_level_1(`String`)>administrative_area_level_2(`String`) > country(`String`, `required`)
+ Parameters
    + location (String, required, `country=India`) ... Find by Location of company
    

+ Response 200 (application/json)

        {
            "success": true,
            "data": [
                {
                    "location": {
                        "locality": "Pune",
                        "administrative_area_level_1": "Maharashtra",
                        "country": "India"
                    },
                    "skills": [
                        "Computer Science",
                        "SQL",
                        "Databases",
                        "Design"
                    ],
                    "_id": "5f7bd036196ad825a010d756",
                    "companyName": "Crio.do",
                    "jobTitle": "Software Engineer",
                    "jobDescription": "lorem ipsum",
                    "__v": 0,
                    "createdAt": "2020-10-06T13:32:31.291Z"
                },
                {
                    "location": {
                        "locality": "Mumbai",
                        "administrative_area_level_1": "Maharashtra",
                        "country": "India"
                    },
                    "skills": [
                        "Databases",
                        "Design",
                        "Artificial Intelligence"
                    ],
                    "_id": "5f7c215d9496d151cdfef025",
                    "createdAt": "2020-10-06T07:48:45.979Z",
                    "companyName": "Haptik",
                    "jobTitle": "Software Engineer",
                    "jobDescription": "lorem ipsum",
                    "__v": 0
                },
            ]
        }

+ Response 400 (text/plain)

        {
            "success": false,
            "data": "Location field empty"
        }

## Find by Skills [/jobs?search-term={search-term}]
### List Jobs by Skills [GET]
Returns result even if one skill is matched and sorts by best match
+ Parameters
    + search-term (String, required, `search-term=Design,Databases,Artificial Intelligence`) ... Find by skills
    

+ Response 200 (application/json)

        {
            "success": true,
            "data": [
                {
                    "_id": "5f7c215d9496d151cdfef025",
                    "location": {
                        "locality": "Mumbai",
                        "administrative_area_level_1": "Maharashtra",
                        "country": "India"
                    },
                    "skills": [
                        "Databases",
                        "Design",
                        "Artificial Intelligence"
                    ],
                    "companyName": "Haptik",
                    "jobTitle": "Software Engineer",
                    "jobDescription": "lorem ipsum",
                    "order": 3
                },
                {
                    "_id": "5f7bd036196ad825a010d756",
                    "location": {
                        "locality": "Pune",
                        "administrative_area_level_1": "Maharashtra",
                        "country": "India"
                    },
                    "skills": [
                        "Computer Science",
                        "SQL",
                        "Databases",
                        "Design"
                    ],
                    "companyName": "Crio.do",
                    "jobTitle": "Software Engineer",
                    "jobDescription": "lorem ipsum",
                    "order": 2
                },
            ]
        }
        
        
+ Response 400 (text/plain)

        {
            "success": false,
            "data": "Search field empty"
        }
        
        
+ Response 400 (text/plain)

        {
            "success": false,
            "data": "Skills keyword should be less than or equal to 3"
        }
        
        
## Find by Location and Skills [/jobs?location={location}&search-term={search-term}]
### List Jobs by Location & Skills [GET]
First finds jobs by location and then filter by skills
+ Parameters
    + location (String, required, `locality=Mumbai%26administrative_area_level_1=Maharashtra`) ... Find by Location of company
    + search-term (String, required, `search-term=Design,Databases,Artificial Intelligence`) ... Find by skills

+ Response 200 (application/json)

        {
            "success": true,
            "data": [
                {
                    "location": {
                        "locality": "Mumbai",
                        "administrative_area_level_1": "Maharashtra",
                        "country": "India"
                    },
                    "skills": [
                        "Databases",
                        "Design",
                        "Artificial Intelligence"
                    ],
                    "_id": "5f7c215d9496d151cdfef025",
                    "createdAt": "2020-10-06T07:48:45.979Z",
                    "companyName": "Haptik",
                    "jobTitle": "Software Engineer",
                    "jobDescription": "lorem ipsum",
                    "__v": 0
                }
            ]
        }
        
        
        
---
## Requirements

For development, you will only need Node.js and a npm, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

## Install

    $ git clone https://github.com/SBhanushali/jobs-portal-api.git
    $ cd jobs-portal-api
    $ npm install

## Configure app

Create `.env` file with key DB_CONNECTION=YOUR_MONGO_ATLAS_CONNECTION_STRING

    $ npm start
