# Microservice+Cron = MICRON

## Note

Didn't want to over-engineer this task, so code for workers and API endpoints are all in the same project.

Ideally, I would have separated it.

What could be done better? I could have separated worker nodes to separate docker containers and made them communitcate wth a scheduler server via API. Not sure if that was needed in the scope of this task didn't want to overengineer too much.

# Prerequirements

The only pre requirement is for you to have a [docker installed](https://docs.docker.com/engine/install/).

#### Project backend was set up from scratch, no boilerplates were used

# Running and stoping the projet

Simply run `make up.`

Server will start at [http://localhost:8000](http://localhost:8000).

To stop the project please run `make down`.

## Runing tests

To run the backend test rus `make test`
