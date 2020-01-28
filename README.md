# Eat-Your-Veggies
Creates a vegetable logger with MySQL, Node, Express, Handlebars and a homemade ORM (yum!)

## Instructions
If starting from scratch:
  1. Clone github
  ```
    git clone https://github.com/kshep425/Eat-Your-Veggies.git
  ```
  1. Use schema.sql and seeds.sql files to create the database and add default data.
  ```
    mysql -u <username>
    source schema.sql
    source seeds.sql
  ```
  1. Install dependencies
  ```
    npm install
  ```
    Should install mysql, express, console.table, etc.


## Author
[Keisha Shepherd](https://github.com/kshep425/)

## Dependencies
mysql

## License
MIT License

Copyright (c) 2019 kshep425

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Badges
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![github-open-issues-image](https://img.shields.io/github/issues-raw/kshep425/Eat-Your-Veggies.svg)](https://github.com/kshep425/Eat-Your-Veggies/issues)
[![github-open-pull-requests-image]( https://img.shields.io/github/issues-pr-raw/kshep425/Eat-Your-Veggies.svg)](https://github.com/kshep425/Eat-Your-Veggies/pulls)
[![github-closed-pull-requests-image]( https://img.shields.io/github/issues-pr-closed-raw/kshep425/Eat-Your-Veggies.svg)](https://github.com/kshep425/Eat-Your-Veggies/pulls)]
[![github-contributors-image]( https://img.shields.io/github/contributors/kshep425/Eat-Your-Veggies.svg)](https://github.com/kshep425/Eat-Your-Veggies/graphs/contributors)
[![github-commit-activity-image]( https://img.shields.io/github/commit-activity/y/kshep425/Eat-Your-Veggies.svg)](https://github.com/kshep425/Eat-Your-Veggies/issues)
[![github-last-commit-image]( https://img.shields.io/github/last-commit/kshep425/Eat-Your-Veggies.svg)](https://github.com/kshep425/Eat-Your-Veggies/issues)
[![github-languages-image]( https://img.shields.io/github/languages/top/kshep425/Eat-Your-Veggies.svg)](https://github.com/kshep425/Eat-Your-Veggies/issues)
[![github-language-count-image]( https://img.shields.io/github/languages/count/kshep425/Eat-Your-Veggies.svg)](https://github.com/kshep425/Eat-Your-Veggies/issues)
[![github-code-size-image]( https://img.shields.io/github/languages/code-size/kshep425/Eat-Your-Veggies.svg)](https://github.com/kshep425/Eat-Your-Veggies/issues)
[![github-repo-size-image]( https://img.shields.io/github/repo-size/kshep425/Eat-Your-Veggies.svg)](https://github.com/kshep425/Eat-Your-Veggies/issues)


## Tests
This tool was created with 100% test driven development using integration and system level style of testing.  The goal was to have close to 100% code coverage with the test but some of the connection.query errors were difficult to create.  However, With more time unit level testing with mocks can be added in the future.  Also, changing all of the database calls to return promises could be some other future work.  But I wanted to practice callbacks.

```
npm run test
```
