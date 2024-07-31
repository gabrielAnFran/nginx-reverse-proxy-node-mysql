docker network create nginx-reverse-proxy-node 

# Nginx Reverse Proxy with Node.js and MySQL

This project sets up a containerized environment with Nginx as a reverse proxy, a Node.js application, and a MySQL database.

## Components

- **Nginx**: Reverse proxy server
- **Node.js**: Application server
- **MySQL**: Database server

## Setup

1. Ensure Docker and Docker Compose are installed on your system.
2. Clone this repository.
3. Navigate to the project directory.

## Usage

Start the services:

```bash
docker-compose up -d 
```

Access the application at `http://localhost:8080`

## Structure

- `./nginx`: Nginx configuration
- `./node`: Node.js application code
- `./node/.docker/mysql`: MySQL initialization scripts

## Networks

All services are connected via the `nginx-reverse-proxy-node` bridge network.

## Volumes

- Node.js app files are mounted to `/usr/src/app` in the container
- MySQL initialization scripts are mounted to `/docker-entrypoint-initdb.d`

## Notes

- The Node.js app waits for the MySQL database to be ready before starting
- MySQL root password and database name are set via environment variables

## Stopping the Services


```bash
docker-compose down
```# nginx-reverse-proxy-node-mysql
