#!/bin/sh

set -ev

## ARGS
GH_REPO_TOKEN=$1
TRAVIS_BUILD_NUMBER=$2
TRAVIS_COMMIT=$3

## CONSTANTS
MKDOCS_OUTPUT=site
GH_REPO_NAME=chromium-screenshot
GH_REPO_REF=github.com/christopher-evans/$GH_REPO_NAME.git

## GENERATE DOCS
npm run docs 2>&1

## CLONE REPO
mkdir documentation
cd documentation
git clone -b gh-pages https://git@$GH_REPO_REF
cd $GH_REPO_NAME

## CONFIGURE GIT
git config --global push.default simple
git config user.name "Travis CI"
git config user.email "travis@travis-ci.org"

# Remove everything currently in the gh-pages branch.
# GitHub is smart enough to know which files have changed and which files have
# stayed the same and will only update the changed files. So the gh-pages branch
# can be safely cleaned, and it is sure that everything pushed later is the new
# documentation.
rm -rf *

# Need to create a .nojekyll file to allow filenames starting with an underscore
# to be seen on the gh-pages site. Therefore creating an empty .nojekyll file.
# Presumably this is only needed when the SHORT_NAMES option in Doxygen is set
# to NO, which it is by default. So creating the file just in case.
echo "" > .nojekyll

# Copy documentation to current directory
cp -r ../../$MKDOCS_OUTPUT/* .

################################################################################
##### Upload the documentation to the gh-pages branch of the repository.   #####
# Only upload if mkdocs successfully created the documentation.
# Check this by verifying that the file index.html exits.
# This is a good indication that mkdocs did it's work.
if [ -f "index.html" ]; then

    echo 'Uploading documentation to the gh-pages branch...'
    # Add everything in this directory (the Doxygen code documentation) to the
    # gh-pages branch.
    # GitHub is smart enough to know which files have changed and which files have
    # stayed the same and will only update the changed files.
    git add --all

    # Commit the added files with a title and description containing the Travis CI
    # build number and the GitHub commit reference that issued this build.
    git commit -m "Deploy code docs to GitHub Pages Travis build: ${TRAVIS_BUILD_NUMBER}" -m "Commit: ${TRAVIS_COMMIT}"

    # Force push to the remote gh-pages branch.
    # The ouput is redirected to /dev/null to hide any sensitive credential data
    # that might otherwise be exposed.
    git push --force "https://${GH_REPO_TOKEN}@${GH_REPO_REF}" > /dev/null 2>&1
else
    echo '' >&2
    echo 'Warning: No documentation (html) files have been found!' >&2
    echo 'Warning: Not going to push the documentation to GitHub!' >&2
    exit 1
fi
