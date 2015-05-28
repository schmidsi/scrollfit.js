scrollfit.js
============

Tiny vanilla js module that fits text inside an HTML Element according to its
scrollWidth/scrollHeight compared to its clientWidth/clientHeight.

## Installation

    npm install scrollfit --save


## Usage

    Scrollfit = require('scrollfit')

    new Scrollfit(document.querySelector('.scrollfit'))

    // or use integrated hook lookup:
    <div data-hook="scrollfit"> Some text that shoud be fitted</div>


## Contributing

Yes, please. See github issues to get started. Needs more documentation and stuff. (As always)


## Thanks

Highly inspired by the following awesome projects:
- [fittext.js](http://fittextjs.com/)
- [textFit](https://github.com/STRML/textFit)


An opensource module brought to you with love from [optune.me](http://www.optune.me)
