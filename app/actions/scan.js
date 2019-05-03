// @flow
import * as actions from './';
import type { BasicAction, ScanAction } from '../flow';

export const init = (): BasicAction => ({
	type: actions.INIT_SCAN,
});

export const finish = (): BasicAction => ({
	type: actions.FINISH_SCAN,
});

export const capture = (key: string, typePerson: string): ScanAction => ({
	type: actions.CAPTURE_SCAN,
	key,
	typePerson,
});
