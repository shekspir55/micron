# Microservice+Cron = MICRON

## [Design document](DESIGN.md)

[Micron preview](./Peek-2024-06-18 20-10.gif)

## Note

`One-time scheduling is implemented only for creating records, and not editing.`

# Prerequirements

The only 2 pre-requirements are for you to have a [docker installed](https://docs.docker.com/engine/install/)  and  `make` command available.

If you don't have `make` you can run commands from `Makefile` directly in the terminal simulator.

# Running and stopping the project

Run `make up`.

The server will start at [http://localhost:8000](http://localhost:8000).

To stop the project please run `make down`.

## Running tests

To run the backend test use `make test`.
