
build-backend:
	docker build -t cron-backend ./backend

build-frontend:
	docker build -t cron-frontend ./frontend

test: down build-backend
	docker-compose -f docker-compose.test.yml run cron-backend npm run test-in-docker && \
	docker-compose -f docker-compose.test.yml down

build: build-backend build-frontend

up: down build
	docker-compose up -d

down:
	docker-compose down |\
	docker-compose -f docker-compose.dev.yml down |\
	docker-compose -f docker-compose.test.yml down

up-dev: 
	docker-compose -f docker-compose.dev.yml up -d