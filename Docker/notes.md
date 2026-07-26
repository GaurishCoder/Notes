# Docker Notes

## Docker
- Docker ek platform hai jo applications ko **containers** ke andar build, package aur run karta hai.
- Har system par same environment provide karta hai.
- Software ko manually install aur configure karne ki zarurat kam ho jati hai.
- Containers ko create aur manage karne ke liye **Docker Engine** use hota hai.

---

## Docker Image
- Docker Image ek **read-only template** hoti hai jisse containers create hote hain.
- Isme hota hai:
  - Application code
  - Runtime
  - Dependencies
  - Configuration files
- Image immutable hoti hai (change nahi hoti).
- Ek image se multiple containers ban sakte hain.

---

## Docker Container
- Docker Container ek **running instance** hota hai Docker Image ka.
- Lightweight aur host system se isolated hota hai.
- Iska apna:
  - Filesystem
  - Processes
  - Network
  hota hai.
- Container ko start, stop, restart aur remove kiya ja sakta hai.

---

## Docker Network
- Containers ko aapas me communicate karne ke liye use hota hai.
- Har container ka apna IP address hota hai.
- Same network ke containers **container name** se communicate kar sakte hain.
- Har Docker network dusre networks se by default isolated hota hai.

---

## Docker Hub
- Docker Images store karne ke liye cloud-based registry hai.
- Official aur custom images dono store ki ja sakti hain.
- Images ko pull aur push kiya ja sakta hai.

---

## Why Docker?
- Software manually install karne ki zarurat nahi hoti.
- Sab developers ko same environment milta hai.
- Application setup aur deployment easy ho jata hai.
- Dependency aur version conflicts avoid hote hain.
- Applications host system se isolated rehti hain.



## Quick Revision

- **Docker** → Applications ko containers me run karne ka platform.
- **Image** → Read-only template jisse containers bante hain.
- **Container** → Image ka running instance.
- **Network** → Containers ko aapas me communicate karne deta hai.
- **Docker Hub** → Docker Images ki registry.

---

## Docker Compose
- Docker Compose multiple containers ko ek saath manage karne ke liye use hota hai.
- `docker-compose.yml` ya `compose.yml` file me services define ki jaati hain.
- Ek hi command se sabhi containers create aur start ho jate hain.
- Containers automatically same Docker network me connect ho jate hain.
- Development aur multi-container applications ke liye useful hai.

---

## Docker Volume
- Docker Volume container ka data permanently store karne ke liye use hota hai.
- Container remove hone ke baad bhi data safe rehta hai.
- Data host machine se alag manage hota hai.
- Multiple containers same volume ko share kar sakte hain.
- Mostly databases ke persistent storage ke liye use hota hai.

---

## Dockerfile
- Dockerfile ek text file hoti hai jisme image banane ke instructions likhe hote hain.
- Docker Image Dockerfile ko step-by-step execute karke banti hai.
- Har instruction ek nayi **layer** create karti hai.
- Docker build ke time cached layers ko reuse karta hai, isliye build fast hoti hai.
- Dockerfile application aur uski dependencies ko package karne ke liye use hoti hai.

### Common Dockerfile Instructions

- **FROM** → Base image specify karta hai.
- **WORKDIR** → Working directory set karta hai.
- **COPY** → Files ko image ke andar copy karta hai.
- **ADD** → Files copy karta hai aur additional features support karta hai.
- **RUN** → Build time par command execute karta hai.
- **CMD** → Container start hone par default command run karta hai.
- **ENTRYPOINT** → Container ka main executable define karta hai.
- **EXPOSE** → Application kis port par listen karegi uski information deta hai.
- **ENV** → Environment variables define karta hai.
- **ARG** → Build time variables define karta hai.

---

## Quick Revision

- **Docker Compose** → Multiple containers ko ek saath manage karta hai.
- **Volume** → Container ka data permanently store karta hai.
- **Dockerfile** → Docker Image banane ke instructions wali file.
- **Layer** → Dockerfile ki har instruction se banne wala read-only step.


---

## Important Docker Commands

### Images

```bash
docker pull <image-name>         # Image download karta hai
docker images                    # Sab images dikhata hai
docker rmi <image-name|image-id> # Image remove karta hai
```

---

### Containers

```bash
docker run <image-name>              # Naya container create aur start karta hai
docker run -d <image-name>           # Background me container run karta hai
docker run --name <name> <image>     # Container ko custom name deta hai

docker ps                            # Running containers dikhata hai
docker ps -a                         # Sab containers dikhata hai

docker start <container-name>        # Stopped container start karta hai
docker stop <container-name>         # Running container stop karta hai
docker restart <container-name>      # Container restart karta hai

docker rm <container-name>           # Container remove karta hai
docker logs <container-name>         # Container ke logs dikhata hai
docker exec -it <container-name> sh  # Running container ke andar enter karta hai
docker inspect <container-name>      # Container ki detailed information dikhata hai
```

---

### Networks

```bash
docker network ls                    # Sab Docker networks dikhata hai
docker network create <network-name> # Naya network create karta hai
docker network inspect <network-name># Network ki details dikhata hai
docker network rm <network-name>     # Network remove karta hai
```

---

### Volumes

```bash
docker volume ls                     # Sab volumes dikhata hai
docker volume create <volume-name>   # Naya volume create karta hai
docker volume inspect <volume-name>  # Volume ki details dikhata hai
docker volume rm <volume-name>       # Volume remove karta hai
```

---

### Docker Compose

```bash
docker compose up                    # Services create aur start karta hai
docker compose up -d                 # Services background me start karta hai
docker compose down                  # Services aur network stop/remove karta hai
docker compose ps                    # Running compose services dikhata hai
docker compose logs                  # Sab services ke logs dikhata hai
docker compose restart               # Sab services restart karta hai
docker compose stop                  # Sab services stop karta hai
docker compose start                 # Stopped services start karta hai
docker compose -f filename up -d     # Custom file ho toh ye command run karneka
```