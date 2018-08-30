import { Action } from '@ngrx/store';

export const INIT = 'Init';

export class InitAction implements Action {
    readonly type = INIT;

    constructor() { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions = InitAction;