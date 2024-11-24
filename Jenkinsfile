pipeline {
    agent any
    triggers {
        githubPush() // Триггер на событие push
    }
    stages {
        stage('Start') {
            steps {
                echo "Webhook received! Starting pipeline for NodeJWT project."
            }
        }
    }
}
