# Development server

- ### Build docker

  1.  `docker-compose build`

- ### Install node modules

  - `docker-compose run client yarn`

- ### Run python migrations

  - `docker-compose run server python manage.py migrate`

- ### Run docker

  - `docker-compose up`

- ### Create superuser
  - `docker-compose run django python manage.py createsuperuser`

