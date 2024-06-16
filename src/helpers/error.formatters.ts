import { KindeErrors } from 'src/services/kinde/interfaces/kinde.error.interface';

export function kindeErrorFormatter(
  error: KindeErrors,
  status: number,
): {
  message: string;
  code: string;
  status: number;
} {
  return {
    message: error.errors.map((err) => err.message).join(', '),
    code: error.errors.map((err) => err.code).join(', '),
    status,
  };
}
