#!/bin/bash
cd ui
npm install
npm run build
npm run export
rm -rf ../server/public/*
cp -R out/* ../server/public/
