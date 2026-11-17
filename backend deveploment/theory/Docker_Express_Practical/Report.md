---
layout: report
title: Docker and Express Practical
---

# Docker and Express Practical Report

## Aim

Create a Student Management REST API with Express, configure and run it in an
Ubuntu 24.04 Docker container, save the configured container as an image with
`docker commit`, export and reload that image, and deploy it using port
mapping.

## Learning objectives

- Create an Express application with GET, POST, and DELETE routes.
- Install Node.js, npm, and application dependencies in an Ubuntu container.
- Copy host project files into a running container with `docker cp`.
- Distinguish an image from a container and save a configured container using
  `docker commit`.
- Export and restore an image using `docker save` and `docker load`.
- Publish a container port to the host with Docker port mapping.
- Compare the manual container workflow with a Dockerfile-based build.

## Application

The API source is in `app.js`. It keeps student records in a JavaScript array
and provides:

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/` | Welcome message |
| GET | `/students` | List all students |
| GET | `/students/:id` | Find one student |
| POST | `/students` | Add a student with `name` and `course` |
| DELETE | `/students/:id` | Delete a student |

The server listens on `0.0.0.0:3000` so Docker can forward requests to it.
Records are in memory and are not persisted across server restarts.

## Procedure

Follow the PowerShell commands in [README.md](./README.md). The manual workflow
uses the `student-container` Ubuntu container, copies the app into `/app`,
installs dependencies there, and commits it as `student-management:v1`.
The image is exported to `student-management.tar`, removed from the local
image store, and loaded again before running `student-app` with host port 4000
mapped to container port 3000.

Part B uses the included `Dockerfile` to build a repeatable image instead of
manually changing a running container.

## Verification

Verify the API at `http://localhost:4000/` and
`http://localhost:4000/students`. Test the individual-student, create, and
delete routes as described in the README. Check `docker ps`, `docker logs
student-app`, and `docker image ls student-management` to confirm container
status, startup, and image availability.

## Screenshot evidence

Save screenshots of the running Ubuntu container, Node.js/npm versions, files
in `/app`, custom image, image save/load, running application with port
mapping, and browser API responses in `screenshots/`. The included
`screenshots/host-api-students.png` documents a local host-side API response;
it is not a Docker deployment screenshot. Only attach container/image
screenshots captured from the actual Docker workflow.

## Conclusion

The practical demonstrates how a configured container can be committed and
transferred as an image, then launched with a host-to-container port mapping.
The Dockerfile section shows how to reproduce the application setup
consistently.
