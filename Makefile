

build-backend:
	docker build -t cron-backend ./backend

build: build-backend

up: build
	docker-compose up -d

down:
	docker-compose down |\
	docker-compose -f docker-compose.dev.yml down

up-dev: 
	docker-compose -f docker-compose.dev.yml up -d