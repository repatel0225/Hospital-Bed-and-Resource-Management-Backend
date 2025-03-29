export interface IApiResponse {
  code: number;
  message: string;
  status: "failure" | "success" | "error";
  data?: any;
}
