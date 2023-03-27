build-dev:
	docker build -t react-app .
build-local:
	docker build \
	 -t react-app-production:local \
	 --build-arg CADDYFILE=Caddyfile.local \
	 --build-arg BASE_URL=http://localhost:5001/api \
	 -f Dockerfile.production .

build-production:
	docker build \
	--build-arg CADDYFILE=Caddyfile.production \
	--build-arg BASE_URL=https://techprepscheduler.com/api \
	-t react-app-production:production -f Dockerfile.production .