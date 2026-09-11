
# SauceDemo Playwright Automation Framework

## Overview

This project contains automated UI tests for the SauceDemo application using Playwright and JavaScript. The framework follows the Page Object Model (POM) design pattern to improve maintainability and code reusability.

## Tech Stack

- Playwright
- JavaScript
- Node.js
- Faker.js

## Project Structure

```
pages/
tests/
test-data/
playwright.config.js
package.json
README.md
```

## Features

- Login
- Logout
- Add Product to Cart
- Remove Product from Cart
- Checkout
- Negative Login Scenarios
- Data-Driven Testing

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test:

```bash
npx playwright test tests/login.spec.js
```

Run in headed mode:

```bash
npx playwright test --headed
```

Open the HTML report:

```bash
npx playwright show-report
```

## Framework Design

The project uses the Page Object Model (POM):

- LoginPage
- ProductsPage
- CartPage
- CheckoutPage

## Test Data

Test data is stored in the `test-data` folder:

- loginData.js
- productData.js
- checkoutData.js

## Reporting

Playwright HTML Report

## Author

Obinna Ezirim
QA Engineer