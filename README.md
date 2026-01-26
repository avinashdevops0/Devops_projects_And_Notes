# Devops_projects_And_Notes


docker run -itd   --name jenkins   --rm   -u root   -p 8080:8080   -p 50000:50000   -v $(which docker):/usr/bin/docker   -v $HOME/.jenkins:/var/jenkins_home   -v /var/run/docker.sock:/var/run/docker.sock   jenkins/jenkins:latest