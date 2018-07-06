# Stellar Wallet
 
A simple wallet web application using horizon API that runs on stellar network.


## Requirements:

- Node JS version 8 or higher
- Mongo DB
- Stellar SDK

## Languages and APIs:

- Javascript
- Bootstrap
- Horizon API
- EJS

## How to use the application?

1. Open the terminal in the root of the project.
2. Run node app.js
3. enter `http://localhost:8080` in your browser(preferably Chrome)


## What is stellar and how it works ?

Stellar is an open-source protocol for exchanging money using blockchain technology.The platform's source code is hosted on Github.The Stellar network can quickly exchange government-based currencies with 2 to 5 second processing times. The platform is a distributed ledger maintained by a consensus algorithm, which allows for decentralized control, flexible trust, low latency, and asymptotic security.
The web application runs on the client side for handling user requests and interacts with stellar network using horizon API for carring out lumen based transactions.

## Fuctionalities

### 1. SIGN UP
Enter your email,username and password for registering on the network.You will recieve a verification email in your provided mail account.You can use the link available in the mail for confirmation and login to your wallet.

### 2. LOGIN
Use your registered username and password for logging in.

### 3. PAY
You can pay from your wallet to anyone on the network by  providing the receiver's username and the amount you wish to send.

### 4. HISTORY
User can view all the transactions that he/she has been involved.

### 5. DASHBOARD
Displays account details including the current balance and the user's public address which is used to uniquely identify him on the network.


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## ROADBLOCK

Encounterd `Unhandled rejection NotFoundError: [object Object]` while creating a stellar account. The code provided in the stellar documentation is not very clear.Please refer the following link for a solution to this problem:https://github.com/stellar/js-stellar-sdk/issues/115

## References:

https://www.stellar.org/developers/js-stellar-sdk/reference/examples.html#loading-an-accounts-transaction-history
https://en.wikipedia.org/wiki/Stellar_(payment_network)
https://www.stellar.org/developers/reference/




     
# Stellar-Wallet
