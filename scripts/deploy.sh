#!/bin/bash

# Loop through arguments to determine deploy env (dev, staging, or prod)
for arg in "$@"
do
    case $arg in
        --dev)
        S3_BUCKET=dev.edopportunity.org
        CLOUDFRONT_ID=EX40URMY4LM1
        SITE=dev
        shift # Remove --dev from processing
        ;;
        --staging)
        S3_BUCKET=staging.edopportunity.org
        CLOUDFRONT_ID=E3RUN2ZOVQG0DY
        SITE=staging
        shift # Remove --staging from processing
        ;;
        --prod)
        S3_BUCKET=edopportunity.org
        CLOUDFRONT_ID=E2OT07260LEDV6
        SITE=prod
        shift # Remove --prod from processing
        ;;
        OTHER_ARGUMENTS+="$1")
        shift # Remove generic argument from processing
        ;;
    esac
done

if [ "$SITE" = "prod" ]; then export HUGO_BASEURL=https://edopportunity.org/ && cp src/robots.production.txt themes/base-hugo-theme/static/robots.txt; fi
if [ "$SITE" = "staging" ]; then export HUGO_BASEURL=https://staging.edopportunity.org/ && cp src/robots.staging.txt themes/base-hugo-theme/static/robots.txt; fi
if [ "$SITE" = "dev" ]; then export HUGO_BASEURL=https://dev.edopportunity.org/ && cp src/robots.staging.txt themes/base-hugo-theme/static/robots.txt; fi

# Build and deploy
npm install
hugo version
hugo
aws s3 cp public/ s3://$S3_BUCKET --recursive --cache-control max-age=604800
aws cloudfront create-invalidation --distribution-id=$CLOUDFRONT_ID --paths="/*"

exit 0