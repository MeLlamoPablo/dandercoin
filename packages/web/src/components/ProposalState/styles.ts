import DefaultTooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core';
import styled, { css } from 'styled-components';

import DefaultIcon from './Icon';
import type { Props } from './types';

export const Container = styled.span<{ $state: Props['state'] }>`
  align-items: center;
  border-radius: 0.25rem;
  border: 1px solid currentColor;
  display: inline-flex;
  justify-content: flex-start;
  padding: 0.25rem 0.5rem;

  ${({ $state }) => {
    switch ($state) {
      case 'pending':
      case 'queued':
        return css`
          color: #757575;
        `;
      case 'active':
        return css`
          color: #0d47a1;
        `;
      case 'expired':
      case 'canceled':
        return css`
          color: #ff6f00;
        `;
      case 'defeated':
        return css`
          color: #bf360c;
        `;
      case 'executed':
      case 'succeeded':
        return css`
          color: #33691e;
        `;
      default:
        return css``;
    }
  }};
`;

export const Tooltip = withStyles({
  tooltip: {
    fontSize: '1rem',
  },
})(DefaultTooltip);

export const Icon = styled(DefaultIcon)`
  margin-right: 0.75rem;
  height: 24px;
  width: 24px;
`;

export const Label = styled.span`
  font-size: 1.1rem;
`;
