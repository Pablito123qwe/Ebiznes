FROM ubuntu:24.04

#Python 3.10
RUN apt-get update && apt-get install -y software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get update && apt-get install -y python3.10
RUN update-alternatives --install /usr/bin/python3 python3 $(which python3.10) 1

#Java + kotlin
RUN apt-get install openjdk-8-jdk -y
RUN apt-get update && apt-get install -y zip unzip curl
RUN curl -s https://get.sdkman.io | bash
RUN bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install kotlin"

#Gradle + JDBC SQLite
ENV GRADLE_VERSION=8.13
RUN curl -L https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip -o gradle-bin.zip \
    && unzip gradle-bin.zip -d /opt/gradle \
    && rm gradle-bin.zip \
    && ln -s /opt/gradle/gradle-${GRADLE_VERSION}/bin/gradle /usr/local/bin/gradle
WORKDIR /app
COPY . /app
WORKDIR /app/HelloWorld
