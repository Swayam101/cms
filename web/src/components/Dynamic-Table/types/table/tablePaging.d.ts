import React from "react";

type TPaging = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalDocuments: number;
};
