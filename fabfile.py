import os
import datetime

from fabric import Connection
from invocations.console import confirm
from invoke import task

""" Change to your parameters and constants here """

DEV_PROJECT_PATH = os.path.join('/', 'home', 'username', 'projects',
                                'projectname')
STAGE_PROJECT_PATH = os.path.join('/', 'var', 'www', 'projectname')
PROD_PROJECT_PATH = os.path.join('/', 'home', 'ubuntu', 'projectname')

DOCKER_COMPOSE_STAGE_FILE_NAME = 'docker-compose.stage.yaml'
DOCKER_COMPOSE_PROD_FILE_NAME = 'docker-compose.prod.yaml'

DOCKER_DJANGO_CONTAINER_NAME = 'server'
DOCKER_DATABASE_CONTAINER_NAME = 'db'
DOCKER_NODE_CONTAINER_NAME = 'node'

DATABASE_NAME = 'project_db'
DATABASE_USER_NAME = 'username_db'

DEV_SERVER_HOST = 'localhost:8000'
STAGE_SERVER_HOST = 'localhost:8000'
PROD_SERVER_HOST = 'localhost:8000'

STAGE_BRANCH_NAME = 'dev'
"""------------------------------"""

""" Set this parameters in env file"""

AWS_ID = os.environ.get('AWS_ID')  # aws-public-key
AWS_KEY = os.environ.get('AWS_KEY')  # aws-secret-key
AWS_REGION_NAME = os.environ.get('AWS_REGION_NAME')  # ap-southeast-2
AWS_BACKUP_BUCKET_NAME = os.environ.get('AWS_BACKUP_BUCKET_NAME')  # backups-bucket
"""------------------------------"""

server = ''
current_time = datetime.datetime.now().strftime("%d-%m-%Y")


def pull(server, PROJECT_PATH):
    with server.cd(PROJECT_PATH):
        print('Start getting files from bitbucket')
        if confirm('Stash and pull?'):
            server.run('git stash')
            if PROJECT_PATH == STAGE_PROJECT_PATH:
                server.run('git pull origin {0}'.format(STAGE_BRANCH_NAME),
                           pty=True)
            elif PROJECT_PATH == PROD_PROJECT_PATH:
                server.run('git pull origin master', pty=True)
            else:
                server.run('git pull', pty=True)
            server.run('git stash pop')
    print('Getting files from bitbucket completed')


def stop_server(server, PROJECT_PATH):
    with server.cd(PROJECT_PATH):
        if server.host == DEV_SERVER_HOST:
            server.run('docker-compose kill')
        elif server.host == STAGE_SERVER_HOST:
            server.run('docker-compose -f {0} kill'.format(
                DOCKER_COMPOSE_STAGE_FILE_NAME))
        elif server.host == PROD_SERVER_HOST:
            server.run('docker-compose -f {0} kill'.format(
                DOCKER_COMPOSE_PROD_FILE_NAME))


def start_server(server, PROJECT_PATH):
    with server.cd(PROJECT_PATH):
        if server.host == DEV_SERVER_HOST:
            server.run('docker-compose up -d')
        elif server.host == STAGE_SERVER_HOST:
            server.run('docker-compose -f {0} up -d'.format(
                DOCKER_COMPOSE_STAGE_FILE_NAME))
        elif server.host == PROD_SERVER_HOST:
            server.run('docker-compose -f {0} up -d'.format(
                DOCKER_COMPOSE_PROD_FILE_NAME))


def rebuild_node(server, PROJECT_PATH):
    with server.cd(PROJECT_PATH):
        if server.host == DEV_SERVER_HOST:
            server.run('docker-compose run {0} yarn build'.format(
                DOCKER_NODE_CONTAINER_NAME))
        elif server.host == STAGE_SERVER_HOST:
            server.run(
                'docker-compose -f {0} run {1} yarn build'.format(
                    DOCKER_COMPOSE_STAGE_FILE_NAME,
                    DOCKER_NODE_CONTAINER_NAME))
        elif server.host == PROD_SERVER_HOST:
            server.run(
                'docker-compose -f {0} run {1} yarn build'.format(
                    DOCKER_COMPOSE_PROD_FILE_NAME, DOCKER_NODE_CONTAINER_NAME))


