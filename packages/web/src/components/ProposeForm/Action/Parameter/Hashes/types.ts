import type { UseFormReturn } from 'react-hook-form/dist/types/form';

import type { FormModel, Props as ParentProps } from '../../../types';

export type Props = {
  actionIndex: number;
  control: UseFormReturn<FormModel>['control'];
  hash: ParentProps['hash'];
  parameterIndex: number;
  setValue: UseFormReturn<FormModel>['setValue'];
};
