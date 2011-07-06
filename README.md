# Whitelist for Google Chrome ![Still Maintained?](http://stillmaintained.com/unindented/whitelist-chrome.png)

Automatically blocks all pages from any website that is not in your list of allowed websites.

## Description

Do you have small children, and need to limit the pages they visit to a few known safe websites? Or maybe you just want to concentrate and eliminate all distractions? Then this extension is for you!

Create your own *whitelist* of safe websites, and this extension will automatically block all pages from any other website that is not in that list.

When adding a website to your *whitelist*, consider the following:

  * You can use wildcards. For example, if you add *google.\**, you WILL be able to access *google.com*, *google.de*, *google.es*, etc.
  * If you only specify the domain of the website, its subdomains will also be allowed. That is, if you add *google.com*, you WILL be able to access *mail.google.com*, *maps.google.com*, etc.
  * If you specify both the domain and the subdomain of the website, only that subdomain will be allowed. That is, if you add *www.google.com*, you WILL NOT be able to access *mail.google.com*, *maps.google.com*, etc.

PS: When installing *Whitelist for Chrome*, your browser will warn you that this extension can access your data on all sites, and your browsing history. These permissions are required to block pages when you are browsing. No information is stored on your computer and no personal data is obtained from this extension. I promise!

## Install

Go to the [Whitelist for Chrome home page](https://chrome.google.com/extensions/detail/pocjkchlmhkjafdpmkklknmjhokobgmh) and hit the *Install* button.

## Meta

* Code: `git clone git://github.com/unindented/whitelist-chrome.git`
* Home: <https://chrome.google.com/extensions/detail/pocjkchlmhkjafdpmkklknmjhokobgmh>

## Contributors

* Daniel Perez Alvarez ([unindented@gmail.com](mailto:unindented@gmail.com))
* David Moreno Gomez ([dmgomez@gmail.com](mailto:dmgomez@gmail.com))

## License

Copyright (c) 2010 Daniel Perez Alvarez ([unindented.org](http://unindented.org/)). This is free software, and may be redistributed under the terms specified in the LICENSE file.

