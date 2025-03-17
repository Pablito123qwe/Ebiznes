FROM ubuntu:24.04


RUN apt-get update && apt-get install -y software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get update && apt-get install -y python3.10
RUN update-alternatives --install /usr/bin/python3 python3 $(which python3.10) 1
