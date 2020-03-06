#!/bin/bash
cd ui-vue
npm install
npm run build
rm -rf ../server/public/*
cp -R dist/* ../server/public/
