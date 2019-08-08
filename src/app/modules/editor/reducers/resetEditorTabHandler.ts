/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { resetEditorTab } from '../actions';
import { Reducer } from 'modules';

const resetEditorTabHandler: Reducer<typeof resetEditorTab, State> = (state, payload) => ({
    ...state,
    tabs: [
        ...state.tabs.slice(0, payload),
        {
            ...state.tabs[payload],
            value: state.tabs[payload].initialValue,
            dirty: false
        },
        ...state.tabs.slice(payload + 1),
    ]
});

export default resetEditorTabHandler;