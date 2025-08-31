// React is used in JSX transformation but not directly referenced
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataTable, { Column } from './DataTable';

interface TestItem {
  id: number;
  name: string;
  age: number;
}

const testData: TestItem[] = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
];

const testColumns: Column<TestItem>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];

describe('DataTable', () => {
  test('renders table with correct data', () => {
    render(<DataTable data={testData} columns={testColumns} />);
    
    // Check if column headers are rendered
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    
    // Check if data rows are rendered
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
  });

  test('sorts data when column header is clicked', () => {
    render(<DataTable data={testData} columns={testColumns} />);
    
    // Get the Name column header and click it to sort
    const nameHeader = screen.getByText('Name').closest('th');
    fireEvent.click(nameHeader!);
    
    // Check if data is sorted alphabetically (Alice, Bob, Charlie)
    const cells = screen.getAllByRole('cell');
    expect(cells[1]).toHaveTextContent('Alice');
    expect(cells[4]).toHaveTextContent('Bob');
    expect(cells[7]).toHaveTextContent('Charlie');
    
    // Click again to sort in reverse
    fireEvent.click(nameHeader!);
    
    // Check if data is sorted in reverse alphabetically (Charlie, Bob, Alice)
    const cellsAfterSecondClick = screen.getAllByRole('cell');
    expect(cellsAfterSecondClick[1]).toHaveTextContent('Charlie');
    expect(cellsAfterSecondClick[4]).toHaveTextContent('Bob');
    expect(cellsAfterSecondClick[7]).toHaveTextContent('Alice');
  });

  test('selects rows and triggers callback', () => {
    const mockSelectCallback = jest.fn();
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable={true}
        onRowSelect={mockSelectCallback}
      />
    );
    
    // Find checkboxes and select the first row
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(4); // 3 rows + 1 header checkbox
    
    fireEvent.click(checkboxes[1]); // First row checkbox
    
    // Check if callback was called with the selected row
    expect(mockSelectCallback).toHaveBeenCalledTimes(1);
    expect(mockSelectCallback).toHaveBeenCalledWith([testData[0]]);
    
    // Select all rows
    fireEvent.click(checkboxes[0]); // Header checkbox
    
    // Check if callback was called with all rows
    expect(mockSelectCallback).toHaveBeenCalledTimes(2);
    expect(mockSelectCallback).toHaveBeenCalledWith(testData);
  });

  test('shows loading spinner', () => {
    render(<DataTable data={[]} columns={testColumns} loading={true} />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('shows empty state', () => {
    render(<DataTable data={[]} columns={testColumns} />);
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  test('renders custom cell content with render prop', () => {
    const columnsWithRender: Column<TestItem>[] = [
      ...testColumns,
      {
        key: 'status',
        title: 'Status',
        dataIndex: 'age',
        render: (value) => value > 30 ? 'Senior' : 'Junior',
      },
    ];
    
    render(<DataTable data={testData} columns={columnsWithRender} />);
    
    // Use getAllByText for Junior since there are multiple instances
    const juniorElements = screen.getAllByText('Junior');
    expect(juniorElements.length).toBe(2); // Alice and Bob
    expect(screen.getByText('Senior')).toBeInTheDocument(); // Charlie
  });
});