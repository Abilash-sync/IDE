# IDE

A development environment for building and running intelligent agents.

---

## Cloud Agent

The **Cloud Agent** is a hosted, fully managed agent runtime that executes tasks on cloud infrastructure — no local setup required.

### Features

- **Managed Runtime** — Agents run on scalable cloud infrastructure with automatic resource allocation.
- **Persistent Sessions** — Agent sessions persist across interactions, retaining context and memory.
- **Tool Integration** — Built-in access to filesystem, shell execution, web search, and external APIs.
- **Secure Isolation** — Each agent session runs in an isolated sandbox, ensuring security and reproducibility.
- **Observability** — Real-time logs, traces, and artifacts are captured for every agent run.

### How It Works

1. **Define** your agent with a role, instructions, and available tools.
2. **Deploy** the agent to the cloud runtime via the API or UI.
3. **Invoke** the agent with a task — the cloud runtime handles scheduling and execution.
4. **Inspect** results, logs, and artifacts from the agent session dashboard.

### Authentication

All Cloud Agent API requests require a valid API key passed via the `Authorization` header:

```http
Authorization: Bearer <YOUR_API_KEY>
```

> Keep your API key secure. Never commit it to source control.

### Quick Start

```bash
# Install the CLI
npm install -g @cloud-agent/cli

# Authenticate
cloud-agent login

# Deploy an agent
cloud-agent deploy --config agent.config.json

# Run a task
cloud-agent run --agent <AGENT_ID> --task "Summarize the latest pull requests"
```

### Configuration

Agent behaviour is defined in an `agent.config.json` file:

```json
{
  "name": "my-agent",
  "description": "A helpful coding assistant",
  "model": "gpt-4o",
  "tools": ["filesystem", "execute", "web_search"],
  "memory": true,
  "timeout": 600
}
```

| Field         | Type      | Required | Description                                               |
|---------------|-----------|----------|-----------------------------------------------------------|
| `name`        | `string`  | Yes      | Unique identifier for the agent                           |
| `description` | `string`  | No       | Human-readable description of the agent's purpose        |
| `model`       | `string`  | Yes      | LLM model to power the agent                             |
| `tools`       | `array`   | No       | List of tools available to the agent                      |
| `memory`      | `boolean` | No       | Enable persistent memory across sessions (default: false) |
| `timeout`     | `number`  | No       | Max execution time in seconds (default: 300)              |

### Error Codes

| Code  | Meaning                              |
|-------|--------------------------------------|
| `401` | Invalid or missing API key           |
| `403` | Insufficient permissions             |
| `404` | Agent not found                      |
| `429` | Rate limit exceeded                  |
| `500` | Internal server error — contact support |

---

## Contributing

Pull requests are welcome. Please open an issue first to discuss significant changes.

## License

MIT
