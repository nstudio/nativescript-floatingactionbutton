https://docs.microsoft.com/en-us/azure/devops/pipelines/create-first-pipeline?view=azure-devops&tabs=java%2Cyaml%2Cbrowser%2Ctfs-2018-2

- Need a Azure DevOps Account
- Create a new Pipeline
- Select Repository for your account
- Choose base start pipeline template
- Copy the following for the pipeline.yml file

```yml
trigger:
- master

pool:
  vmImage: 'macOS-latest'

steps:
- script: echo Hello, world!
  displayName: 'Run a one-line script'

- script: |
    npm i -g typescript && echo no | npm i -g nativescript && tns usage-reporting disable && tns error-reporting disable && cd src && npm i && tsc
    sudo pip install --upgrade pip && sudo pip install six
  displayName: 'Base Setup for NativeScript Builds'

- script: |
    tns build ios --env.uglify
  displayName: 'iOS Build'

- script: |
    tns build android --env.uglify
  displayName: 'Android Build'
  ```

- Push the .yml file to your repo and on the Pipelines site, hit the Run New button and the project should build assuming the paths are not modified locally by the user app other than expected default project setup for NativeScript apps.
