# Microservice+Cron = MICRON

![MICRON preview](Peek 2024-06-18 20-10.gif)

## Note

`One time scheduling is implemented only for creating records, and not editing.`


This project is extremely configurable. You can even configure the amount of workers and shard size for processing. However, do it at your own risk. :D My CPU is dying after 60K records per minute.

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

1. Bulk inserts on the update, to not save each record one by one, but this solution is elegant and I was not given a benchmark.
2. Set up a sharding cluster with Postgres
3. Set up an elastic search cluster for logs with Kibana
4. Divide each worker into a separate server which will be connected to its own "shard" to process the data
5. Set up swarm/k8s solution to make it multiserver/scalable
6. Rewrite the application with Rust GO or C
7. On bombard, insert instead of individually
