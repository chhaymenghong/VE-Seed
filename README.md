# Installation
- Install Node 10.8.0.
- Install Angular-Cli:  ```npm install -g @angular/cli```.
- Install dependencies: ```npm install```.
- If nvm is used to manage node versions, make sure set Node 10.8.0 as the default: ```nvm alias default 10.8.0```, so that if Husky is used to manage git hooks such as precommit and prepush, it will use Node 10.8.0 to run those tasks. 

# Project Overview
This project is created using Angular-Cli with this command: ```ng new VE —-prefix ve —-style=scss```. "ve" is used by default for selectors prefix and scss is used for stylesheet file extension.For conveniences and consistencies, always use Angular-Cli to add new components/services/directives and other Angular entities.

## Project Structure
This repo has most if not all of the development toolings that we need. However, the project structure is still very basic. See "Useful links and tips" section on how to expand on this as needed to match the project’s size and needs:
- assets folder: store art works, images and fonts here, but not stylesheet files
- app/components: store components 
- app/services: stores services
- app/directives: store directives
- app/stlyes: store global styesheet and scss partials such as colors and mixin files

## Scripts in package.json
- ```npm start```: serve the app using opencaeuat as the default proxy server to get mms data
- ```npm run opencae```: serve the app using opencaetest as the proxy server
- ```npm run opencaetest```: serve the app using opencaetest as the proxy server
- ```npm run opencaeint```: serve the app using opencaeint as the proxy server
- ```npm run test```: run both spec and end to end tests
- ```npm run parallel-lint```: lint typescript and scss file as well as style blocks in html files in parallel 
- ```npm run parallel-lint-autofix```: auto fix linting errors in parallel
- ```npm run sequential-lint```: lint typescript and scss files as well as style blocks in html files sequentially. Use this  for linting job on Circl CI
- ```npm run stylelint```: lint scss files and style blocks in html files 
- ```npm run documentation```: generate a documentation for the project
- ```npm run prod-build```: build the project in production mode. Use this for generate build before on Circle CI before deploying to JFrog Artifactory
- ```npm run deploy```: deploy the artifact. Configure config.yml to use this for deploying build to JFrog on Circle CI. Special environment variables such as Artifactory URL and credentials should be set up on Circle CI.

If you want to use precommit and prepush git hooks to perform certains tasks such as linting and testing, add the follow to package.json:
- ```"precommit": "ng run VE:lint && npm run stylelint && ng run VE-e2e:lint"```
- ```"prepush": "npm run test"```

## Explanation on some of the important files and configuration
- ```proxy.conf.js``` contains proxy configuration. Proxy configuration is only used during development
- ```browserslist``` contains list of of browsers to support. Angular-Cli uses this to add auto-prefix to styleing rules where necessary
- ```VE/tslint.json``` and ```src/tslint.json``` contains linting rules for typscript files 
- ```.stlyelintrc.json``` contains linting rules for scss files and style blocks in html files. Stylelint is used for style linting
- ```.stylelintignore```  contains file patterns for files that Stylelint should ignore
- ```tsconfig**.json``` contains configuration that governs the transpilation process from typescript to javascript
- ```angular.json``` contains configuration for Angular-Cli to perform tasks including but no limited to serving the app, linting, testing, proxying
- ```prefix``` in ```angular.json``` is used to automatically append prefix to selectors when a new component or directive is created 
- ```styleext``` specifies the stylesheet extension used when a new stylesheet file is generated
- ```styles``` specifies global stylesheet and vendor files
- ```stylePreprocessorOptions:includePaths``` is used to resolve stylesheet files when ```@import``` is used without using relative path
- ```config.yml``` contains jobs for Circle CI to run. Testing and Linting jobs are run by Circle CI automatically on git push to any branches except for master. Deployment to JFrog artifactory job is run by Circle CI automatically on successful merge from other branches to master. Deployment job is exclusively for master branch only.
- master and development branches should be protected by enabling the following options in github:
  - ```Protect this Branch```
  - ```Require pull request reviews before merging```
  - ```Require status checks to pass before merging```
  - ```“Require branches to be up to date before merging```
  - ```Select ci/circleci: lint and ci/circleci: test```
This way, all other branches must pass all the testing and linting requirements before allowed to merge into development branch. The same requirement also apply to merging from development to master branch
- ```deploy.sh``` contains logics for artifact deployment. We shouldn’t have to execute this file directly. Circle CI will run this baed on the deployment job specified in config.yml
	
## Useful links and tips
- Guide on how to structure a big Angular Project
  - https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7
- Document generation
  - https://compodoc.app/guides/installation.html 
