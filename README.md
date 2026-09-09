# IDE

## Cloud Agent

Cloud Agent is an AI-powered assistant integrated into this IDE that helps you accomplish tasks autonomously using a set of tools.

### Features

- **File Operations** — Read, write, and edit files directly within your workspace
- **Code Execution** — Run shell commands, scripts, tests, and builds in an isolated sandbox
- **Git Integration** — Perform local and remote git operations (commit, push, pull, branch management)
- **Pull Request Creation** — Automatically open pull requests to your configured base branch
- **Web & API Access** — Fetch external resources and interact with APIs as part of task flows
- **Subagent Delegation** — Spawn ephemeral subagents to handle isolated, parallelisable subtasks
- **Task Tracking** — Maintain a structured to-do list for complex multi-step objectives

### How It Works

1. You describe a task in natural language.
2. Cloud Agent reads the relevant files and context in your workspace.
3. It plans and executes the steps needed — editing files, running commands, calling APIs — iterating until the task is complete.
4. For code changes, it always works on a feature branch and never commits directly to `main`.

### Security

- All code changes are reviewed on feature branches via pull requests.
- The agent never stores or exposes credentials, API keys, or secrets.
- Execution runs in an isolated sandbox with no access to your local machine.

### Getting Started

Describe your task in the chat panel and Cloud Agent will take it from there. For example:

- _"Add a dark mode toggle to the settings page"_
- _"Write unit tests for the authentication module"_
- _"Review my API documentation and flag any missing error codes"_
