# Tecnocall n8n Node - Architecture Documentation

## 📁 Project Structure

```
n8n-nodes-tecnocall/
├── credentials/
│   └── TecnocallApi.credentials.ts    # API authentication
├── nodes/
│   └── Tecnocall/
│       ├── Tecnocall.node.ts          # Main node definition
│       ├── Tecnocall.node.json        # Node metadata
│       ├── types.ts                   # TypeScript type definitions
│       ├── utils.ts                   # Utility functions
│       ├── router.ts                  # Operation router
│       ├── actions/                   # Operation handlers
│       │   ├── customer.ts
│       │   └── communication.ts
│       ├── descriptions/              # UI descriptions
│       │   ├── CustomerDescription.ts
│       │   └── CommunicationDescription.ts
│       ├── customer/                  # Legacy (can be removed)
│       └── communication/             # Legacy (can be removed)
└── icons/
    ├── tecnocall.svg
    └── tecnocall.dark.svg
```

## 🏗️ Architecture Overview

### 1. **Main Node (`Tecnocall.node.ts`)**
- Entry point for the node
- Defines node metadata and properties
- Delegates execution to the router

### 2. **Router (`router.ts`)**
- Central routing mechanism
- Maps resource + operation combinations to handlers
- Provides clean error handling
- Eliminates nested if-else statements

```typescript
const operationRouter: OperationMap = {
  customer: {
    create: createCustomer,
    get: getCustomer,
    getAll: getAllCustomers,
    update: updateCustomer,
  },
  communication: {
    create: createCommunication,
    get: getCommunication,
    getAll: getAllCommunications,
  },
};
```

### 3. **Type Definitions (`types.ts`)**
- Centralized type definitions
- Type-safe interfaces for all operations
- API request/response types
- Parameter types for each operation

### 4. **Utilities (`utils.ts`)**
- `tecnocallApiRequest()` - Unified API request handler
- `cleanObject()` - Remove undefined/null values
- `safeJsonParse()` - Safe JSON parsing
- `buildQueryString()` - Query parameter builder
- `validateRequiredFields()` - Input validation

### 5. **Actions (Operation Handlers)**
- **`actions/customer.ts`**: Customer CRUD operations
  - `createCustomer()`
  - `getCustomer()`
  - `getAllCustomers()`
  - `updateCustomer()`
  
- **`actions/communication.ts`**: Communication operations
  - `createCommunication()`
  - `getCommunication()`
  - `getAllCommunications()`

### 6. **Descriptions (UI Definitions)**
- **`descriptions/CustomerDescription.ts`**
  - Customer operation options
  - Customer field definitions
  
- **`descriptions/CommunicationDescription.ts`**
  - Communication operation options
  - Communication field definitions

## ✨ Key Improvements

### 1. **Separation of Concerns**
- UI definitions separate from business logic
- Operation handlers isolated and testable
- Centralized utilities for common tasks

### 2. **Type Safety**
- Strong TypeScript typing throughout
- Interfaces for all data structures
- Compile-time error detection

### 3. **Maintainability**
- Easy to add new resources/operations
- Clear file organization
- Self-documenting code structure

### 4. **Error Handling**
- Centralized error handling in utilities
- Consistent error messages
- Proper error context with item indices

### 5. **Scalability**
- Router pattern allows easy addition of operations
- No need to modify main node file for new operations
- Modular architecture

## 🔄 Adding New Operations

### Step 1: Define Types
Add interfaces to `types.ts`:
```typescript
export interface NewResourceParams {
  field1: string;
  field2: number;
}
```

### Step 2: Create Description
Add to `descriptions/NewResourceDescription.ts`:
```typescript
export const newResourceOperations: INodeProperties[] = [...];
export const newResourceFields: INodeProperties[] = [...];
```

### Step 3: Create Action Handler
Add to `actions/newResource.ts`:
```typescript
export async function createNewResource(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData> {
  // Implementation
}
```

### Step 4: Register in Router
Update `router.ts`:
```typescript
const operationRouter: OperationMap = {
  // ... existing
  newResource: {
    create: createNewResource,
  },
};
```

### Step 5: Update Main Node
Import and spread in `Tecnocall.node.ts`:
```typescript
import { newResourceOperations, newResourceFields } from './descriptions/NewResourceDescription';

// In properties array:
...newResourceOperations,
...newResourceFields,
```

## 🧪 Testing

```bash
# Run linter
pnpm run lint

# Fix lint issues
pnpm run lint:fix

# Build project
pnpm run build

# Watch mode for development
pnpm run build:watch
```

## 📝 Best Practices

1. **Always use TypeScript types** - Never use `any` unnecessarily
2. **Clean objects before API requests** - Remove undefined/null values
3. **Handle errors at operation level** - Use try-catch in handlers
4. **Support continueOnFail** - Return error objects instead of throwing
5. **Use pairedItem** - Maintain item relationships in output
6. **Validate inputs** - Check required fields before API calls
7. **Document operations** - Add clear descriptions to all fields

## 🚀 Migration from Old Structure

The old structure had:
- Operations mixed with UI definitions
- Repetitive error handling
- Direct API calls in each operation
- Nested if-else statements

The new structure provides:
- ✅ Separation of concerns
- ✅ Reusable utilities
- ✅ Router pattern
- ✅ Better type safety
- ✅ Easier testing
- ✅ Better maintainability

## 📚 Resources

- [n8n Node Development Documentation](https://docs.n8n.io/integrations/creating-nodes/)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
