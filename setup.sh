#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "Installing backend dependencies..."
(cd backend && npm install)

echo "Installing frontend dependencies..."
(cd frontend && npm install)

