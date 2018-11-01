#!/usr/bin/env bash

pwd

if grep -q 'import(".*")\.' dist/**/*.d.ts; then 
    echo "ERROR: Found import() typings in dist .d.ts files. Check for exported values with inferred types."
    exit 1
else
    echo "No problematic typings found."
fi