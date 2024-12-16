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
    "pageObjects-chromium": "npx playwright test --project=chromium-regression --headed",
    "pageObjects-chromium-smoke": "npx playwright test --project=chromium-regression --headed --grep @smoke",
    "pageObjects-firefox": "npx playwright test --project=firefox-regression --headed",
    "pageObjects-all-first-chromuim-then-firefox": "npm run pageObjects-chromium && npm run pageObjects-firefox",
    "pageObjects-all-paralel-run-chromuim-firefox": "npm run pageObjects-chromium & npm run pageObjects-firefox",
    "pageObjects-chromium-dev": "BASE_URL=https://conduit.bondaracademy.com npx playwright test --project=chromium-regression --headed"
  }
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
