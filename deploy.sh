#!/bin/bash

#Get app version
APP_VERSION=$(node -pe "require('./package.json').version")

#Create a name for the bundle
ARCHIVE_NAME='ve-'$APP_VERSION'.tar.gz'

#Create an archive
tar -czvf $ARCHIVE_NAME -C ./dist/VE .

#Deploy to server
curl -u $ARTIFACTORY_USER:$ARTIFACTORY_PASSWORD -X PUT "$ARTIFACTORY_URL/$APP_VERSION/$ARCHIVE_NAME" -T ./$ARCHIVE_NAME
