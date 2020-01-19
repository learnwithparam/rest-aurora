# API design for beginners

RESTful API design workshop for beginners using Node Js and MongoDB

## System Requirements

- [git](https://git-scm.com/) v2 or greater
- [Node Js](https://nodejs.org/) v8 or greater
- [yarn](https://yarnpkg.com/lang/en/) v1 or greater (or [npm](https://www.npmjs.com/) v6 or greater)

Note: Install docker desktop, it will include docker engine, compose and other goodies from docker

- [Docker Engine](https://docs.docker.com/get-docker/) - v17 or above
- [Docker compose](https://docs.docker.com/compose/install/) - v1.2 and above

All of these must be available in your PATH. To verify things are set up properly, you can run this:

```
git --version
node --version
yarn --version # or npm --version
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

## License

This material is available for private, non-commercial use under the [GPL version 3](http://www.gnu.org/licenses/gpl-3.0-standalone.html). If you would like to use this material to conduct your own workshop, please contact me at [paramanantham@live.com](mailto:paramanantham@live.com)
