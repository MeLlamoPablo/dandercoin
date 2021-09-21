import type { UseFormReturn } from 'react-hook-form/dist/types/form';

import type { FormModel } from '../../../types';

export type Props = {
  actionIndex: number;
  control: UseFormReturn<FormModel>['control'];
  parameterIndex: number;
};
