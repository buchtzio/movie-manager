import { Alert } from '@mui/material';

interface ErrorAlertProps {
  error: string;
}

const ErrorAlert = ({ error }: ErrorAlertProps) => {
  return (
    error && (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    )
  );
};

export default ErrorAlert;
