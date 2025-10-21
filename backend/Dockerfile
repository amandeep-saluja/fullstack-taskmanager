# 1️⃣ Use an official Java runtime as a base image
FROM eclipse-temurin:17-jdk-alpine

# 2️⃣ Install Maven
RUN apk add --no-cache maven

# 3️⃣ Set working directory inside container
WORKDIR /app

# 4️⃣ Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# 5️⃣ Build the Spring Boot app
RUN mvn dependency:go-offline
RUN mvn clean package -DskipTests

# 6️⃣ Expose port 8080
EXPOSE 8080

# 7️⃣ Run the JAR file
ENTRYPOINT ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
