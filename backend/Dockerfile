# 1️⃣ Use an official Java runtime as a base image
FROM eclipse-temurin:17-jdk-alpine

# 2️⃣ Set working directory inside container
WORKDIR /app

# 3️⃣ Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# 4️⃣ Build the Spring Boot app
RUN ./mvnw dependency:go-offline
RUN ./mvnw clean package -DskipTests

# 5️⃣ Expose port 8080
EXPOSE 8080

# 6️⃣ Run the JAR file
ENTRYPOINT ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
