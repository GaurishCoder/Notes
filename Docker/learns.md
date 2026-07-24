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