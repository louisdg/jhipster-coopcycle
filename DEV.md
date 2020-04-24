
https://github.com/mastering-microservices/tutorial/blob/master/monolith-mvn.md

```
npalix@yttrium coopcycle $ jhipster
INFO! Using JHipster version installed globally
INFO! Running default command
INFO! Executing jhipster:app
INFO! Options: from-cli: true


        ██╗ ██╗   ██╗ ████████╗ ███████╗   ██████╗ ████████╗ ████████╗ ███████╗
        ██║ ██║   ██║ ╚══██╔══╝ ██╔═══██╗ ██╔════╝ ╚══██╔══╝ ██╔═════╝ ██╔═══██╗
        ██║ ████████║    ██║    ███████╔╝ ╚█████╗     ██║    ██████╗   ███████╔╝
  ██╗   ██║ ██╔═══██║    ██║    ██╔════╝   ╚═══██╗    ██║    ██╔═══╝   ██╔══██║
  ╚██████╔╝ ██║   ██║ ████████╗ ██║       ██████╔╝    ██║    ████████╗ ██║  ╚██╗
   ╚═════╝  ╚═╝   ╚═╝ ╚═══════╝ ╚═╝       ╚═════╝     ╚═╝    ╚═══════╝ ╚═╝   ╚═╝

                            https://www.jhipster.tech

Welcome to JHipster v6.8.0
Application files will be generated in folder: /Users/npalix/Build/genie-log/coopcycle
 _______________________________________________________________________________________________________________

  Documentation for creating an application is at https://www.jhipster.tech/creating-an-app/
  If you find JHipster useful, consider sponsoring the project at https://opencollective.com/generator-jhipster
 _______________________________________________________________________________________________________________

WARNING! Your Node version is not LTS (Long Term Support), use it at your own risk! JHipster does not support non-LTS releases, so if you encounter a bug, please use a LTS version first.
? May JHipster anonymously report usage statistics to improve the tool over time? No
? Which *type* of application would you like to create? Monolithic application (recommended for simple projects)
? [Alpha] Do you want to make it reactive with Spring WebFlux? No
? What is the base name of your application? coopcycle
? What is your default Java package name? com.mycompany.myapp
? Do you want to use the JHipster Registry to configure, monitor and scale your application? No
? Which *type* of authentication would you like to use? JWT authentication (stateless, with a token)
? Which *type* of database would you like to use? SQL (H2, MySQL, MariaDB, PostgreSQL, Oracle, MSSQL)
? Which *production* database would you like to use? PostgreSQL
? Which *development* database would you like to use? PostgreSQL
? Do you want to use the Spring cache abstraction? Yes, with the Ehcache implementation (local cache, for a single node)
? Do you want to use Hibernate 2nd level cache? Yes
? Would you like to use Maven or Gradle for building the backend? Maven
? Which other technologies would you like to use? (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Which *Framework* would you like to use for the client? Angular
? Would you like to use a Bootswatch theme (https://bootswatch.com/)? Default JHipster
? Would you like to enable internationalization support? Yes
? Please choose the native language of the application English
? Please choose additional languages to install French
? Besides JUnit and Jest, which testing frameworks would you like to use? (Press <space> to select, <a> to toggle all, <i> to invert selection)Gatling,
 Cucumber, Protractor
? Would you like to install other generators from the JHipster Marketplace? Yes
? Which other modules would you like to use? (generator-jhipster-docker-2.5.0) Additional Docker support: Docker Hub, Local SMTP Server, NGinx, (genera
tor-jhipster-swagger-cli-3.0.1) JHipster module to generate swagger client code from a swagger definition, (generator-jhipster-leafletmap-2.0.0) This m
odule generates a leaflet map in a new page of a monolithic and Angular 5 jhipster application (4.14.1)., (generator-jhipster-testcontainers-1.0.0) A J
hipster module to run integration tests with java testcontainers, (generator-jhipster-administration-database-1.0.4) This module allows you to generate
 .yml files allowing you to administrate your production database (managing databases likephpmyadmin). For the moment the following databases are suppo
rted : MYSQL, POSTGRESQL, MONGODB, MARIADB., (generator-jhipster-database-backup-1.0.7) The purpose of this module is to perform periodic backups of yo
ur database. This backup docker image currently supports MYSQL, POSTGRESQL, MONGODB and MARIADB.
```

# Génération modèle

```
jhipster import-jdl coopcycle.jh
```

# Ajout du CI-CD

```
 npalix@yttrium coopcycle $ jhipster ci-cd
INFO! Using JHipster version installed locally in current project's node_modules
INFO! Executing jhipster:ci-cd
INFO! Options: from-cli: true
🚀 Welcome to the JHipster CI/CD Sub-Generator 🚀
? What CI/CD pipeline do you want to generate? Jenkins pipeline
? Would you like to perform the build in a Docker container ? Yes
? Would you like to send build status to GitLab ? Yes
? What tasks/integrations do you want to include ? Deploy your application to an *Artifactory*, Analyze your code with *Sonar*, Build and publish a *Docker* image, Deploy to *Heroku*
 (requires H`EROKU_API_KEY set on CI service)
? *Artifactory*: what is the ID of distributionManagement for snapshots ? snapshots
? *Artifactory*: what is the URL of distributionManagement for snapshots ? http://artifactory:8081/artifactory/libs-snapshot
? *Artifactory*: what is the ID of distributionManagement for releases ? releases
? *Artifactory*: what is the URL of distributionManagement for releases ? http://artifactory:8081/artifactory/libs-release
? *Sonar*: what is the name of the Sonar server ? sonar
? *Heroku*: name of your Heroku Application ? coopcycle
   create Jenkinsfile
   create src/main/resources/idea.gdsl
 conflict pom.xml
? Overwrite pom.xml? overwrite
    force pom.xml
   create src/main/docker/jenkins.yml
   create src/main/docker/docker-registry.yml
INFO! Congratulations, JHipster execution is complete!
```

# Dockers

``` $ ls src/main/docker/
app.yml             grafana             monitoring.yml      prometheus
docker-registry.yml jenkins.yml         postgresql.yml      sonar.yml
```

# SONAR
```
docker-compose -f src/main/docker/sonar.yml up -d
docker-compose -f src/main/docker/sonar.yml logs -f
```
Attendez qu'il soit démarré et prêt au service.

Lancez l'analyseur SonarQube
```bash
# mkdir -p /Users/npalix/Build/genie-log/coopcycle/target/test-results/integrationTest
yarn run test
./mvnw initialize sonar:sonar
./mvnw -Pprod  verify sonar:sonar
```

Visualisez le rapport de l'analyseur SonarQube
```bash
open http://localhost:9001
```

# Jenkins

```
# wget http://mirrors.jenkins.io/war-stable/latest/jenkins.war

#docker container run -d --name jenkins2 -p 18080:8080 -p 50000:50000 jenkins/jenkins
#docker logs jenkins2

docker-compose -f src/main/docker/jenkins.yml up -d
docker logs docker_jenkins_1

#docker  exec -it <container_id> /bin/bash
#cat /var/jenkins_home/secrets/initialAdminPassword
```

```bash
open http://localhost:49001/
```


Dans les parametres du compte gitlab, 
```User Settings -> Access Tokens```
Générer un token d'identification avec les droits
en lecture sur le dépôt.


# Docker

## Deliver as a container

```
./mvnw package -Pprod verify jib:dockerBuild
```

## Run as a container
```
docker-compose -f src/main/docker/app.yml up
```
