# Contributing

Thank you for helping improve this project! Please follow these guidelines when submitting changes.

## Development setup
- Run `./setup.sh` to install backend and frontend dependencies. Always execute
  this script before running `npm test` or `npm run lint` so the required
  packages are available. Both tasks include a small pre-check that warns if
  `node_modules` are missing.
- See `MANUAL_QA.md` for manual testing steps.

- Run `npm run lint` in `frontend` before committing React changes.


## Binary assets
Avatar images and other static artwork are stored directly in this repository. The current avatar assets occupy about **40 KB** in total.

Binary assets are allowed, but please keep them small and commit only artwork needed by the application. Large media files should be hosted externally (e.g. object storage or CDN) and referenced from the code.

If you add new images, update this document with the approximate total size after your changes.
