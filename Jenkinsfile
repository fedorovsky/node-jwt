pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        DOCKER_COMPOSE_FILE = "docker-compose.yml"
        GIT_COMMIT_HASH = "${env.GIT_COMMIT}"
        GITHUB_TOKEN = credentials('github-token')
        GITHUB_REPO = 'fedorovsky/node-jwt'
    }

    stages {
        stage('Checkout') {
            steps {
                // Проверить код из репозитория
                checkout scm
                echo "Git Commit: ${env.GIT_COMMIT}"
            }
        }

        stage('Notify GitHub (Build in Progress)') {
            steps {
                script {
                    def commitSHA = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
                    sh """
                        curl -X POST \
                        -H "Authorization: token ${GITHUB_TOKEN}" \
                        -H "Accept: application/vnd.github+json" \
                        -d '{
                            "state": "pending",
                            "target_url": "${env.BUILD_URL}",
                            "description": "Build is in progress",
                            "context": "Jenkins Build"
                        }' \
                        https://api.github.com/repos/${GITHUB_REPO}/statuses/${commitSHA}
                    """
                }
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
    post {
        success {
            script {
                def commitSHA = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
                sh """
                    curl -X POST \
                    -H "Authorization: token ${GITHUB_TOKEN}" \
                    -H "Accept: application/vnd.github+json" \
                    -d '{
                        "state": "success",
                        "target_url": "${env.BUILD_URL}",
                        "description": "Build completed successfully",
                        "context": "Jenkins Build"
                    }' \
                    https://api.github.com/repos/${GITHUB_REPO}/statuses/${commitSHA}
                """
            }
        }
        failure {
            script {
                def commitSHA = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
                sh """
                    curl -X POST \
                    -H "Authorization: token ${GITHUB_TOKEN}" \
                    -H "Accept: application/vnd.github+json" \
                    -d '{
                        "state": "failure",
                        "target_url": "${env.BUILD_URL}",
                        "description": "Build failed",
                        "context": "Jenkins Build"
                    }' \
                    https://api.github.com/repos/${GITHUB_REPO}/statuses/${commitSHA}
                """
            }
        }
    }
}

