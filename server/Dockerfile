FROM python:3.7.2

ADD ./requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt
RUN apt-get update
RUN apt-get install binutils libproj-dev gdal-bin -y
