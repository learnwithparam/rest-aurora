# API design for beginners

RESTful API design workshop for beginners using Node Js and MongoDB

## System Requirements

- [git](https://git-scm.com/) v2 or greater
- [Node Js](https://nodejs.org/) v8 or greater
- [yarn](https://yarnpkg.com/lang/en/) v1 or greater (or [npm](https://www.npmjs.com/) v6 or greater)
- [MongoDB Community Edition](https://docs.mongodb.com/manual/installation/) v4 or greater

All of these must be available in your PATH. To verify things are set up properly, you can run this:

```
git --version
node --version
yarn --version # or npm --version
mongod --version
```

If you have trouble with any of these, learn more about the PATH environment variable and how to fix it here for [windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/) or [mac/linux](http://stackoverflow.com/a/24322978/971592).

## Quick Start

1. Clone the repository with `git clone git@github.com:learnwithparam/rest-aurora.git`
2. Go inside the lesson folder. It is arranged as a number sequence starts from `00`
3. Run `docker-compose up`. It will start our application on `http://localhost:<PORT>`
   > http://localhost:4000
4. Once you finish the solution on each lesson, run `docker-compose down`.
5. Go to next lesson and repeat from step 2.

- Each chapter contains tasks. We will code the solution live in the workshop
- If you want to check the solution for any of the lessons. You can checkout to `solutions` branch and run the respoective project inside folder

## Quick start using docker compose

_Recommeded only for advanced users who has worked with docker and docker compose, else please install everything we mentioned in the system requirement. That will make your life easier while coding along the workshop_

- [Docker Engine](https://docs.docker.com/get-docker/) - v17 or above
- [Docker compose](https://docs.docker.com/compose/install/) - v1.2 and above

```
docker --version
docker-compose --version
```

_Note_: You can install docker desktop for mac or windows to install docker engine, compose and other goodies from docker

## Running a lesson

Go to the lesson folder

1. Run `npm install` to install the dependencies
2. Run `npm start` to run the server

If you are using docker, then

1. Run `docker-compose up` to start the server
2. Run `docker-compose down` to shutdown and cleanup the server once you finish the tasks for this lesson. _Note_: This step is very important else docker-compose will lock the previous database running and cause problem running the next lesson.

## License

This material is available for private, non-commercial use under the [GPL version 3](http://www.gnu.org/licenses/gpl-3.0-standalone.html). If you would like to use this material to conduct your own workshop, please contact me at [paramanantham@live.com](mailto:paramanantham@live.com)
