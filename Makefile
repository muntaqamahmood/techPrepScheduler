### development based docker files

build-dev:
	cd client && $(MAKE) build-dev
	cd server && $(MAKE) build

run-dev:
	docker-compose-dev up
### local, uses atlas db and cady

build-local:
	cd client && $(MAKE) build-local
	cd server && $(MAKE) build

run-local:
	docker-compose-dev up


### production, runs on digital ocean VM

build-production:
	cd client && $(MAKE) build-production
	cd server && $(MAKE) build

run-production:
	docker-compose up