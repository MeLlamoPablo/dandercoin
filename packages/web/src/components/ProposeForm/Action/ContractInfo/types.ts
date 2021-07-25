import type { UseFormReturn } from 'react-hook-form/dist/types/form';

import type { FormModel } from '../../types';

export type Props = {
  control: UseFormReturn<FormModel>['control'];
  index: number;
};
