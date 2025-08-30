#!/bin/bash

# Backend build script for Render deployment
echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "Backend build completed successfully!"