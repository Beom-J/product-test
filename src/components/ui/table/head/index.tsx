import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
  Box
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import React, { ChangeEvent, MouseEvent } from 'react';

export type ProductColumn = {
  name: string;
  sku: string;
  upc: string;
  created_at: string;
  updated_at: string;
};

export type Order = 'asc' | 'desc';

interface HeadCell {
  disablePadding: boolean;
  id: keyof ProductColumn;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'name'
  },
  {
    id: 'sku',
    numeric: true,
    disablePadding: false,
    label: 'sku'
  },
  {
    id: 'upc',
    numeric: true,
    disablePadding: false,
    label: 'upc'
  },
  {
    id: 'created_at',
    numeric: true,
    disablePadding: false,
    label: 'created'
  },
  {
    id: 'updated_at',
    numeric: true,
    disablePadding: false,
    label: 'updated'
  }
];

type Props = {
  numSelected: number;
  order: Order;
  orderBy: string;
  rowCount: number;
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof ProductColumn
  ) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
};

const TableHeadWithSorting = ({
  numSelected,
  order,
  orderBy,
  rowCount,
  onRequestSort,
  onSelectAllClick
}: Props) => {
  const createSortHandler = (property: keyof ProductColumn) => {
    return (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadWithSorting;
