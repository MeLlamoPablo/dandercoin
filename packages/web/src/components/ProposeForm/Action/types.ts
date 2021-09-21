import type { UseFormReturn } from 'react-hook-form/dist/types/form';
import type { UseFieldArrayReturn } from 'react-hook-form/dist/types/fieldArray';

import type { FormModel, Props as ParentProps } from '../types';

export type Props = {
  control: UseFormReturn<FormModel>['control'];
  hash: ParentProps['hash'];
  index: number;
  field: UseFieldArrayReturn<FormModel, 'actions'>['fields'][number];
  register: UseFormReturn<FormModel>['register'];
  remove: UseFieldArrayReturn<FormModel, 'actions'>['remove'];
  setValue: UseFormReturn<FormModel>['setValue'];
};
