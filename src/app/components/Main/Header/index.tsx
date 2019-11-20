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
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA

import React from 'react';

import Header from 'components/Header';
import NotificationsMenu from 'containers/Main/Header/NotificationsMenu';
import UserMenu from 'containers/Main/Header/UserMenu';
import BackButton from './BackButton';

interface Props {
    returnUrl?: string;
}

const MainHeader: React.SFC<Props> = props => (
    <Header
        left={
            <div>{props.returnUrl && <BackButton to={props.returnUrl} />}</div>
        }
    >
        <NotificationsMenu />
        <UserMenu />
    </Header>
);

export default MainHeader;
