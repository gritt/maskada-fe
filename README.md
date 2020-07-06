# Maskada

[![Build Status](https://travis-ci.org/gritt/maskada-fe.svg?branch=master)](https://travis-ci.org/gritt/maskada-fe)
[![codecov](https://codecov.io/gh/gritt/maskada-fe/branch/master/graph/badge.svg)](https://codecov.io/gh/gritt/maskada-fe)

### About

Maskada (from portuguese *mascada*, means money) is the [React](https://reactjs.org) 
client of [maskada-api](https://github.com/gritt/maskada). It aims to perform very simple 
operations, to make it easier track your finances.

###### ROADMAP

- ✓︎ List transactions by month
- ✓︎ Switch between months
- ✓︎ Calculate monthly balance
- ✓︎ Create transactions
- ✓︎︎ Create transactions with category
- ☕︎ List transactions grouped by type (eg: credit card)
- ✘ Manage transaction status like: delete/pending/done
- ✘ Create recurring transactions
- ✘ UI Dark mode
- ✘ UI Animations/Transitions

To make it simple to calculate, all transactions will belong to a type:

[`Transaction.js`](./src/Services/Transaction.js)
```
// Debit is a transaction which is subtracted.
const DEBIT = 1

// Credit is a transaction which is subtracted the next month.
const CREDIT = 2

// Income is a transaction which is summed.
const INCOME = 3
```

All the calculations happen in the client side.

### Architecture

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app),
code is split between: 

- `Services`: App business logic 
- `Components`: Reusable UI elements
- `Scenes`: What the end user sees

### Available Scripts

##### `npm install`

Install project dependencies.

##### `npm start`

Runs the app in the development mode, open [http://localhost:3000](http://localhost:3000) 
to view it in the browser.

##### `npm test`
Launches the test runner in the interactive watch mode.

##### `npm run build`

Builds the app for production to the `build` folder, your app is ready to be deployed!

### Contributing

> Currently, this project is mostly for studying purposes, and it's not hosted anywhere.
> If you're interested in learning react, hooks and tests, feel free to fork it.
