![Whitelist Manager](src/assets/promo_1400.png)

# Whitelist Manager [![Build Status](https://img.shields.io/travis/unindented/whitelist-manager.svg)](http://travis-ci.org/unindented/whitelist-manager) [![Dependency Status](https://img.shields.io/gemnasium/unindented/whitelist-manager.svg)](https://gemnasium.com/unindented/whitelist-manager) [![Coverage Status](https://img.shields.io/coveralls/unindented/whitelist-manager.svg)](https://coveralls.io/r/unindented/whitelist-manager)

Automatically blocks all pages from any website that is not in your list of allowed websites.


## Description

Do you have small children, and need to limit the pages they visit to a few known safe websites? Or maybe you just want to concentrate and eliminate all distractions? Then this extension is for you!

Create your own _whitelist_ of safe websites, and this extension will automatically block all pages from any other website that is not in that list.

When adding a website to your _whitelist_, consider the following:

  * You can use wildcards. For example, if you add _google.\*_, you WILL be able to access _google.com_, _google.de_, _google.es_, etc.
  * If you only specify the domain of the website, its subdomains will also be allowed. That is, if you add _google.com_, you WILL be able to access _mail.google.com_, _maps.google.com_, etc.
  * If you specify both the domain and the subdomain of the website, only that subdomain will be allowed. That is, if you add _www.google.com_, you WILL NOT be able to access _mail.google.com_, _maps.google.com_, etc.

PS: When installing _Whitelist Manager_, your browser will warn you that this extension can access your data on all sites, and your browsing history. These permissions are required to block pages when you are browsing. No information is stored on your computer and no personal data is obtained from this extension. I promise!


## Install

Go to the [Whitelist Manager home page](https://chrome.google.com/extensions/detail/pocjkchlmhkjafdpmkklknmjhokobgmh) and hit the _Install_ button.


## Meta

* Code: `git clone git://github.com/unindented/whitelist-manager.git`
* Home: <https://chrome.google.com/extensions/detail/pocjkchlmhkjafdpmkklknmjhokobgmh>


## Contributors

* Daniel Perez Alvarez ([unindented@gmail.com](mailto:unindented@gmail.com))
* David Moreno Gomez ([dmgomez@gmail.com](mailto:dmgomez@gmail.com))


## License

Copyright (c) 2016 Daniel Perez Alvarez ([unindented.org](https://unindented.org/)). This is free software, and may be redistributed under the terms specified in the LICENSE file.
