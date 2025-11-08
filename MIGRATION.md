# Migration Guide - Version 0.3.0

## Overview

Version 0.3.0 introduces a complete architectural overhaul of the n8n-nodes-tecnocall package. This guide will help you understand what has changed and how to migrate from the old structure.

## 🎯 What's Changed

### Architecture Improvements

#### Before (v0.2.x)
```
nodes/Tecnocall/
├── Tecnocall.node.ts          # 150+ lines with nested if-else
├── customer/
│   ├── createCustomer.ts      # Mixed UI + logic
│   ├── getCustomers.ts        # Repetitive error handling
│   └── updateCustomer.ts      # Direct API calls
└── communication/
    └── createCommunication.ts # Inline JSON parsing
```

#### After (v0.3.x)
```
nodes/Tecnocall/
├── Tecnocall.node.ts          # Clean, minimal entry point
├── router.ts                  # Centralized operation routing
├── types.ts                   # TypeScript type definitions
├── utils.ts                   # Shared utilities
├── actions/                   # Pure operation handlers
│   ├── customer.ts
│   └── communication.ts
└── descriptions/              # Separated UI definitions
    ├── CustomerDescription.ts
    └── CommunicationDescription.ts
```

## 🔄 Breaking Changes

### 1. Operation Names Changed

**Customer Operations:**
- ✅ `createCustomer` → `create`
- ✅ `getCustomers` → `getAll`
- ✅ `updateCustomer` → `update`
- ✨ NEW: `get` (get single customer by ID)

**Communication Operations:**
- ✅ `createCommunication` → `create`
- ✨ NEW: `get` (get single communication by ID)
- ✨ NEW: `getAll` (get many communications)

### 2. Migration Steps for Existing Workflows

If you have existing n8n workflows using this node:

#### Step 1: Backup Your Workflows
Export your workflows before updating the node package.

#### Step 2: Update the Package
```bash
npm update n8n-nodes-tecnocall
# or
pnpm update n8n-nodes-tecnocall
```

#### Step 3: Update Operation Names
Open each workflow using Tecnocall node and:
- Change `createCustomer` to `create`
- Change `getCustomers` to `getAll`
- Change `updateCustomer` to `update`
- Change `createCommunication` to `create`

#### Step 4: Test Your Workflows
Run your workflows to ensure they work correctly with the new version.

## ✨ New Features

### 1. Get Single Customer
```json
{
  "resource": "customer",
  "operation": "get",
  "customerId": "12345"
}
```

### 2. Get Single Communication
```json
{
  "resource": "communication",
  "operation": "get",
  "communicationId": "67890"
}
```

### 3. Get Many Communications
```json
{
  "resource": "communication",
  "operation": "getAll",
  "returnAll": false,
  "limit": 50,
  "filters": {
    "agent_code": "AGT001",
    "customer_code": "CUST001",
    "type": "call"
  }
}
```

### 4. Enhanced Get Many Customers
Now includes additional filters:
- `agent_code` - Filter by agent
- `source_id` - Filter by source
- `page` - Pagination support

## 🎨 Code Quality Improvements

### Type Safety
```typescript
// Before: No types
const body = this.getNodeParameter('additionalFields', i, {});

// After: Strongly typed
const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
const body: CreateCustomerParams = cleanObject({
  name: additionalFields.name as string,
  email: additionalFields.email as string,
  // ...
});
```

### Error Handling
```typescript
// Before: Basic error handling
catch (error) {
  if (this.continueOnFail()) {
    returnData.push({ json: { error: error.message } });
  }
  throw error;
}

// After: Contextual error handling
catch (error) {
  throw new NodeOperationError(
    this.getNode(),
    `Failed to create customer: ${(error as Error).message}`,
    { itemIndex: index }
  );
}
```

### API Requests
```typescript
// Before: Repeated code
const credentials = await this.getCredentials('tecnocallApi');
const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');
const response = await this.helpers.httpRequest({
  method: 'POST',
  url: `${baseUrl}/api/bot/customers`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${credentials.botToken}`,
  },
  body,
});

// After: Centralized utility
const response = await tecnocallApiRequest.call(this, {
  method: 'POST',
  endpoint: '/api/bot/customers',
  body,
}, index);
```

## 🛠️ For Developers

### Adding New Operations

#### Old Way (v0.2.x)
1. Create operation file with UI + logic mixed
2. Import in main node file
3. Add if-else statement in execute method
4. Spread properties in properties array

#### New Way (v0.3.x)
1. Define types in `types.ts`
2. Create UI description in `descriptions/`
3. Create handler in `actions/`
4. Register in `router.ts`
5. Import descriptions in main node

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed examples.

## 📊 Performance Impact

- ✅ No performance degradation
- ✅ Slightly faster compilation due to better code splitting
- ✅ Better tree-shaking in production builds
- ✅ Improved runtime error handling

## 🐛 Bug Fixes

This release includes fixes for:
- Inconsistent error messages
- Missing validation for required fields
- JSON parsing errors in communication data
- Array response handling in getCustomers

## 📚 Additional Resources

- [ARCHITECTURE.md](ARCHITECTURE.md) - Detailed architecture documentation
- [README.md](README.md) - Updated usage documentation
- [CHANGELOG.md](CHANGELOG.md) - Complete change log

## ❓ FAQ

### Q: Will my existing workflows break?
A: The operation names have changed, but functionality remains the same. You'll need to update operation names in your workflows.

### Q: Do I need to update my credentials?
A: No, credentials configuration remains unchanged.

### Q: Can I rollback to v0.2.x?
A: Yes, you can install a specific version:
```bash
npm install n8n-nodes-tecnocall@0.2.9
```

### Q: Are there any new dependencies?
A: No, the package uses the same dependencies as before.

### Q: How do I report issues?
A: Please open an issue on [GitHub](https://github.com/Pixlink-Team/n8n-nodes-tecnocall/issues).

## 🙏 Need Help?

If you encounter any issues during migration:
1. Check this guide thoroughly
2. Review the [ARCHITECTURE.md](ARCHITECTURE.md)
3. Open an issue on GitHub with details about your use case
