pipeline {
  agent {
    label 'build'
  }
  triggers {
    pollSCM('0 0 1 1 *')
  }
  stages {
    stage('Build') {
      steps {
        echo 'Publish'
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: '4060820b-d1ca-4045-8ec1-2b530809e137',
            usernameVariable: 'NEXUS_USERNAME_VARIABLE', passwordVariable: 'NEXUS_PASSWORD_VARIABLE']]) {
            nodejs(nodeJSInstallationName: 'nodejs-10-11-0') {
              sh "sh install.sh; npm run build"
            }
        }
      }
    }
    stage('Docker Publish') {
      when {
        branch 'master'
      }
      steps {
        echo 'Docker Publish'
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: '4060820b-d1ca-4045-8ec1-2b530809e137',
            usernameVariable: 'NEXUS_USERNAME_VARIABLE', passwordVariable: 'NEXUS_PASSWORD_VARIABLE']]) {
          sh 'set +x; docker login -u $NEXUS_USERNAME_VARIABLE -p $NEXUS_PASSWORD_VARIABLE registry.streamarchitect.io'
          sh "docker build -t registry.streamarchitect.io/template-js-reactjs:latest ."
          sh "docker push registry.streamarchitect.io/template-js-reactjs:latest"
        }
      }
    }
  }
}
