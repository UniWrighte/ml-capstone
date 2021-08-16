#!/bin/bash
cd data
node index.js
cd ../ml
pip3 install scikit-learn
python3 main.py
cd ../server
node index.js