export enum AlertType {
  'success',
  'error',
  'warning',
  'info',
}

export interface Alert {
  type: AlertType;
  message: string;
  isClosed: boolean;
  isClosable?: boolean;
}
