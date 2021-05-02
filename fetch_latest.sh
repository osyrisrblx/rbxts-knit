#!/usr/bin/env bash

VERSION=v0.0.16-alpha

wget https://github.com/Sleitnick/Knit/releases/download/$VERSION/knit.zip
unzip -o knit.zip -x "src/init.lua" "src/Util/Promise.lua"
rm -rf knit.zip
