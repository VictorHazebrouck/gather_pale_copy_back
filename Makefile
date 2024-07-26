#Build docker image
build: 
	docker-compose build

#Start docker servers
start:
	docker-compose up

#Stop docker server
stop:
	docker-compose down 

#Reloads and rebuild docekr stuff
reload:
	docker-compose down
	docker-compose build
	docker-compose up

# Remove unused data
clean:
	docker system prune -f


# Start the Docker services in development mode with hot reloading
dev:
	docker-compose -f  docker-compose.yml -f  docker-compose.dev.yml up