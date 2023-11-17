# Cricket-Score-PWA
## Table of Contents
- [Intro](#intro)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

## Intro
This is a progressive web app that includes the use of:-
1) web push notification
2) puppeteer API for web scraping

It demonstrates the use of Puppeteer API to scrape data like cricket scores from the Cricbuzz website by providing the link to corresponding cricket matches. With the help of web push notifications, It displays scraped data on the device.


## Prerequisites
- Node.js 18.0.0 or higher (recommended:- 18.16.1)
- Windows, macOS, or Linux operating system
- Chrome Browser
- Your VAPID Public and Private Key

## Installation
1. Clone the repository:

	git clone https://github.com/Suryadeep36/Cricket-Score-PWA

	cd Cricket-Score-PWA

2. make a .env file in the root directory to store your vapid public and private keys 
	
3. Execute the following commands:-

    npm install

	node index.js

## Usage
1) Enter a valid cricket match URL from Cricbuzz's website.
(Don't enter an invalid URL, as it will crash the app)
2) Click on get score.
3) allow notifications on Chrome.
4) wait for 10-15 seconds.
