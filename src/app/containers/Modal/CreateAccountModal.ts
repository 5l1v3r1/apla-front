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

import { connect } from 'react-redux';
import { modalShow } from 'modules/modal/actions';
import { IModalProps } from 'components/Modal';

import CreateAccountModal from 'components/Modal/Auth/CreateAccountModal';

export default connect(
    null,
    {
        modalShow
    },
    (_state, dispatch: any, props: IModalProps<{}, string>) => ({
        ...props,
        onResult: (password: string) => {
            dispatch.modalShow({
                id: 'AUTH_SECURITY_NOTICE',
                type: 'AUTH_SECURITY_NOTICE',
                params: {
                    password
                }
            });
        }
    })
)(CreateAccountModal);
