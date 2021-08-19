#!/usr/bin/env bash

VERSION=v0.0.21-alpha

wget https://github.com/Sleitnick/Knit/releases/download/$VERSION/knit.zip
unzip -o knit.zip -x "Knit/init.lua" "Knit/Util/Promise.lua"
rm -rf knit.zip
