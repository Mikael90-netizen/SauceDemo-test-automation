# Test Plan — Swag Labs (SauceDemo)

| | |
|---|---|
| **Application Under Test** | Swag Labs — https://www.saucedemo.com |
| **Document Owner** | Obinna Ezirim |
| **Version** | 1.0 |
| **Status** | Draft |

---

## 1. Introduction

This test plan defines the scope, approach, environment, data, and risk
areas for manual testing of the Swag Labs e-commerce demo application.
Swag Labs is a single-page e-commerce app used for QA practice, covering a
standard shopping flow: login, product browsing, cart management, and
checkout.

## 2. Scope

The following features are **in scope** for this test cycle:

| Feature | Description |
|---|---|
| **Login** | Authentication for all four documented user accounts, including locked-out and error-state handling |
| **Product Browsing** | Inventory list, product detail view, sorting (Name A–Z/Z–A, Price low–high/high–low) |
| **Cart** | Add/remove items, cart badge count accuracy, cart contents view |
| **Checkout** | Checkout information form (first name, last name, postal code), order overview, price/tax/total calculation, order completion |

**Out of scope:** payment gateway integration (site does not process real
payment), backend/database validation, API-level testing, load/stress
testing beyond basic performance observation.

## 3. Types of Testing

| Type | Purpose | Examples for this app |
|---|---|---|
| **Functional Testing** | Confirm each feature behaves as specified | Login succeeds with valid credentials; item added to cart increments badge count; checkout total = sum of item prices + tax |
| **UI Testing** | Confirm visual elements render correctly and consistently | Product images match their listed product; buttons/labels are legible and correctly positioned; layout holds at different viewport widths |
| **Negative Testing** | Confirm the app fails gracefully on invalid input/action | Login with wrong password; checkout submitted with empty required fields; login as `locked_out_user` |
| **Edge Case Testing** | Confirm behavior at boundaries or unusual sequences | Emptying the cart from the cart page vs. from the product page; using browser Back/Forward mid-checkout; adding all inventory items then removing them one by one; extremely long input in checkout fields |
| **Cross-Browser Considerations** | Confirm consistent behavior across browsers/engines | Chrome (Blink), Firefox (Gecko) — checking rendering, sort behavior, and cart state persistence in each |

## 4. Test Environment

| Category | Coverage |
|---|---|
| **Browsers (Desktop)** | Google Chrome (latest), Mozilla Firefox (latest) |
| **Devices** | Desktop/laptop (primary), with a responsive check on a mobile viewport (e.g., iPhone 14 / Pixel 7 emulated viewport) since Swag Labs has no dedicated native app |

## 5. Test Data

Swag Labs provides a fixed set of test accounts. All accounts share the
password `secret_sauce`.

| Username | Purpose in testing |
|---|---|
| `standard_user` | Baseline "everything works" account — used as the control for all functional and UI test cases |
| `locked_out_user` | Negative test case — confirms the app correctly blocks a disabled account and shows an appropriate error |
| `problem_user` | Exploratory/bug-hunting account — known to expose UI and interaction defects (see Bug Report) |
| `performance_glitch_user` | Used to observe load-time behavior and confirm the UI communicates loading state appropriately |

Additional test data generated during execution: checkout form inputs
(valid names/postal codes, blank fields, special characters, and
excessively long strings) to support negative and edge-case testing.

## 6. Test Cases

Minimum five detailed test cases below; the full test case set for this
cycle should be tracked in the accompanying test case tracker. Each row
carries the fields expected in an enterprise QA process — Test Case ID,
Module, Requirement ID, Priority, Severity, Test Type, Preconditions,
Test Data, Steps, Expected Result, Actual Result, Status, and Executed
By — for full traceability from requirement to execution.

