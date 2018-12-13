#!/bin/sh

# Creates the database and collections before adding the data
node CreateDB.js

# WARNING: This program may take hours to run. Be patient please.

# Check for valid number of arguments (should only have 1 arg)
if [ "$#" -ne 1 ]; then 
	echo ""
	echo "Error: Invalid number of arguments."
	echo "Please enter the directory or file to import the data from.";
	echo "USAGE: $0 [directory/file]";
	echo ""

# Check if the argument is a directory -> if so, add all files to db
elif [ -d "$1" ]; then
	for f in "$1"/*
	do
		echo "Processing $f";
		mongoimport --file $f -d pythonprograms -c pairs;
	done

# Check if the argument is a file -> if so, add file to db
elif [ -f "$1" ]; then
	echo "Processing $1";
	mongoimport --file $1 -d pythonprograms -c pairs;

# If argument is neither a directory nor file, give an error
else
	echo ""
	echo "Error: Could not find file or directory"
	echo "Data must be in a file or directory";
	echo "USAGE: $0 [directory/file]";
	echo ""
fi

