# Stanford Education Data Archive

This is the web site for the Stanford Education Data Archive web site.

## MailChimp Subscription

To test mailchimp subscription lambda function locally, update npm to install netlify-lambda:

```
npm install
```

Make sure that the `lambda-serve` and `lambda-build` tasks exist in package.json:

```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "lambda-serve": "netlify-lambda serve ./src/",
  "lambda-build": "netlify-lambda build ./src/"
},
```

Launch hugo as normal, `hugo server -w`, and in another terminal window, launch the netlify lambda server:

```
npm run lambda-serve
```

To build:

```
npm run lambda-build
```

## Transpile JavaScipt:

Babel transpiling is setup to run as an npm process. External libraries go in `.themes/base-hugo-theme/static/js/lib`. Our JavaScript files go in `.themes/base-hugo-theme/static/js/src`. Babel transpiles them into `.themes/base-hugo-theme/static/js/babel`.

To start the watcher:

```
npm run babel
```
