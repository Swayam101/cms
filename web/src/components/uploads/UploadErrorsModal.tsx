import React from "react";
import { UploadErrorsTable } from "../../constants/UploadErrorsTable";
import DefaultTable from "../Dynamic-Table/table/DefaultTable";
import { IUploadErrorsTableData } from "../../types";

interface IProps {
  errors: IUploadErrorsTableData[];
  isLoading: boolean;
}

const UploadErrorsModal: React.FC<IProps> = ({ errors, isLoading }) => {
  return (
    <DefaultTable
      columns={UploadErrorsTable as TTableColumns<unknown>[]}
      data={errors}
      isLoading={isLoading}
    />
  );
};

export default UploadErrorsModal;
