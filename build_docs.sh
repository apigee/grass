#!/bin/bash

set -ex

REPO="git@github.com:apigeecs/grass.git"
DIR=temp-docs

# Delete any existing temporary website clone
rm -rf $DIR

# cd into docs, and build
cd docs && bundle exec middleman build && cd ..

# Clone the current repo into temp folder
git clone $REPO $DIR

# Move working directory into temp folder
cd $DIR

# Checkout and track the gh-pages branch
git checkout -t origin/gh-pages

# Delete everything
rm -rf *

# Copy website files from real repo
cp -R ../docs/build/* .

# Stage all files in git and create a commit
git add .
git add -u
git commit -m "docs auto-built at $(date)"

# Push the new files up to GitHub
git push origin gh-pages

# Delete our temp & build folders
cd ..
rm -rf $DIR
rm -rf ./docs/build