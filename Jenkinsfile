pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        DOCKER_COMPOSE_FILE = "docker-compose.yml"
        GIT_COMMIT_HASH = "${env.GIT_COMMIT}"
    }

    stages {
        stage('Debug Environment') {
            steps {
                script {
                    sh 'echo "GIT_COMMIT_HASH: ${GIT_COMMIT_HASH}"'
                    sh 'env | grep GIT_COMMIT_HASH || echo "GIT_COMMIT_HASH not set"'
                }
            }
        }

        stage('Checkout') {
            steps {
                // Проверить код из репозитория
                checkout scm
                echo "Git Commit: ${env.GIT_COMMIT}"
            }
        }

        stage('Stop Previous Containers') {
            steps {
                script {
                    // Остановить предыдущие контейнеры, если они запущены
                    sh '''
                    if [ $(docker ps -q | wc -l) -gt 0 ]; then
                        echo "Stopping existing containers..."
                        docker-compose -f $DOCKER_COMPOSE_FILE down
                    else
                        echo "No running containers to stop."
                    fi
                    '''
                }
            }
        }

        stage('Build Images') {
            steps {
                // Собрать образы
                script {
                    sh '''
                        docker-compose -f $DOCKER_COMPOSE_FILE build --build-arg GIT_COMMIT_HASH=${GIT_COMMIT_HASH}
                    '''
                }
            }
        }

        stage('Start Containers') {
            steps {
                // Запустить контейнеры
                script {
                    sh 'docker-compose -f $DOCKER_COMPOSE_FILE up -d'
                }
            }
        }
    }
}

