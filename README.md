# Simple Logger

This repository contains `@madooei/simple-logger`, a lightweight and minimal logging system for TypeScript projects that supports namespace-based logging with two log levels.

> [!TIP]
> For package-specific instructions (installation, usage, development, publishing, etc.), see the [README in `packages/simple-logger/`](packages/simple-logger/README.md).

## Cloning the Repository

To make your workflow more organized, it's a good idea to clone this repository into a directory named `simple-logger-workspace`. This helps differentiate the workspace from the `simple-logger` located in the `packages` directory.

Follow these steps to clone the repository:

```bash
# Clone the repository into a directory named simple-logger-workspace
git clone https://github.com/madooei/simple-logger simple-logger-workspace

# Navigate into the newly cloned directory
cd simple-logger-workspace
```

## Repository Structure

This repository follows the [example-package](https://github.com/madooei/example-package) template for building minimal TypeScript packages. The codebase contains the following directories:

- `packages` — Contains the primary package(s) for this repository (e.g., `simple-logger`). Each package is self-contained and can be copied out and used independently.
- `examples` — Contains examples of how to use the packages. Each example is a minimal, standalone project.
- `playgrounds` — Contains demos of the dependencies of the primary package(s). These are typically packages developed by others that are used in the primary package(s).
- `docs` — Contains documentation for the primary package(s) and, optionally, for examples or other aspects of the repo.
- `.github` — Contains GitHub-specific files, such as workflows and issue templates.

### Philosophy

- **Portability:** Each package and example is self-contained. You can copy any package or example out of this repo and use it as a standalone project. It is generally assumed that you open each package in your editor to work on it (rather than opening the entire repo).
- **Simplicity:** We intentionally avoid monorepo tools (like workspaces or shared config files) to keep things simple and portable.
- **Clarity:** The structure is easy to navigate, and each part of the repo has a clear purpose.

## How to Use This Repo

- To work on a package, go to `packages/<package-name>` and follow its README.
- To try an example, go to `examples/<example-name>` and follow its README.
- To run one of the playgrounds, go to `playgrounds/<package-name>` and follow its README.
- For documentation, see the `docs` folder.

### Using a VSCode Multi-root Workspace

With Visual Studio Code, you can enhance your development experience by using a multi-root workspace to access packages, examples, and playgrounds simultaneously. This approach is more efficient than opening the root directory, or each package or example separately.

To set up a multi-root workspace:

1. Open Visual Studio Code.
2. Navigate to `File > Open Workspace from File...`.
3. Select the `simple-logger.code-workspace` file located at the root of the repository. This action will open all specified folders in one workspace.

The `simple-logger.code-workspace` file can be customized to include different folders or settings. Here's a typical configuration:

```json
{
  "folders": [
    {
      "path": "packages/simple-logger"
    },
    {
      "path": "examples/simple"
    },
    {
      "path": "playgrounds/empty"
    }
  ],
  "settings": {
    // Add any workspace-specific settings here, for example:
    "git.openRepositoryInParentFolders": "always"
  }
}
```

## Contributing

Feel free to open issues or pull requests! If you want to add a new package or example, just create a new folder in the appropriate directory and include a README. (Check [`CONTRIBUTING.md`](CONTRIBUTING.md) for more information.)
