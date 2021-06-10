import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import type { FC } from 'react';
import useConnect from './connect';

const CHAIN_NAME = process.env.NEXT_PUBLIC_ETHEREUM_CHAIN_NAME ?? '';

const NetworkMismatchModal: FC = () => {
  const { handle, isCorrectNetwork } = useConnect();

  return (
    <Dialog open={!isCorrectNetwork}>
      <DialogTitle>Red de blockchain equivocada</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tu cartera MetaMask está conectada a la red equivocada.
        </DialogContentText>
        <DialogContentText>
          Debes conectarte a <strong>{CHAIN_NAME}</strong>.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handle.setupMetamaskNetwork}>
          Cambiar red
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NetworkMismatchModal;