- How Angular.json file works
  - https://github.com/angular/angular-cli/wiki/1-x-stories ,
  - https://nitayneeman.com/posts/understanding-the-angular-cli-workspace-file/ 
- Using Angular Cli to generate Angular components, directives …
  - https://github.com/angular/angular-cli/wiki/generate 
- Configuring server proxies
  - https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md
- Auto prefixing with Angular
  - https://github.com/angular/angular-cli/wiki/stories-autoprefixer
  - https://github.com/angular/angular-cli/wiki/stories-autoprefixer
- Docker images to choose from for Circle CI integration
  - https://github.com/CircleCI-Public/circleci-dockerfiles/tree/master/node/images
- How to configure config.yml file
  - https://github.com/CircleCI-Public/circleci-demo-workflows/blob/sequential-branch-filter/.circleci/config.yml
- Adding browser supports
  - https://github.com/browserslist/browserslist
- typescript linting
  - https://github.com/buzinas/tslint-eslint-rules
  - https://palantir.github.io/tslint/
- Easily customize linting rules for stylsheet with
  - https://maximgatilin.github.io/stylelint-config/ 
- Standard configuration for Stylelint
  - https://github.com/stylelint/stylelint-config-standard
- Creating custom angular builder to do custom tasks
  - https://github.com/meltedspark/angular-cli-builders
- Using http interceptor to refactor codes
  - https://scotch.io/@kashyapmukkamala/using-http-interceptor-with-angular2
- Allowing multiple prefixes in the project
  - In angular.json, change ```"prefix" : "ve" to "prefix": [prefix1, prefix2, …]```
- This project uses parallelshell to run some tasks in parallel
  - parallelshell is fixed at 3.0.1 because 3.0.2 has a known issue with Node version > 10.x
- Consider using other popular GitHub apps to add more automation such Sentry, Greenkeeper, LGTM

# Common Practices

## Creating a new service
- ```ng g s services/name```: to create a service class and a spec file under ```services/name``` folder. ```.service”``` suffix is added automatically to the file names. Keeping the spec and the service files next to each other is convenient for updating both the service and test codes. By default, a new service is a singleton created for root injector and this is what we want most of the times.
- Try to make the functionalities in the service class as pure as possible to make unit testing them easy.

## Creating a new component
- Add more description on smart component and dumb component
- Create a new component to encapsulate a specific visual aspect of the application
- ```ng g components/nane``` to create a component folder with ```name``` as its name along with a component class, style, html and spec files. Appropriate file suffices are added by default. Also, component selector prefix is also added by default per specification in angular.json file. Angular-Cli will also automatically add this new component to the app module declaration list so that it can be used anywhere within the app module

## Creating a new directive
- ```ng g d directives/name/directiveName```: to create a folder with “name” as its name along with a spec and directive file
- There are two types of directives; structural directives, used to add or remove element from the DOM, and attribute directives, used to change the styling or behavior of elements. Only create a new directive for these reasons.

## Styling
- Put scss partials under styles/global and prefix them with “_” as a convention
- Component specific styles should go inside its respective scss file not only as a good practice but also for better performance and simplicity.
- To use scss partials in a component scss file, just import them.
- Global styles should go to ```styles/main.scss```
	
## Testing scenarios to think about
- Testing a service
   - what to test
   - without any dependencies
   - with other services as dependencies
   - with third party libraries as dependencies
- Testing a component
  - what to test
    - Test the behavior of the component class ( check input, output )
    - Test the interaction between the component dom and states ( dom assertion )
    - Test to make sure that the template and the component class work together as expected
  - without any dependencies
  - with other components as dependencies
  - with services as dependencies
  - with third party library as dependencies
  - with other directives as dependencies
  - include testing the component’s DOM behavior

- Testing a directive
  - what to test
  - without any dependencies
  - with other directives as dependencies
  - with third party library as dependencies
  - include testing the directive’ DOM behavior

## Useful links and tips:
- Official Angular style guide that we should follow
  - https://angular.io/guide/styleguide
- Testing Angular application
  - https://angular.io/guide/testing
- Component Vs Directive
  https://stackoverflow.com/questions/34613065/what-is-the-difference-between-component-and-directive
- Organizing styling structure
  - https://medium.com/@kmathy/angular-tips-and-tricks-for-css-structure-cb73fa50f0e8 
- Setting up scss and bootstrap with Angular
  - https://scotch.io/tutorials/using-sass-with-the-angular-cli
- View Encapsulation in Angular
  - https://blog.thoughtram.io/angular/2015/06/29/shadow-dom-strategies-in-angular2.html

## Creating a shareable module between projects:
- If we intent to share client rest api to mms with other project, consider creating a separate angular module just for that
  

