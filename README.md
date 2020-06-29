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

This site now uses the default Hugo Babel transpiling pipe. Scripts go in `/themes/base-hugo-theme/assets/js`. See `/themes/base-hugo-theme/layouts/partials/scripts.html` for the script minifiaction and concatenation technique. That file also demonstrates how unique pages utilize additional partials to load additional scripts.
