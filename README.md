# Devops_projects_And_Notes


docker run -itd   --name jenkins   --rm   -u root   -p 8080:8080   -p 50000:50000   -v $(which docker):/usr/bin/docker   -v $HOME/.jenkins:/var/jenkins_home   -v /var/run/docker.sock:/var/run/docker.sock   jenkins/jenkins:latest


What deploy: actually does (important)

Example:

deploy:
  replicas: 2
  restart_policy:
    condition: on-failure
  update_config:
    parallelism: 1
    delay: 10s

Meaning:

replicas: 2 → run 2 containers

restart_policy → auto-restart on crash

parallelism: 1 → update one container at a time

delay: 10s → wait 10 seconds between updates

This gives you zero-downtime deployments.