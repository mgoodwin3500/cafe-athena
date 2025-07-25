# CAFE ATHENA
#### Video Demo:  https://www.youtube.com/watch?v=UAyJ9gsa9qg
#### Description: A website for my cafe. Built with html, css and javascript.

This is a website for a coffee shop named Cafe Athena. The basic structure is written in html. The stying and aesthetic are written in a cascading stylesheet.  The menu items with the order form and cart are written in javascript. There is an images folder where all the images for the website are stored.

The index.html file is written in html.  It is the skeleton of the website. It presents the name of the cafe and relevant information pertaining to the cafe and its menu. It creates the title and the different sections of the website, including the menu section and the shopping cart for orders. The index file displays the menu items and images by pointing to the static javascript file. It creates buttons for the menu and it also creates the pop-up for the receipt upon order confirmation. There is a list menu in the top right for faster navigation the the menu section, the order section and the contact section. Each section contains different div classes and each section is styled with calls to the style.css file. There is a "Contact Us" section at the bottom of the website that can be quickly navigated to by clicking on the the Contact button on the top right of the page.

The static cascading stylesheet houses the websites aesthetics in the style.css file. It styles all the buttons, adds color to the entire website, calls the fonts and sizes of the different sections. Each section of the website is labeled for easy editing in the future. There is a Santorini color vibe throughout the website based on the color scheme of the cafe itself. The different sections are sized and colored for easy viewing and ordering. It is made to be easy to push any and all the buttons on the page. A static css file is chosen for easy editing of the style or coloring of any part of the website.

The static javascript file is where the menu and the cart are built. It makes future editing, like adding menu items or prices a lot easier to keep them in the static script.js file instead of editing the html file itself. Editing the html could possibly break the structure of the website but also may require editing the static css file as well. Each menu item points to an image in the local image folder. The item's name, description and price can be updated or changed here. The buttons to add each item to the cart are in this file, too. The buttons in the carton for adding, subtracting and removing the item completely are in the js file here. As well as the call for the payment submission and the call for the order confirmation pop-up based on successful submission and payment of the order. The colors and styling for the js file are still in the static css file.

There is an images folder that stores all the images for the menu items. Extra images can be stored here for future menu changes or promotions. Each menu item image name should match the menu item label in the script.js file. A separate folder could be created for storing older images or for storing current or future images. The location of the image file for each menu item can be customised in the script.js file for each menu item.

Future:
Connect to an actual payment system
Create database for regular customers to securely store payment information and earn rewards
Potentially add more menu items
Create an "About" page to display a short history the cafe and where the coffee is sourced
