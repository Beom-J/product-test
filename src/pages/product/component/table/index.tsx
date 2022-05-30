import React, { ChangeEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TablePagination,
  IconButton
} from '@mui/material';
import { DeleteRounded, EditRounded } from '@mui/icons-material';

import TableHeadWithSorting, {
  Order,
  ProductColumn
} from '../../../../components/ui/table/head';
import TableToolBarWithFilter from '../../../../components/ui/table/toolbar';
import { useProductList } from '../../../../models/product/queries';
import { getComparator } from '../../../../utils/getComparator';
import { Styler } from './styler';

const ProductTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof ProductColumn>('name');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data } = useProductList();

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage - (data ? data.products.length : 0)
        )
      : 0;

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data
        ? data.products.map((product) => product.name)
        : [];
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ProductColumn
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    event.preventDefault();
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolBarWithFilter numSelected={selected.length} />
        {data && (
          <>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={'medium'}
              >
                <TableHeadWithSorting
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={data.products.length}
                />
                <TableBody>
                  {data.products
                    .slice()
                    .sort(getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.name)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.name}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align="left">{row.sku}</TableCell>
                          <TableCell align="left">{row.upc}</TableCell>
                          <TableCell align="left">{row.created_at}</TableCell>
                          <TableCell align="left">
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                              }}
                            >
                              {row.updated_at}

                              {/* 클릭 시 수정 & 삭제 버튼 노출 */}
                              {isItemSelected && (
                                <Box>
                                  <IconButton
                                    color="primary"
                                    LinkComponent="span"
                                    size="small"
                                    onClick={() =>
                                      navigate(
                                        `${location.pathname}/edit?product_id=${row.id}`
                                      )
                                    }
                                  >
                                    <EditRounded fontSize="inherit" />
                                  </IconButton>
                                  <IconButton
                                    color="primary"
                                    LinkComponent="span"
                                    size="small"
                                  >
                                    <DeleteRounded fontSize="inherit" />
                                  </IconButton>
                                </Box>
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Styler>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Styler>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default ProductTable;
