# qa-frontend-cypress

Frontend testing for New Core using [Cypress](https://cypress.io)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for testing purposes.

### Prerequisites

Install git and npm. For Debian/Ubuntu distribution:

```
$ sudo apt install npm git
```

For Windows, download installer using links below:

-   [npm](https://nodejs.org/en/)
-   [git](https://git-scm.com/downloads)

### Installing

These are the steps to install frontend-tests

```bash
$ git clone https://github.com/Dedezuli/Review_Our_Product.git
$ cd Review_Our_Product
$ npm install
```

## Usage

For development purpose, use Cypress GUI to run the test

```
$ npm run cypress:open
```

To run headless Cypress

```
$ npx cypress run
```

## Coding Style and Rules

Before contributing to this repository, please read and follow these rules:

### Folder Structure

Folder name should be written in **UpperCamelCase**.

Folder should be created per feature and folder name should related to test cases inside it.

Folder should only contain a spec file, **\*.cy.js**.

```
cypress
    |_ fixtures
    |_ e2e
        |_ Login
        |   |_ login.cy.js
        |_ User
            |_ createUser.cy.js
```

#### cypress.json and Cypress.config()

Configuration refers to **cypress.json** file.

Always put something general inside configuration. For example, put variable that is being used by most spec files.

If you need to get value from cypress.json, add **Cypress.config('key')** inside your spec file.

```
    // This is just example.
    cy.request('POST', 'http://localhost:8888/users/admin', {
            apiKey: Cypress.config('apiKey')
    })
    .then((response) => {
        // response.body is automatically serialized into JSON
    })

    // If you need to override
    Cypress.config('apiKey', 'dummy')
```

#### Test Environment: Don't Hardcode baseUrl

Don't write baseUrl or URL as environment variable inside cypress.json.

Since we will be deploying test on different stages, we need to make our test cases deployment seamless. In order to achieve that, we need to define baseUrl in command line instead of hardcoding it.

For example, inside login_sanity.spec.js, write **cy.visit('/')**. Suppose login is in development stage and it's can only be accessed from https://forms.office.com/pages/responsepage.aspx?id=is2XW8LLaEmfFhLKD9VwE9lpKmxdveNGmMWKETZvAWNUMzhBV1lYTlc1SDNRS00xRVg4OFhPODlQTS4u

```
$ CYPRESS_baseUrl=https://forms.office.com/pages/responsepage.aspx?id=is2XW8LLaEmfFhLKD9VwE9lpKmxdveNGmMWKETZvAWNUMzhBV1lYTlc1SDNRS00xRVg4OFhPODlQTS4u npx cypress run --spec cypress/e2e/Login/*
```

Command line above will only run spec files inside /Login

### Custom Commands

Custom command should be named in **camelCase**

```
Cypress.Commands.add('loginBackofficeAdmin', () => {
    // do something
})

// To call custom command above
cy.loginBackofficeAdmin()
```

If you think custom command is needed, make sure that custom command will be used **at least** by more than one test case. If it only used by one **it()**, then no need to make a custom command. Follow [DRY, KISS, and YAGNI principle](https://www.itexico.com/blog/software-development-kiss-yagni-dry-3-principles-to-simplify-your-life).

Make sure that custom command is as general as possible. For example in front office, login is one of the most used step in all tests. Obviously, we are going to need this as a custom command. After analysis, we found that there are three scenarios after login in front office.

-   Redirect to OTP page
-   Redirect to User Preference page
-   Redirect to User Dashboard

Based on those scenarios, **don't make login function that will assert only one of possible redirection**. Instead, make a login function that has no assertion. **Better yet, create login command that directly calls login endpoint because it will increase Cypress execution speed.**

Try to consult other QA engineers before deciding to make a custom command.

### Fixtures

If static value is needed in testing, then create a .json fixture for it. By static value, it means data that won't be deleted in database and used for testing purpose (e.g. username "jangandihapus"). **If you are sure that data won't be deleted, then you can make fixture for it**.

If you don't care what the input is, then create a helper to randomize the value.

Make fixture file name simple and meaningful. For example, we need a profile picture image fixture. Don't name it **mountain.jpg**. Instead, name it in **lowerCamelCase**, e.g. **profilePicture.jpg**

### Intelligent Code Completion

Always put this line at the top of spec file

```
/// <reference types="Cypress" />
```
