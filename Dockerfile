# Initialize the container with an OpenJDK 17 environment based on Alpine Linux
FROM openjdk:17-jdk-alpine

# Designate the working area within the container
WORKDIR /app

# Transfer the compiled JAR from your local target directory to the container
COPY target/D387_sample_code-0.0.2-SNAPSHOT.jar /app/D387_sample_code-0.0.2-SNAPSHOT.jar

# Make your application's network port available to the outside (adjust as needed)
EXPOSE 8080

# Define the command to start your Java application
CMD ["java", "-jar", "D387_sample_code-0.0.2-SNAPSHOT.jar"]
