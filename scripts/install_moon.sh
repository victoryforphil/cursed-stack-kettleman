#! /bin/bash

# Verify proto is installed
if ! command -v proto &> /dev/null; then
    echo "proto could not be found, install it using scripts/install_proto.sh"
    exit 1
fi

proto install moon

# Verify moon is installed
if ! command -v moon &> /dev/null; then
    echo "moon could not be found, install it using scripts/install_moon.sh"
    exit 1
fi

