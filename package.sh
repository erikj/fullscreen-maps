#!/bin/sh
TARGET='../app.zip'
echo "Writing app package to $TARGET"
git archive --format=zip --prefix=fullscreen-maps/ -o $TARGET master
