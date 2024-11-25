pipeline {
    agent any
    triggers {
        githubPush()
    }
    stages {
        stage('Start') {
            steps {
                echo "Webhook received! Starting pipeline for NodeJWT project."
            }
        }
    }
}