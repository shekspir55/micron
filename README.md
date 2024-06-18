# Microservice+Cron = MICRON

## Note

Didn't want to over-engineer this task, so code for workers and API endpoints are all in the same project.

Ideally, I would have separated it.

What could be done better? I could have separated worker nodes into separate docker containers and made them communicate with a scheduler server via API. Not sure if that was needed in the scope of this task didn't want to over-engineer too much.

# Prerequirements

The only pre-requirement is for you to have a [docker installed](https://docs.docker.com/engine/install/) and docker-compose. You also need to have `make` command available.

If you don't have make you can run commands from `Makefile` directly in the terminal simulator.

#### Project backend was set up from scratch, no boilerplate was used

# Running and stopping the project

Simply run `make up.`

The server will start at [http://localhost:8000](http://localhost:8000).

To stop the project please run `make down`.

## Running tests

To run the backend test use `make test`.

## How to over-engineer it even MORE

We could

1. Set up a sharding cluster with Postgres
2. Set up an elastic search cluster for logs with Kibana
3. Divide each worker into a separate server which will be connected to its own "shard" to process the data
4. Set up swarm/k8s solution to make it multiserver/scalable
5. Rewrite the application with Rust GO or C
6. On bombard, insert instead of individually