import { isBefore } from 'date-fns';

export enum ConfirmByState {
  Before = 'Before',
  After = 'After',
}

type UseConfirmByProps = {
  confirmBy: Date;
};

export const useConfirmByState = ({ confirmBy }: UseConfirmByProps): ConfirmByState => {
  const NOW = new Date();
  const isBeforeState = isBefore(NOW, confirmBy);

  if (isBeforeState) {
    return ConfirmByState.Before;
  }
  return ConfirmByState.After;
};
