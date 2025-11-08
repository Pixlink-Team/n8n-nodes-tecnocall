# n8n-nodes-tecnocall

This is an n8n community node for [Tecnocall API](https://tecnocall.com). It enables you to integrate Tecnocall's communication and customer management features into your n8n workflows.

[![npm version](https://badge.fury.io/js/n8n-nodes-tecnocall.svg)](https://badge.fury.io/js/n8n-nodes-tecnocall)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Features

- **Customer Management**
  - Create customers
  - Get customer by ID
  - Get many customers with filters
  - Update customer information

- **Communication Management**
  - Create communications
  - Get communication by ID
  - Get many communications with filters

- **Modern Architecture**
  - Type-safe TypeScript implementation
  - Modular and maintainable code structure
  - Comprehensive error handling
  - Easy to extend with new operations

## 📦 Installation

### From npm

```bash
npm install n8n-nodes-tecnocall
```

### In n8n

1. Go to **Settings** > **Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-tecnocall` in the **Enter npm package name** field
4. Agree to the risks and click **Install**

For more information, see the [n8n documentation on community nodes](https://docs.n8n.io/integrations/community-nodes/installation/).

## 🔧 Configuration

### Credentials

You'll need to configure Tecnocall API credentials:

1. **Base URL**: Your Tecnocall API endpoint (e.g., `https://api.tecnocall.com`)
2. **Bot Token**: Your bot authentication token

### Authentication

The node uses Bearer token authentication. Your token is securely stored and sent with each API request.

## 📖 Usage

### Customer Operations

#### Create Customer
Create a new customer with optional fields like name, email, phone, username, agent code, and source ID.

#### Get Customer
Retrieve a specific customer by their ID.

#### Get Many Customers
Fetch multiple customers with optional filters:
- Search by name, email, or phone
- Filter by agent code
- Filter by source ID
- Pagination support

#### Update Customer
Update an existing customer's information.

### Communication Operations

#### Create Communication
Create a new communication record with:
- Type (e.g., call, message, email)
- Agent code
- Customer code
- Custom data payload (JSON format)

#### Get Communication
Retrieve a specific communication by ID.

#### Get Many Communications
Fetch multiple communications with filters:
- Filter by agent code
- Filter by customer code
- Filter by type
- Pagination support

## 🏗️ Development

For detailed information about the project architecture, see [ARCHITECTURE.md](ARCHITECTURE.md).

### Building

```bash
# Install dependencies
pnpm install

# Build the project
pnpm run build

# Watch mode for development
pnpm run build:watch

# Run linter
pnpm run lint

# Fix linting issues
pnpm run lint:fix
```

### Project Structure

```
n8n-nodes-tecnocall/
├── credentials/           # API authentication
├── nodes/
│   └── Tecnocall/
│       ├── actions/      # Operation handlers
│       ├── descriptions/ # UI field definitions
│       ├── types.ts      # TypeScript types
│       ├── utils.ts      # Utility functions
│       └── router.ts     # Operation router
└── icons/               # Node icons
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes.

## 🙏 Credits

- Built by [Mohammad Mahdi Khakdaman](https://github.com/Pixlink-Team)
- Powered by [n8n](https://n8n.io)

## 📞 Support

- GitHub Issues: [Report a bug or request a feature](https://github.com/Pixlink-Team/n8n-nodes-tecnocall/issues)
- Documentation: See [ARCHITECTURE.md](ARCHITECTURE.md) for technical details

## 🔗 Links

- [n8n Documentation](https://docs.n8n.io)
- [n8n Community](https://community.n8n.io)
- [Tecnocall](https://tecnocall.com)

### 4. Build Your Node

Edit the example nodes to fit your use case, or create new node files by copying the structure from [nodes/Example/](nodes/Example/).

> [!TIP]
> If you want to scaffold a completely new node package, use `npm create @n8n/node` to start fresh with the CLI's interactive generator.

### 5. Configure Your Package

Update `package.json` with your details:

- `name` - Your package name (must start with `n8n-nodes-`)
- `author` - Your name and email
- `repository` - Your repository URL
- `description` - What your node does

Make sure your node is registered in the `n8n.nodes` array.

### 6. Develop and Test Locally

Start n8n with your node loaded:

```bash
npm run dev
```

This command runs `n8n-node dev` which:

- Builds your node with watch mode
- Starts n8n with your node available
- Automatically rebuilds when you make changes
- Opens n8n in your browser (usually http://localhost:5678)

You can now test your node in n8n workflows!

> [!NOTE]
> Learn more about CLI commands in the [@n8n/node-cli documentation](https://www.npmjs.com/package/@n8n/node-cli).

### 7. Lint Your Code

Check for errors:

```bash
npm run lint
```

Auto-fix issues when possible:

```bash
npm run lint:fix
```

### 8. Build for Production

When ready to publish:

```bash
npm run build
```

This compiles your TypeScript code to the `dist/` folder.

### 9. Prepare for Publishing

Before publishing:

1. **Update documentation**: Replace this README with your node's documentation. Use [README_TEMPLATE.md](README_TEMPLATE.md) as a starting point.
2. **Update the LICENSE**: Add your details to the [LICENSE](LICENSE.md) file.
3. **Test thoroughly**: Ensure your node works in different scenarios.

### 10. Publish to npm

Publish your package to make it available to the n8n community:

```bash
npm publish
```

Learn more about [publishing to npm](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry).

### 11. Submit for Verification (Optional)

Get your node verified for n8n Cloud:

1. Ensure your node meets the [requirements](https://docs.n8n.io/integrations/creating-nodes/deploy/submit-community-nodes/):
   - Uses MIT license ✅ (included in this starter)
   - No external package dependencies
   - Follows n8n's design guidelines
   - Passes quality and security review

2. Submit through the [n8n Creator Portal](https://creators.n8n.io/nodes)

**Benefits of verification:**

- Available directly in n8n Cloud
- Discoverable in the n8n nodes panel
- Verified badge for quality assurance
- Increased visibility in the n8n community

## Available Scripts

This starter includes several npm scripts to streamline development:

| Script                | Description                                                      |
| --------------------- | ---------------------------------------------------------------- |
| `npm run dev`         | Start n8n with your node and watch for changes (runs `n8n-node dev`) |
| `npm run build`       | Compile TypeScript to JavaScript for production (runs `n8n-node build`) |
| `npm run build:watch` | Build in watch mode (auto-rebuild on changes)                    |
| `npm run lint`        | Check your code for errors and style issues (runs `n8n-node lint`) |
| `npm run lint:fix`    | Automatically fix linting issues when possible (runs `n8n-node lint --fix`) |
| `npm run release`     | Create a new release (runs `n8n-node release`)                   |

> [!TIP]
> These scripts use the [@n8n/node-cli](https://www.npmjs.com/package/@n8n/node-cli) under the hood. You can also run CLI commands directly, e.g., `npx n8n-node dev`.

## Troubleshooting

### My node doesn't appear in n8n

1. Make sure you ran `npm install` to install dependencies
2. Check that your node is listed in `package.json` under `n8n.nodes`
3. Restart the dev server with `npm run dev`
4. Check the console for any error messages

### Linting errors

Run `npm run lint:fix` to automatically fix most common issues. For remaining errors, check the [n8n node development guidelines](https://docs.n8n.io/integrations/creating-nodes/).

### TypeScript errors

Make sure you're using Node.js v22 or higher and have run `npm install` to get all type definitions.

## Resources

- **[n8n Node Documentation](https://docs.n8n.io/integrations/creating-nodes/)** - Complete guide to building nodes
- **[n8n Community Forum](https://community.n8n.io/)** - Get help and share your nodes
- **[@n8n/node-cli Documentation](https://www.npmjs.com/package/@n8n/node-cli)** - CLI tool reference
- **[n8n Creator Portal](https://creators.n8n.io/nodes)** - Submit your node for verification
- **[Submit Community Nodes Guide](https://docs.n8n.io/integrations/creating-nodes/deploy/submit-community-nodes/)** - Verification requirements and process

## Contributing

Have suggestions for improving this starter? [Open an issue](https://github.com/n8n-io/n8n-nodes-starter/issues) or submit a pull request!

## License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
