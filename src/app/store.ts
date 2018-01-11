// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import 'rxjs';
import 'lib/external/fsa';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';
import debounce from 'redux-localstorage-debounce';

import { History } from 'history';
import createHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import rootReducer, { rootEpic, IRootState } from './modules';
import platform from 'lib/platform';

export const history = platform.select<() => History>({
    desktop: createMemoryHistory,
    web: createHistory
})();

const reducer = compose(
    mergePersistedState()
)(rootReducer);

const storage = compose(
    debounce(1000, 5000),
    filter([
        'storage',
        'auth.isAuthenticated',
        'auth.sessionToken',
        'auth.refreshToken',
        'auth.account'
    ])
)(adapter(window.localStorage));

const configureStore = (initialState?: IRootState) => {
    const enhancers: any[] = [];
    const middleware = [
        routerMiddleware(history),
        createEpicMiddleware(rootEpic),
        loadingBarMiddleware({
            promiseTypeSuffixes: ['STARTED', 'DONE', 'FAILED']
        })
    ];

    if (process.env.NODE_ENV === 'development') {
        const devToolsExtension = (window as { devToolsExtension?: string }).devToolsExtension;

        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension());
        }
    }

    const composedEnhancers = compose(
        applyMiddleware(...middleware),
        persistState(storage, 'persistentData'),
        ...enhancers
    );

    return createStore<IRootState>(
        reducer,
        initialState!,
        composedEnhancers
    );
};

const store = platform.select({
    web: () => configureStore(),
    desktop: () => {
        const Electron = require('electron');
        const initialState = Electron.ipcRenderer.sendSync('getState');
        const storeInstance = initialState ? configureStore(initialState) : configureStore();

        storeInstance.subscribe(() => {
            const state = storeInstance.getState();
            Electron.ipcRenderer.send('setState', {
                auth: state.auth,
                engine: state.engine
            });
        });

        return storeInstance;
    }
})();

export default store;