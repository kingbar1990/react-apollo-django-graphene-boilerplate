FROM python:3.8

RUN apt-get install libjpeg-dev zlib1g-dev
COPY Pipfile /
COPY Pipfile.lock /
RUN pip install -U pipenv pip setuptools wheel
RUN pipenv install --system --ignore-pipfile
RUN apt-get update
RUN apt-get install binutils libproj-dev gdal-bin -y
