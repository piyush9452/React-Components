import React, { useState, useMemo } from 'react';
import clsx from 'clsx';

// Ensure clsx is properly imported
const classNames = clsx;

/**
 * Column configuration for DataTable
 */
export interface Column<T> {
  /** Unique key for the column */
  key: string;
  /** Display title for the column header */
  title: string;
  /** Property name from data object to display in this column */
  dataIndex: keyof T;
  /** Whether this column can be sorted */
  sortable?: boolean;
  /** Custom render function for cell content */
  render?: (value: any, record: T) => React.ReactNode;
  /** Optional width for the column (CSS value) */
  width?: string;
}

/**
 * Props for the DataTable component
 */
export interface DataTableProps<T> {
  /** Array of data items to display in the table */
  data: T[];
  /** Column configurations for the table */
  columns: Column<T>[];
  /** Whether the table is in a loading state */
  loading?: boolean;
  /** Whether rows can be selected */
  selectable?: boolean;
  /** Callback fired when row selection changes */
  onRowSelect?: (selectedRows: T[]) => void;
  /** Additional CSS class names to apply to the table */
  className?: string;
}

const DataTable = <T extends Record<string, any>>(
  props: DataTableProps<T>
) => {
  const { data, columns, loading = false, selectable = false, onRowSelect, className } = props;

  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Sort data based on current sort configuration
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === bValue) return 0;

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (sortConfig.direction === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
  }, [data, sortConfig]);

  // Handle column sort
  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    const key = column.dataIndex;
    let direction: 'asc' | 'desc' = 'asc';

    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }

    setSortConfig({ key, direction });
  };

  // Handle row selection
  const handleRowSelect = (row: T) => {
    if (!selectable) return;

    const isSelected = selectedRows.some((selectedRow) => selectedRow === row);
    let newSelectedRows: T[];

    if (isSelected) {
      newSelectedRows = selectedRows.filter((selectedRow) => selectedRow !== row);
    } else {
      newSelectedRows = [...selectedRows, row];
    }

    setSelectedRows(newSelectedRows);
    setSelectAll(newSelectedRows.length === data.length);
    onRowSelect && onRowSelect(newSelectedRows);
  };

  // Handle select all rows
  const handleSelectAll = () => {
    if (!selectable) return;

    const newSelectAll = !selectAll;
    const newSelectedRows = newSelectAll ? [...data] : [];

    setSelectAll(newSelectAll);
    setSelectedRows(newSelectedRows);
    onRowSelect && onRowSelect(newSelectedRows);
  };

  // Check if a row is selected
  const isRowSelected = (row: T) => {
    return selectedRows.some((selectedRow) => selectedRow === row);
  };

  // Render sort indicator
  const renderSortIndicator = (column: Column<T>) => {
    if (!column.sortable) return null;

    const isSorted = sortConfig && sortConfig.key === column.dataIndex;
    const direction = isSorted ? sortConfig.direction : null;

    return (
      <span className="ml-1">
        {direction === 'asc' ? '↑' : direction === 'desc' ? '↓' : '↕'}
      </span>
    );
  };

  // Table classes
  const tableClasses = classNames(
    'min-w-full divide-y divide-gray-200 dark:divide-gray-700',
    className
  );

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className={tableClasses} aria-label="Data table">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {selectable && (
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={classNames(
                  'px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider',
                  column.sortable && 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
                style={column.width ? { width: column.width } : undefined}
                onClick={() => handleSort(column)}
              >
                <div className="flex items-center">
                  {column.title}
                  {renderSortIndicator(column)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {loading ? (
            <tr>
              <td
                colSpan={selectable ? columns.length + 1 : columns.length}
                className="px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                <div className="flex justify-center items-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Loading...</span>
                </div>
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={selectable ? columns.length + 1 : columns.length}
                className="px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                No data available
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={classNames(
                  'hover:bg-gray-50 dark:hover:bg-gray-800',
                  selectable && 'cursor-pointer',
                  isRowSelected(row) && 'bg-blue-50 dark:bg-blue-900/20'
                )}
                onClick={() => handleRowSelect(row)}
              >
                {selectable && (
                  <td className="px-4 py-3 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={isRowSelected(row)}
                      onChange={() => handleRowSelect(row)}
                      onClick={(e) => e.stopPropagation()}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      aria-label={`Select row ${rowIndex + 1}`}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={`${rowIndex}-${column.key}`}
                    className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300"
                  >
                    {column.render
                      ? column.render(row[column.dataIndex], row)
                      : row[column.dataIndex]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;