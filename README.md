# js-playwright
playwright
Start project
* Create empty project folder.
* Open with VS
* Run ```npm init playwright@latest``` in VS terminal.
* Install playwright extension in VS.

Run tests from terminal
* ```npx playwright test``` - will run all tests.
* ```npx playwright test --project=chromium --headed``` - will run all tests in chromium in headed mode.
* ```npx playwright test --project=chromium --headed --grep @smoke``` - will run all smoke tests in chromium in headed mode.
* ```npx playwright test example.spec.ts --project=chromium-regression --headed```	- will run all tests from example.spec.ts file  in chromium in headed mode.
* ```npx playwright test -g "has title" --project=chromium-regression --headed```	- will run “has title” test in chromium in headed mode.
* ```npx playwright test --project=chromium —trace on 				    ``` - will run all tests in chromium with trace ON feature, by default playwright.config has trace: 'on-first-retry'.
* ```npx playwright test --project=chromium --debug``` - will run all tests in chromium with debug mode.
* ```npx playwright test example.spec.ts --project=chromium-regression --headed```	- will run all tests from example.spec.ts file  in chromium in headed mode.
* ```npx playwright test --config=playwright-prod.config.ts```	 - will run all tests with custom playwright-prod.config.ts file.

Run tests from package.json
* add run cmd to “scripts”
```  
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "regression-chromium": "npx playwright test --project=chromium",
    "regression-chromium-withui": "npx playwright test --project=chromium --headed"
  },
```
* Run cmd in terminal: ```npm run pageObjects-chromium```.


Run tests from VS
* Go to “Testing” tab.
* Select browser and other options in the bottom.
* Run / debug test(s). 

Run tests from playwright UI.
* Go to terminal: ```npx playwright test --ui```.

Show report
* Go to terminal: ```npx playwright show-report```.

Start JS app on localhost
* Go to terminal: ```npm start```.

Additional libs:
* faker lib for data fakers: ```npm i @faker-js/faker --save-dev --force```
* dotenv lib to get env values from ‘.env’ file Firstly enabled import in playwright.config.ts, then created values in .env file, then use this values in tests as process.env.BASE_URL

Start with docker and dockerfile:
* Create .Dockerfile
* run ```docker build -t js-playwright-ui-test .```
* go to docker inside ```docker run -it js-playwright-ui-test```
* run ```npm run regression-chromium```, where ```regression-chromium``` project from package.json

Start with docker-compose and dockerfile:
* Create .Dockerfile
```
FROM mcr.microsoft.com/playwright:v1.49.1-noble

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm install --force
RUN npx playwright install

```
* Create docker-compose.yaml file
```
version: '3.8'

services:
  js-playwright-ui-test:
    image: js-playwright-ui-test
    build: 
      context: .
      dockerfile: ./Dockerfile
    command: npm run regression-chromium
    volumes:
      - ./playwright-report:/app/playwright-report
      - ./test-results:/app/test-results
```
* Build docker-compose file ```docker-compose up --build ```