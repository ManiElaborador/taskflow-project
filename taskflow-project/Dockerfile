FROM eclipse-temurin:17

WORKDIR /app

COPY target/taskflow-project-0.0.1-SNAPSHOT.war app.war

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.war"]