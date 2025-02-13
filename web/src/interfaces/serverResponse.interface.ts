export interface IServerResponse {
  statusCode: 200 | 400 | 500 | 401 | 201 | 204 | 429;
  status: "success" | "error";
  title: string;
  message: string;
  data?: any;
  extraData?: object | string;
  pageData?: {
    totalPages: number;
    totalDocuments: number;
    currentPage: number;
    total?: number;
  };
}
