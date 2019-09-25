// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

import { State } from '../reducer';
import { reloadEditorTab } from '../actions';
import { Reducer } from 'modules';
import findTabIndex from './findTabIndex';

const reloadEditorTabHandler: Reducer<typeof reloadEditorTab, State> = (state, payload) => {
    const index = findTabIndex(state, payload);
    const value = state.tabs[index];

    if (-1 === index) {
        return state;
    }
    else {
        return {
            ...state,
            tabs: [
                ...state.tabs.slice(0, index),
                {
                    ...value,
                    ...payload.data,
                    dirty: 'boolean' === typeof payload.data.dirty ?
                        payload.data.dirty :
                        (value.value !== (payload.data.initialValue || value.initialValue))
                },
                ...state.tabs.slice(index + 1)
            ]
        };
    }
};

export default reloadEditorTabHandler;