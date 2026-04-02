import type { ReactNode } from "react";
import "./index.css";

export interface GridColumn<T> {
  key: string;
  title: string;
  render: (row: T, index: number) => ReactNode;
}

interface GridProps<T> {
  data: T[];
  columns: GridColumn<T>[];
  emptyMessage?: string;
}

export default function Grid<T>(props: GridProps<T>) {
  const { data, columns, emptyMessage = "No records found." } = props;

  return (
    <div className="app-grid-wrapper">
      <table className="app-grid">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="app-grid-empty" colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key}>{column.render(row, index)}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}