import React, {
  ChangeEvent,
  forwardRef,
  ReactElement,
  Ref,
  useEffect,
  useState
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';

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
  IconButton,
  Dialog,
  Slide,
  DialogTitle,
  DialogActions,
  Button
} from '@mui/material';
import { DeleteRounded, EditRounded } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';

import TableHeadWithSorting, {
  Order,
  ProductColumn
} from '../../../../components/ui/table/head';
import TableToolBarWithFilter from '../../../../components/ui/table/toolbar';
import { getComparator } from '../../../../utils/getComparator';
import {
  KEY_PRODUCT_LIST,
  ProductTable as Product
} from '../../../../models/product/datas';
import { Product as Model } from '../../../../models';
import { Styler } from './styler';

const useQuery = Model.Query.useProductList;

const ProductTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof ProductColumn>('name');

  const [selected, setSelected] = useState<readonly Product[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [deleteIdList, setDeleteIdList] = useState<readonly number[]>([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openModal, setOpenModal] = useState(false);

  const useDelete = Model.Mutation.useDeleteProduct();
  const { data } = useQuery();

  useEffect(() => {
    if (data) {
      setProductList([...data.products]);
      setSelected([]);
    }
  }, [data]);

  const isSelected = (id: number) =>
    selected.findIndex((product) => product.id === id) !== -1;

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
      const newSelecteds = data ? data.products.map((product) => product) : [];
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

  const handleClickRow = (
    event: React.MouseEvent<unknown>,
    selectedProduct: Product
  ) => {
    event.preventDefault();
    const selectedIndex = selected.findIndex(
      (product) => product.name === selectedProduct.name
    );
    let newSelected: readonly Product[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, selectedProduct);
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

  const handleDeleteOne = (productId: number) => {
    setDeleteIdList([productId]);
    setOpenModal(true);
  };

  const handleCloseDelete = () => {
    setDeleteIdList([]);
    setOpenModal(false);
  };

  const handleDeleteAll = () => {
    const deleteList = selected.map((product) => product.id);
    setDeleteIdList(deleteList);
    setOpenModal(true);
  };

  const handleAgreeDelete = async () => {
    await deleteIdList.forEach(async (id) => {
      await useDelete.mutateAsync(id, {
        onSuccess: () => {
          queryClient.invalidateQueries(KEY_PRODUCT_LIST);
        }
      });
    });

    handleCloseDelete();
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableToolBarWithFilter
            numSelected={selected.length}
            onDelete={handleDeleteAll}
          />
          {productList && (
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
                    rowCount={productList.length}
                  />
                  <TableBody>
                    {productList
                      .slice()
                      .sort(getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClickRow(event, row)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
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
                                      onClick={() => handleDeleteOne(row.id)}
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
                  count={productList.length}
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
      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDelete}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'선택한 제품을 삭제하시겠습니까?'}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDelete}>취소</Button>
          <Button onClick={handleAgreeDelete}>삭제</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ProductTable;
