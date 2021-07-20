import type { UseFormReturn } from 'react-hook-form/dist/types/form';
import type { UseFieldArrayReturn } from 'react-hook-form/dist/types/fieldArray';

import type { FormModel, Props as ParentProps } from '../../types';

export type Props = {
  actionIndex: number;
  control: UseFormReturn<FormModel>['control'];
  hash: ParentProps['hash'];
  index: number;
  field: any;
  register: UseFormReturn<FormModel>['register'];
  remove: UseFieldArrayReturn<
    FormModel,
    `actions.${number}.parameters`
  >['remove'];
  setValue: UseFormReturn<FormModel>['setValue'];
};
