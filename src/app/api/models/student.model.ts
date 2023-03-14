import { CommonResponse } from "./common.model";

export interface RsGetStudents extends CommonResponse  {
    data: StudentResult[];
}

export interface RsGetStudent extends CommonResponse  {
  data: StudentResult;
}
export interface StudentResult {
  id: number,
  name: string,
  phoneNumber: string
}