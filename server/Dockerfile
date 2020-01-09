FROM python:3.8

RUN apt-get install libjpeg-dev zlib1g-dev
ADD ./requirements.txt /tmp/requirements.txt
RUN pip install --upgrade pip
RUN pip install -r /tmp/requirements.txt
RUN apt-get update
RUN apt-get install binutils libproj-dev gdal-bin -y
