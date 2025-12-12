import { HTMLAttributes } from "react"

type TableProps = HTMLAttributes<HTMLTableElement>

export const Table = ({ className = "", ...props }: TableProps) => (
  <div className="w-full overflow-auto">
    <table className={`table-fixed w-full caption-bottom text-sm ${className}`} {...props} />
  </div>
)

type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>

export const TableHeader = ({ className = "", ...props }: TableHeaderProps) => (
  <thead className={`[&_tr]:border-b ${className}`} {...props} />
)

type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>

export const TableBody = ({ className = "", ...props }: TableBodyProps) => (
  <tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
)

type TableRowProps = HTMLAttributes<HTMLTableRowElement>

export const TableRow = ({ className = "", ...props }: TableRowProps) => (
  <tr
    className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-14 ${className}`}
    {...props}
  />
)

type TableHeadProps = HTMLAttributes<HTMLTableCellElement>

export const TableHead = ({ className = "", ...props }: TableHeadProps) => (
  <th
    className={`h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  />
)

type TableCellProps = HTMLAttributes<HTMLTableCellElement>

export const TableCell = ({ className = "", ...props }: TableCellProps) => (
  <td className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
)
