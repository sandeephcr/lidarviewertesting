## To run tests just execute the below commands:

Headless mode - `npm test`

Without Headless mode - `npm test-headed`

## To run the tests from the Ui follow the below steps:

1. npx cypress open(cypress dialog is opened)
2. Select e2e testing
3. Select chrome and click on start e2e testing button
4. Select the test file to run that ends with `.cy.js`

## To run single test execute the below command:

Headless mode - `npx cypress run --spec .\cypress\e2e\<filename>.cy.js`

Without Headless mode - `npx cypress run --spec .\cypress\e2e\<filename>.cy.js --headed`
