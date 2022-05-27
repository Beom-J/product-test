import React from 'react';

import { Toolbar, alpha, Typography, Tooltip, IconButton } from '@mui/material';
import { AddRounded, Delete as DeleteIcon } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  numSelected: number;
};

const TableToolBarWithFilter = ({ numSelected }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Product
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="새 제품 추가">
          <IconButton onClick={() => navigate(`${location.pathname}/add`)}>
            <AddRounded />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default TableToolBarWithFilter;
