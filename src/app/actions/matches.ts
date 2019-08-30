import { Action } from '@ngrx/store';

export const PREVIEW = 'Preview';
export const TAKE = 'Take';

/**
 * PreviewAction is the action that triggers the preview of the matches.
 */
export class PreviewAction implements Action {
    readonly type = PREVIEW;

    constructor(public payload: number) { }
}

/**
 * TakeAction is the action that triggers the removal of the matches.
 */
export class TakeAction implements Action {
    readonly type = TAKE;

    constructor() { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
    PreviewAction
    | TakeAction;