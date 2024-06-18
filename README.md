# Microservice+Cron = MICRON

![MICRON preview](Peek 2024-06-18 20-10.gif)

## Note

`One time scheduling is implemented only for creating records, and not editing.`

# Prerequirements

The only pre-requirement is for you to have a [docker installed](https://docs.docker.com/engine/install/) and docker-compose. You also need to have `make` command available.

If you don't have `make` you can run commands from `Makefile` directly in the terminal simulator.

#### Project backend was set up from scratch, no boilerplate was used

# Running and stopping the project

Run `make up`.

The server will start at [http://localhost:8000](http://localhost:8000).

To stop the project please run `make down`.

## Running tests

To run the backend test use `make test`.
