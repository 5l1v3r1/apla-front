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
import { Observable } from 'rxjs/Observable';
import { signProtocol } from 'modules/content/actions';
import { modalShow } from 'modules/modal/actions';

const signProtocolEpic: Epic = (action$, store, { api }) =>
    action$.ofAction(signProtocol).flatMap(action => {
        const state = store.getState();
        const client = api({
            apiHost: state.auth.session.network.apiHost,
            sessionToken: state.auth.session.sessionToken
        });

        return Observable.from(
            client.getRow({
                id: String(action.payload.binaryID),
                table: 'binaries',
                columns: ['hash']
            })
        )
            .map(row => row.value.hash as string)
            .flatMap(hash =>
                fetch(
                    'https://apla-relay-lt.saurer.now.sh/api/relayPDFProtocol?' +
                        new URLSearchParams({
                            account: state.auth.wallet.wallet.address,
                            name: 'Minutes',
                            meetingID: action.payload.meetingID,
                            returnUrl: location.href,
                            link: `${state.auth.session.network.apiHost}/api/v2/data/1_binaries/${action.payload.binaryID}/data/${hash}`
                        } as any).toString(),
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/octet-stream'
                        }
                    }
                )
            )
            .flatMap(response => response.text())
            .map(data =>
                modalShow({
                    id: 'SIGN_PDF',
                    type: 'SIGN_PDF',
                    params: {
                        SAMLRequest: data,
                        RelayState: '',
                        redirect: location.href
                    }
                })
            )
            .catch(e => {
                // tslint:disable-next-line: no-console
                console.error(e);
                return Observable.empty<never>();
            });
    });

export default signProtocolEpic;