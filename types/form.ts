export type DocumentFormData = {
  location: string;
  noOfEmployee: string;
  company: string;
  reportingDate: Date | undefined;
  dailyWorkingHours: string;
  noOfMaleWorkers: string;
  totalWorkers: string;
  observation: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  email: string;
  password?: string;
  role: 'User';
  providerId?: string;
  provider?: 'Local' | 'Google';
};
