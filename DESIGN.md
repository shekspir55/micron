# Design document

# Cost efficiency

Search in DB is done via indexing with the b-tree algorithm on the `nextRunTime` field which is searched with the order which is O(log n).

Each record is saved one by one into DB, which could be optimized to bulk import, but the requirement was to make it reliable so there are always tradeoffs. On a scale it will be done through queue managers.

On a scale system needs to be tested with inspection tools for optimization.

# Scaling

The solution was tested with 60K simultenious tasks on my laptop(i5), up to 100 K this solution should work without issue with vertical scaling.

The application by default is vertically scalable as the number of workers is dependent on the number of tasks it needs to run.

To make it horizontally scalable I would cut the worker into a separate service and run it with other sharded DB for example. See diagrams below,


## Current System components

Current system diagram

![system diagram](system-diagram.png)

TS everywhere

1. UI with React
2. Server in node
   1. Workers for cron jobs
3. Postgres for data storage

Each component is wrapped into a docker container, orchestrated with docker-compose.

## Scaled up version 
![scaled-up-version](scaled-up-version.png)

In the scaled up version we would have Queueing system to make sure no tasks are lost, CDN for frontend and load balancer for backend, DB proxy to manage sharded DBs.

# What if it fails

Currently every component is stateless except the database. On failure, each component of the system will restart. For example in the case of cron service will pick up wherever it is left and will continue processing tasks.

At scale it should be done the same way + using queueing mechanism.


## How to (over-)engineer it even MORE

We could

1. Bulk inserts on the update, to not save each record one by one, but this solution is elegant and I was not given a benchmark.
2. Set up a sharding cluster with Postgres
3. Set up an elastic search cluster for logs with Kibana
4. Divide the worker into a separate server which will be connected to its own "shard" to process the data
5. Set up swarm/k8s solution to make it multiserver/scalable
6. Rewrite the application with Rust, GO, or C
7. On bombard, insert bulk instead of individually.
