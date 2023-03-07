/**
 * Pagin
 */
export interface Paging {
  pageNumber: number;
  pageSize: number;
}
/**
 * Response
 */
export interface CommonResponse {
    data?: any;
    status: string;
    message: string;
    code: number;
  }
  