| TC ID | Module | Req. ID | Priority | Severity | Type | Preconditions | Test Data | Steps | Expected Result | Actual Result | Status | Executed By |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| TC-01 | Login | REQ-AUTH-001 | Critical | Critical | Functional | Browser open at saucedemo.com | Username: `standard_user` / Password: `secret_sauce` | 1. Enter username `standard_user` 2. Enter password `secret_sauce` 3. Click Login | Redirected to Products page; header reads "Products"; six product tiles visible with images, names, prices, and "Add to cart" buttons | *TBC* | Not Executed | *TBC* |
| TC-02 | Login | REQ-AUTH-002 | High | High | Negative | Browser open at saucedemo.com | Username: `locked_out_user` / Password: `secret_sauce` | 1. Enter username `locked_out_user` 2. Enter password `secret_sauce` 3. Click Login | Login rejected; error message shown (e.g., "Sorry, this user has been locked out."); user stays on login page | *TBC* | Not Executed | *TBC* |
| TC-03 | Cart | REQ-CART-001 | Critical | High | Functional | Logged in as `standard_user`, cart empty | Any 3 distinct inventory items | 1. Add 3 different items to cart from Products page 2. Observe cart badge 3. Click cart icon | Badge shows "3"; cart page lists exactly the 3 selected items with correct names, prices, quantities | *TBC* | Not Executed | *TBC* |
| TC-04 | Checkout | REQ-CHECKOUT-001 | Critical | Critical | Functional | Logged in as `standard_user`, 1+ item in cart | First Name: `Obinna` / Last Name: `Ezirim` / Postal Code: `100001` | 1. Cart → Checkout 2. Enter First/Last Name, Postal Code 3. Click Continue 4. Review order overview 5. Click Finish | Order overview shows correct item total, tax, and total; "Thank you for your order" page displays; cart badge resets to empty | *TBC* | Not Executed | *TBC* |
| TC-05 | Checkout | REQ-CHECKOUT-002 | High | Medium | Negative | Logged in as `standard_user`, 1+ item in cart, on Checkout: Your Information page | First Name / Last Name / Postal Code: *(all blank)* | 1. Leave all three fields blank 2. Click Continue | Submission blocked; inline error identifies missing required field(s) (e.g., "Error: First Name is required"); user stays on the checkout information page | *TBC* | Not Executed | *TBC* |
| TC-06 | Product Browsing | REQ-CATALOG-001 | Medium | Medium | Functional / Edge Case | Logged in as `standard_user`, on Products page | Sort options: Price low–high, Price high–low, Name A–Z, Name Z–A | 1. Note default order 2. Select "Price (low to high)" 3. Verify order 4. Repeat for other 3 sort options | Product list re-orders correctly for each option, in strict ascending/descending order as selected | *TBC* | Not Executed | *TBC* |
| TC-07 | Cart | REQ-CART-002 | Medium | Low | UI / Cross-Browser | Logged in as `standard_user` with 2+ items in cart | Same 2+ cart items viewed in both browsers | 1. Open cart page in Chrome and Firefox 2. Compare layout, fonts, button alignment, and item data across both | Cart page renders consistently across both browsers with no layout breakage, missing elements, or data discrepancies | *TBC* | Not Executed | *TBC* |

*TBC = to be completed during execution.*

## 7. Risk Assessment

| Risk Area | Likelihood of Defects | Rationale |
|---|---|---|
| **problem_user interactions** | Very High | This account is specifically known to expose broken images, non-functional buttons, and sort issues — highest concentration of defects in the app |
| **Checkout price calculation** | Medium | Tax/total calculation is a common source of off-by-rounding or stale-state bugs after cart changes |
| **Cart state persistence** | Medium | Cart badge/content state is prone to going stale after actions like "Reset App State," logout/login, or browser back/forward navigation |
| **Sort functionality** | Medium | Sorting logic is a common area for silent failures (dropdown accepts a selection but list order doesn't actually change) |
| **performance_glitch_user load behavior** | Medium | Deliberately introduces delay; risk is less about correctness and more about missing loading indicators/perceived app freezing |
| **Cross-browser rendering** | Low–Medium | App is simple and mostly standard HTML/CSS, but flexbox/grid quirks can still surface in older WebKit builds |
| **Login negative paths** | Low | Login/lockout logic is simple and well-isolated, so it's typically stable, but still worth confirming error copy and state resets correctly on retry |

---

*This test plan should be reviewed and updated at the start of each test
cycle, particularly if Swag Labs' underlying build changes.*

---

Review it.