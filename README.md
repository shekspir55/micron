# Microservice+Cron = MICRON

## Note

Didn't want to over-engineer this task, so code for workers and API endpoints are all in the same project.

Ideally, I would have separated it.

What could be done better? I could have separated worker nodes to separate docker containers and made them communitcate wth a scheduler server via API. Not sure if that was needed in the scope of this task didn't want to overengineer too much.

# Prerequirements

The only pre requirement is for you to have a [docker installed](https://docs.docker.com/engine/install/). You also need to have `make` command available.

If you don't have make you can run commands from `Makefile` directly in the terminal simulator.

#### Project backend was set up from scratch, no boilerplates were used

# Running and stoping the projet

Simply run `make up.`

Server will start at [http://localhost:8000](http://localhost:8000).

To stop the project please run `make down`.

## Running tests

To run the backend test rus `make test`

## How to over enginner it even MORE

We could

1. Set up sharding cluster with Postgres
2. Set up elastic search cluster for logs
3. Divide each worker in a separate server which will be connected to it's own "shard" to process the data
4. Set up swarm/k8s solution to make it muliserver/scalable
5. Rewrite application with Rust or GO or C
