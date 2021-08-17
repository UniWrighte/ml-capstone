#!/bin/bash
cd data
npm i
node index.js
cd ../ml
pip3 install scikit-learn
python3 main.py &
cd ../api
npm i
node index.js &
cd ../app
npm i
npm start