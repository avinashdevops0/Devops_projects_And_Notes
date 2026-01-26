docker run -d \
  --name jenkins \
  --rm \
  -u root \
  -p 8080:8080 \
  -p 50000:50000 \
  -v /usr/bin/docker:/usr/bin/docker \
  -v /usr/local/bin/docker-compose:/usr/local/bin/docker-compose \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:latest


apk update
apk add openjdk17-jre
java -version
apk add jenkins
echo "https://dl-cdn.alpinelinux.org/alpine/latest-stable/community" >> /etc/apk/repositories
apk update
apk add curl openjdk17-jre
curl -L -o jenkins.war https://get.jenkins.io/war-stable/latest/jenkins.war
java -jar jenkins.war --httpPort=8080 &>> jenkins.log & 
