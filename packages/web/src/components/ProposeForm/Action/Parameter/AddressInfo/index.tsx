import { useWatch } from 'react-hook-form';

import { useAddressVerification } from '../../ContractInfo/logic';
import { Container } from './styles';
import type { Props } from './types';

export default function ContractInfo({
  actionIndex,
  control,
  parameterIndex,
}: Props) {
  const type = useWatch({
    control,
    name: `actions.${actionIndex}.parameters.${parameterIndex}.type` as const,
    defaultValue: undefined,
  }) as string | undefined;

  const value = useWatch({
    control,
    name: `actions.${actionIndex}.parameters.${parameterIndex}.value` as const,
    defaultValue: undefined,
  }) as string | undefined;

  const contract = useAddressVerification(value);

  if (type !== 'address') {
    return null;
  }

  return (
    <Container $verified={!!contract}>
      {contract
        ? `Dirección verificada: ${contract}`
        : 'No se reconoce la dirección'}
    </Container>
  );
}
