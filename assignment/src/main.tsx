import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import InputField from './components/InputField/InputField';
import DataTable, { Column } from './components/DataTable/DataTable';

// Sample data for DataTable
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
];

const columns: Column<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id' },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">React Component Library</h1>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">InputField Component</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              label="Default Input" 
              placeholder="Enter text here" 
              helperText="This is a helper text"
            />
            
            <InputField 
              label="Filled Variant" 
              placeholder="Filled input" 
              variant="filled"
            />
            
            <InputField 
              label="With Error" 
              placeholder="Error state" 
              errorMessage="This field is required"
              invalid
            />
            
            <InputField 
              label="Password Input" 
              placeholder="Enter password" 
              type="password"
              showPasswordToggle
            />
            
            <InputField 
              label="With Clear Button" 
              placeholder="Type to see clear button" 
              value="Clearable text"
              showClearButton
            />
            
            <InputField 
              label="Disabled Input" 
              placeholder="Cannot edit this" 
              disabled
            />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">DataTable Component</h2>
          <DataTable 
            data={users} 
            columns={columns} 
            selectable
          />
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);