def create_dump(server, PROJECT_PATH):
    with server.cd(PROJECT_PATH):
        if server.host == DEV_SERVER_HOST:
            server.run(
                'docker-compose run {0} pg_dump --inserts -h {0} {1} -U {2} > {3}.sql'.format(
                    DOCKER_DATABASE_CONTAINER_NAME, DATABASE_NAME,
                    DATABASE_USER_NAME, current_time))
        elif server.host == STAGE_SERVER_HOST:
            server.run(
                'docker-compose -f {0} run {1} pg_dump --inserts -h {1} {2} -U {3} > {4}.sql'.format(
                    DOCKER_COMPOSE_STAGE_FILE_NAME,
                    DOCKER_DATABASE_CONTAINER_NAME, DATABASE_NAME,
                    DATABASE_USER_NAME, current_time))
        elif server.host == PROD_SERVER_HOST:
            server.run(
                'docker-compose -f {0} run {1} pg_dump --inserts -h {1} {2} -U {3} > {4}.sql'.format(
                    DOCKER_COMPOSE_PROD_FILE_NAME,
                    DOCKER_DATABASE_CONTAINER_NAME, DATABASE_NAME,
                    DATABASE_USER_NAME, current_time))


@task
def restart_stage_server(server):
    server = Connection(STAGE_SERVER_HOST)
    if confirm('Restart Staging server?'):
        stop_server(server, STAGE_PROJECT_PATH)
        if confirm('Rebuild yarn?'):
            rebuild_node(server, STAGE_PROJECT_PATH)
        start_server(server, STAGE_PROJECT_PATH)
        print('Stage server was restarted')
    else:
        print('Server restart is canseled')


@task
def restart_prod_server(server):
    server = Connection(PROD_SERVER_HOST)
    if confirm('Restart Production server?'):
        stop_server(server, PROD_PROJECT_PATH)
        if confirm('Rebuild yarn?'):
            rebuild_node(server, PROD_PROJECT_PATH)
        start_server(server, PROD_PROJECT_PATH)
        print('Production server was restarted')

    else:
        print('Server restart is canseled')


@task
def restart_local_server(server):
    server = Connection(DEV_SERVER_HOST)
    if confirm('Restart Production server?'):
        stop_server(server, DEV_PROJECT_PATH)
        if confirm('Rebuild yarn?'):
            rebuild_node(server, DEV_PROJECT_PATH)
        start_server(server, DEV_PROJECT_PATH)
        print('Production server was restarted')

    else:
        print('Server restart is canseled')


@task
def deploy(server):
    if confirm('Deploy to prod?'):
        server = Connection(PROD_SERVER_HOST)
        PROJECT_PATH = PROD_PROJECT_PATH
        print("Deploying to Production server")

    elif confirm('Deploy to stage?'):
        server = Connection(STAGE_SERVER_HOST)
        PROJECT_PATH = STAGE_PROJECT_PATH
        print("Deploying to Stage server")

    else:
        server = Connection(DEV_SERVER_HOST)
        PROJECT_PATH = DEV_PROJECT_PATH
        print("Deploying to Local server")

    stop_server(server, PROJECT_PATH)
    pull(server, PROJECT_PATH)

    if confirm('Rebuild yarn?'):
        rebuild_node(server, PROJECT_PATH)
    start_server(server, PROJECT_PATH)
    print("Deploying to server is done!")


@task
def dump_database(server):
    if confirm('Create dump at prod?'):
        server = Connection(PROD_SERVER_HOST)
        PROJECT_PATH = PROD_PROJECT_PATH
        print("Creating at Production server")

    elif confirm('Create dump at stage?'):
        server = Connection(STAGE_SERVER_HOST)
        PROJECT_PATH = STAGE_PROJECT_PATH
        print("Creating at Stage server")

    else:
        server = Connection(DEV_SERVER_HOST)
        PROJECT_PATH = DEV_PROJECT_PATH
        print("Creating at Local server")

    create_dump(server, PROJECT_PATH)
    print("Dump creating is done!")
