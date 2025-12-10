interface TableProps extends React.ComponentPropsWithoutRef<"table"> {
  className?: string
  ref?: React.Ref<HTMLTableElement>
}

const Table = ({ className, ref, ...props }: TableProps) => (
  <div className="w-full overflow-auto">
    <table ref={ref} className={`table-fixed w-full caption-bottom text-sm ${className}`} {...props} />
  </div>
)

interface TableHeaderProps extends React.ComponentPropsWithoutRef<"thead"> {
  className?: string
  ref?: React.Ref<HTMLTableSectionElement>
}

const TableHeader = ({ className, ref, ...props }: TableHeaderProps) => (
  <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
)

interface TableBodyProps extends React.ComponentPropsWithoutRef<"tbody"> {
  className?: string
  ref?: React.Ref<HTMLTableSectionElement>
}

const TableBody = ({ className, ref, ...props }: TableBodyProps) => (
  <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
)

interface TableRowProps extends React.ComponentPropsWithoutRef<"tr"> {
  className?: string
  ref?: React.Ref<HTMLTableRowElement>
}

const TableRow = ({ className, ref, ...props }: TableRowProps) => (
  <tr
    ref={ref}
    className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-14 ${className}`}
    {...props}
  />
)

interface TableHeadProps extends React.ComponentPropsWithoutRef<"th"> {
  className?: string
  ref?: React.Ref<HTMLTableCellElement>
}

const TableHead = ({ className, ref, ...props }: TableHeadProps) => (
  <th
    ref={ref}
    className={`h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  />
)

interface TableCellProps extends React.ComponentPropsWithoutRef<"td"> {
  className?: string
  ref?: React.Ref<HTMLTableCellElement>
}

const TableCell = ({ className, ref, ...props }: TableCellProps) => (
  <td ref={ref} className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
)

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }

