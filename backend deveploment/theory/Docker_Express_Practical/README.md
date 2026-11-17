# Docker and Express Practical

Build a Student Management API with Express, configure it in Ubuntu using
`docker cp` and `docker exec`, save the configured container with `docker
commit`, export and reload its image, and run it with Docker port mapping.
Part B demonstrates the repeatable Dockerfile alternative.

## Requirements

- Windows 11 with virtualization enabled
- Docker Desktop for Windows, using the WSL 2 backend
- Node.js and npm for the optional host-side API test

Install Docker Desktop from [Docker's official download
page](https://www.docker.com/products/docker-desktop/) or in PowerShell:

```powershell
winget install --id Docker.DockerDesktop -e
```

If Docker Desktop reports that WSL 2 is missing, run `wsl --install` in an
Administrator PowerShell window and restart Windows when prompted. Start
Docker Desktop and wait for its engine to finish starting before continuing.
If WSL reports that virtualization is disabled, enable Intel Virtualization
Technology (VT-x) in the computer's UEFI/BIOS settings, make sure the Windows
**Virtual Machine Platform** optional feature is enabled, then restart.
Confirm the installation:

```powershell
docker --version
docker info
```

## Part A: Build and test the Express API

Open PowerShell in this project folder:

```powershell
npm install
npm run dev
```

Open `http://localhost:3000/` for the welcome message. Stop the host server
with Ctrl+C before starting the container on the same host port.

| Method | Route | Result |
| --- | --- | --- |
| GET | `/` | Welcome message |
| GET | `/students` | All students |
| GET | `/students/:id` | One student, or 404 |
| POST | `/students` | Add a student using JSON `{ "name": "Priya", "course": "BCA" }` |
| DELETE | `/students/:id` | Delete a student, or 404 |

Records are held in memory and reset when the server restarts. POST requires
non-empty string values for both `name` and `course`.

## Part A: Configure an Ubuntu container manually

Run these commands from the project folder in PowerShell. The Ubuntu container
is used to demonstrate the manual workflow; the application image is created
later with `docker commit`.

```powershell
docker pull ubuntu:24.04
docker run -dit --name student-container ubuntu:24.04 bash
docker ps
docker exec -it student-container bash
```

Inside the container, install Node.js and npm and record their versions:

```bash
apt update
apt install -y nodejs npm
node --version
npm --version
exit
```

Back in host PowerShell, copy the application and dependency manifest into
`/app`, then install the project dependencies inside the container:

```powershell
docker exec student-container mkdir -p /app
docker cp .\app.js student-container:/app/app.js
docker cp .\package.json student-container:/app/package.json
docker exec -it student-container bash
cd /app
npm install
npm list --depth=0
exit
docker exec student-container ls -la /app
```

Save the configured container as the required image:

```powershell
docker commit student-container student-management:v1
docker image ls student-management
```

Export the image to a TAR archive, remove only that image tag, and load it
again to verify the transfer:

```powershell
docker save --output student-management.tar student-management:v1
Get-Item .\student-management.tar | Select-Object Name,Length
docker image rm student-management:v1
docker load --input .\student-management.tar
docker image ls student-management
```

Run the API from the reloaded image. `4000:3000` maps host port 4000 to the
application's container port 3000:

```powershell
docker run -d --name student-app -p 4000:3000 student-management:v1 sh -c "cd /app && npm run dev"
docker ps
docker logs student-app
```

Open `http://localhost:4000/` and `http://localhost:4000/students`. Try the
remaining endpoints from PowerShell:

```powershell
Invoke-RestMethod http://localhost:4000/students
Invoke-RestMethod http://localhost:4000/students/1
Invoke-RestMethod -Method Post -Uri http://localhost:4000/students `
  -ContentType 'application/json' -Body '{"name":"Priya","course":"BCA"}'
Invoke-RestMethod -Method Delete http://localhost:4000/students/3
```

Student 3 is available after the POST above. For an unknown ID, check the
response with `curl.exe -i http://localhost:4000/students/99`.

Useful container commands:

```powershell
docker stop student-app
docker start student-app
docker logs student-app
docker rm -f student-app
docker rm -f student-container
```

## Part B: Build the Dockerfile example

The Dockerfile automates installing Node.js, installing dependencies, copying
the application, and starting the server. From this folder:

```powershell
docker build -t student-management:dockerfile .
docker run -d --name student-app-dockerfile -p 4000:3000 student-management:dockerfile
```

The API is available at `http://localhost:4000/students`. Stop or remove the
Part A container first if it is already using host port 4000.

For the separate Docker Hub example in the handout, a published image can be
started with:

```text
docker run -p 3030:3000 <username>/my-node-app:latest
```

Publishing requires a Docker Hub account and authentication; this practical
does not upload images or credentials.

## Screenshots for submission

Save genuine screenshots in a `screenshots` folder beside this README. Capture:

1. `docker ps` showing `student-container` running.
2. `node --version` and `npm --version` inside `student-container`.
3. `ls -la /app` showing the copied project files.
4. `docker image ls student-management` showing `student-management:v1`.
5. The successful `docker save`, `docker load`, and restored image.
6. `docker ps` showing `student-app` and its `0.0.0.0:4000->3000/tcp` port mapping.
7. Browser responses for `/`, `/students`, and `/students/1` at port 4000.

`screenshots/host-api-students.png` is an actual browser capture of the local
host-side `/students` endpoint; it is not evidence of a Docker deployment.
Screenshots are evidence of commands actually run; do not substitute mock
images. Docker Desktop must be running to capture the container and image
evidence.
