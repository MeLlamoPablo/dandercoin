import { useWatch } from 'react-hook-form';

import { useAddressVerification } from './logic';
import { Container } from './styles';
import type { Props } from './types';

export default function ContractInfo({ control, index }: Props) {
  const target = useWatch({
    control,
    name: `actions.${index}.target` as const,
    defaultValue: undefined,
  }) as string | undefined;

  const contract = useAddressVerification(target);

  return (
    <Container $verified={!!contract}>
      {contract
        ? `Contrato verificado: ${contract}`
        : 'No se reconoce el contrato'}
    </Container>
  );
}
