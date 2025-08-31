// React is used in JSX transformation but not directly referenced
import { ComponentStory } from '@storybook/react';
import DataTable, { DataTableProps, Column } from './DataTable';

export default {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered',
  },
};

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'inactive' },
];

const columns: Column<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true, width: '80px' },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    sortable: true,
    render: (value) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {value}
      </span>
    ),
  },
];

const Template: ComponentStory<typeof DataTable> = (args: DataTableProps<Record<string, any>>) => (
  <div className="w-full max-w-4xl">
    <DataTable {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  data: users,
  columns: columns as Column<Record<string, any>>[],
};

export const Loading = Template.bind({});
Loading.args = {
  data: [],
  columns: columns as Column<Record<string, any>>[],
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  data: [],
  columns: columns as Column<Record<string, any>>[],
};

export const Sortable = Template.bind({});
Sortable.args = {
  data: users,
  columns: columns as Column<Record<string, any>>[],
};
Sortable.parameters = {
  docs: {
    description: {
      story: 'Click on column headers to sort the data. All columns are sortable in this example.',
    },
  },
};

export const Selectable = Template.bind({});
Selectable.args = {
  data: users,
  columns: columns as Column<Record<string, any>>[],
  selectable: true,
  onRowSelect: (selectedRows: Record<string, any>[]) => console.log('Selected rows:', selectedRows),
};
Selectable.parameters = {
  docs: {
    description: {
      story: 'Click on rows or checkboxes to select them. You can also use the checkbox in the header to select all rows.',
    },
  },
};