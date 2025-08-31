# React Component Library

A collection of reusable React components built with TypeScript and styled with Tailwind CSS. This library includes two main components: InputField and DataTable, both fully tested and documented with Storybook.

## 📋 Table of Contents

- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Component Usage](#component-usage)
- [Architecture & Approach](#architecture--approach)
- [Testing](#testing)
- [Storybook](#storybook)
- [Deployment](#deployment)

## ✨ Features

### InputField Component
- Text input with label, placeholder, helper text, error message
- States: disabled, invalid, loading
- Variants: filled, outlined, ghost
- Sizes: small, medium, large
- Optional features: clear button, password toggle
- Support for light & dark theme

### DataTable Component
- Display tabular data
- Column sorting
- Row selection (single/multiple)
- Loading state
- Empty state

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd <repository-folder>
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Run tests
```bash
npm test
# or
yarn test
```

5. Start Storybook
```bash
npm run storybook
# or
yarn storybook
```

## 💻 Component Usage

### InputField

```tsx
import { InputField } from './components/InputField/InputField';

function MyForm() {
  const [value, setValue] = useState('');
  
  return (
    <InputField
      label="Username"
      placeholder="Enter your username"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      variant="outlined"
      size="md"
      helperText="Your username should be unique"
      showClearButton
    />
  );
}
```

### Password Input with Toggle

```tsx
import { InputField } from './components/InputField/InputField';

function PasswordForm() {
  const [password, setPassword] = useState('');
  
  return (
    <InputField
      label="Password"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      type="password"
      showPasswordToggle
      variant="filled"
      size="lg"
    />
  );
}
```

### DataTable

```tsx
import { DataTable, Column } from './components/DataTable/DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

function UserTable() {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
  ];
  
  const columns: Column<User>[] = [
    { key: 'id', title: 'ID', dataIndex: 'id' },
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
    { 
      key: 'role', 
      title: 'Role', 
      dataIndex: 'role',
      sortable: true,
      render: (value, record) => (
        <span className={`px-2 py-1 rounded ${value === 'Admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
          {value}
        </span>
      )
    },
  ];
  
  return (
    <DataTable
      data={users}
      columns={columns}
      selectable
      onRowSelect={setSelectedUsers}
    />
  );
}
```

## 🏗️ Architecture & Approach

### Project Structure

```
src/
├── components/
│   ├── DataTable/
│   │   ├── DataTable.tsx
│   │   ├── DataTable.test.tsx
│   │   └── DataTable.stories.tsx
│   ├── InputField/
│   │   ├── InputField.tsx
│   │   ├── InputField.test.tsx
│   │   └── InputField.stories.tsx
│   └── Introduction.stories.mdx
├── index.css
└── main.tsx
```

### Design Principles

1. **Component-Based Architecture**: Each UI element is a self-contained component with its own logic, styling, and tests.

2. **TypeScript for Type Safety**: All components are strongly typed with TypeScript interfaces to ensure proper usage and prevent runtime errors.

3. **Utility-First CSS with Tailwind**: Styling is done using Tailwind CSS, allowing for rapid development and consistent design.

4. **Composition over Inheritance**: Components are designed to be composed together rather than extended, promoting reusability.

5. **Controlled Components**: All form components follow the controlled component pattern, making state management predictable.

6. **Accessibility**: Components include proper ARIA attributes and keyboard navigation support.

7. **Responsive Design**: All components are designed to work across different screen sizes.

## 🧪 Testing

Components are tested using Jest and React Testing Library. Tests cover:

- Component rendering
- User interactions
- State changes
- Accessibility

Run tests with:

```bash
npm test
```

## 📚 Storybook

Storybook is used for component documentation and visual testing. Each component has its own story that showcases different states, variants, and usage examples.

Start Storybook with:

```bash
npm run storybook
```

## 🚢 Deployment

### GitHub

Push your code to GitHub:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Storybook Deployment with Chromatic

Deploy Storybook using Chromatic:

```bash
npx chromatic --project-token=<your-token>
```

### Demo Deployment with Vercel (Optional)

1. Connect your GitHub repository to Vercel
2. Configure the build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy

## 📝 License

MIT