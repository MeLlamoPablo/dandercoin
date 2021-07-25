import type { UseFormReturn } from 'react-hook-form/dist/types/form';

import type { FormModel, Props as ParentProps } from '../../../../types';

export type Props = {
  actionIndex: number;
  hash: ParentProps['hash'];
  parameterIndex: number;
  prompt: string;
  setValue: UseFormReturn<FormModel>['setValue'];
  value: string;
};
