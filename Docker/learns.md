# Docker Notes

## Docker
- Docker is a platform used to build, package, and run applications in isolated environments called **containers**.
- Provides a consistent environment across different systems.
- Eliminates manual software installation and configuration.
- Uses **Docker Engine** to create and manage containers.

---

## Docker Image
- A **read-only template** used to create containers.
- Contains:
  - Application code
  - Runtime
  - Dependencies
  - Configuration files
- Images are immutable.
- One image can create multiple containers.

---

## Docker Container
- A **running instance** of a Docker image.
- Lightweight and isolated from the host system.
- Has its own filesystem, processes, and network.
- Can be started, stopped, restarted, and removed.

---

## Docker Network
- Enables communication between containers.
- Each container gets its own IP address.
- Containers on the same network communicate using container names.
- Isolated from other Docker networks by default.

---

## Docker Hub
- A cloud-based registry for Docker images.
- Stores official and custom images.
- Images can be pulled from and pushed to Docker Hub.

---

## Why Docker?
- No manual software installation.
- Consistent development environment.
- Easy application setup and deployment.
- Prevents dependency and version conflicts.
- Applications remain isolated from the host system.

---

## Common Docker Commands

```bash
docker pull
docker images
docker ps
docker ps -a
docker run
docker start
docker stop
docker restart
docker rm
docker rmi
docker logs
docker exec
docker network ls
docker network create
docker network inspect
```

---

## Quick Revision

- **Docker** → Platform for running applications in containers.
- **Image** → Read-only template used to create containers.
- **Container** → Running instance of an image.
- **Network** → Allows communication between containers.
- **Docker Hub** → Registry for Docker images.