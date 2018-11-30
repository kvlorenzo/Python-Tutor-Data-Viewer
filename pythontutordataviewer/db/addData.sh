#!/bin/sh
node createdb.js
for f in ../../../v2/data/pairs/*
do
	echo "Processing $f";
	mongoimport --file $f -d pythonprograms -c pairs;
done
