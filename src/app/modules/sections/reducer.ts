/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as actions from './actions';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ISection } from 'apla/content';
import updateSectionHandler from './reducers/updateSectionHandler';
import sectionsInitHandler from './reducers/sectionsInitHandler';
import menuPopHandler from './reducers/menuPopHandler';
import menuPushHandler from './reducers/menuPushHandler';
import renderPageDoneHandler from './reducers/renderPageDoneHandler';
import renderPageFailedHandler from './reducers/renderPageFailedHandler';
import renderPageHandler from './reducers/renderPageHandler';

export type State = {
    readonly mainSection: string;
    readonly sections: {
        readonly [name: string]: ISection;
    };
};

export const initialState: State = {
    mainSection: 'home',
    sections: {}
};

// export const initialState: State = {
//     mainSection: null,
//     section: null,
//     sections: {},
//     systemSections: [{
//         key: 'editor',
//         name: 'editor',
//         title: 'Editor',
//         visible: false,
//         closeable: true,
//         defaultPage: 'editor',
//         pending: false,
//         force: false,
//         menus: [],
//         menuDisabled: true,
//         menuVisible: true,
//         page: null
//     }],
//     inited: false
// };

export default reducerWithInitialState(initialState)
    .case(actions.updateSection, updateSectionHandler)
    .case(actions.menuPop, menuPopHandler)
    .case(actions.menuPush, menuPushHandler)
    .case(actions.renderPage.done, renderPageDoneHandler)
    .case(actions.renderPage.failed, renderPageFailedHandler)
    .case(actions.renderPage.started, renderPageHandler)
    .case(actions.sectionsInit, sectionsInitHandler);