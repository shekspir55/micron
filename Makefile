

test: build-backend
	docker run -it cron-backend npm run test

build-backend:
	docker build -t cron-backend ./backend

build-frontend:
	docker build -t cron-frontend ./frontend

build: build-backend build-frontend

up: build
	docker-compose up -d

down:
	docker-compose down |\
	docker-compose -f docker-compose.dev.yml down

up-dev: 
	docker-compose -f docker-compose.dev.yml up -d