#!/bin/bash
# Based on https://github.com/hydrabolt/discord.js-site/blob/master/deploy/deploy.sh

set -e

if [ "$TRAVIS_BRANCH" != "stable" -o -n "$TRAVIS_TAG" ]; then
  echo -e "Not publishing for a non stable branch push."
  exit 0
fi

REPO=$(git config remote.origin.url)
TARGET_BRANCH="stable"
git clone $REPO dist -b $TARGET_BRANCH
NEW_PACKAGE_VERSION=$(node -p "require('./package.json').version")
OLD_PACKAGE_VERSION=$(node -p "require('./dist/package.json').version")

if [ "$TRAVIS_PULL_REQUEST" == "true" ]; then
  echo -e "stable pr - checking semvar without publishing."
  node ./scripts/versionCompare.js $NEW_PACKAGE_VERSION $OLD_PACKAGE_VERSION
  exit 0
fi

echo -e "Publishing for a stable branch push."

node ./scripts/versionCompare.js $NEW_PACKAGE_VERSION $OLD_PACKAGE_VERSION

echo -e "Had this script been ready, this would have published"
#npx vsce publish -p "${PUBLISH_TOKEN}"
