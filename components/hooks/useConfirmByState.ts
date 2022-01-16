import { getConfirmByState } from '../../common/utils';
import { ConfirmByState } from '../../common/types';

type UseConfirmByProps = {
  confirmBy: Date;
};

export const useConfirmByState = ({ confirmBy }: UseConfirmByProps): ConfirmByState => {
  return getConfirmByState(confirmBy);
};
