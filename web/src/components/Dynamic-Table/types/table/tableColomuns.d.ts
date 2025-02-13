type TTableColumns<T> = {
  label: string;
  key: string;
  renderCell?: (value: T) => React.ReactNode;
  minWidth?: number | string;
};
