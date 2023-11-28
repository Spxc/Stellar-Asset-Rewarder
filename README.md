# Stellar Asset Rewarder

The Stellar Asset Rewarder is a specialized application designed to identify holders of specific assets and distribute rewards or tokens to these holders. This versatile tool enables targeted distribution, allowing for the rewarding of asset holders, including NFT holders, within the Stellar network.

## Installation

Before running the application, make sure you have Node.js installed. Then, install the dependencies by running:

```bash
npm install
```

This will install the required packages including Axios, Dotenv, and the Stellar SDK.

## Configuration

Create a .env file by copying the .env.sample file

```bash
mv .env.sample .env
```

Provide the **required** configuration values:

```
# .env file

# PAYOUT ASSET INFO
PASSET_CODE="" #ex. XLM
PASSET_ISSUER="" #ex. NATIVE
PASSET_AMOUNT=""
PASSET_MEMO=""

#HOLDER ASSET INFO
#ONLY SUPPORTS CUSTOM ASSET LOOKUP
ASSET_CODE=""
ASSET_ISSUER=""

# PAYOUT SECRET KEY
KEY=""
```

Edit the .env file with your specific settings.

## Usage

Once the configuration is set up, start the application using:

```bash
npm start
```

This will run the application using Node.js and execute the code in src/app.js.

## License

This project is licensed under the ISC License. See the LICENSE file for details.

Author
Created by Stian W. Instebø.
