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

import { Epic } from 'modules';
import * as actions from '../actions';
import { modalShow } from 'modules/modal/actions';
import { Observable } from 'rxjs';

const debugContractEpic: Epic = (action$, store, { api }) => action$.ofAction(actions.debugContract)
    .flatMap(action => {
        const state = store.getState();
        const client = api({
            apiHost: state.auth.session.network.apiHost,
            sessionToken: state.auth.session.sessionToken
        });
        return Observable.from(client.getContract({ name: action.payload }))
            .map(contract => modalShow({
                id: 'DEBUG_CONTRACT',
                type: 'DEBUG_CONTRACT',
                params: {
                    contract: action.payload,
                    fields: contract.fields
                }
            }));
    });

export default debugContractEpic;