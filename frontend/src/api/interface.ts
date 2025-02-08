interface IGenericResponse<T> {
  data: T;
  error: string;
  success: boolean;
}
