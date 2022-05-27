export const stableSort = <T extends {}>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) => {
  const stabilizedThis = array.map((element, index) => {
    return [element, index] as [T, number];
  });

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) {
      return order;
    }
    return (a[1] = b[1]);
  });

  return stabilizedThis.map((element) => element[0]);
};
