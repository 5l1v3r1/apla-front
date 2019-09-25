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

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { INotificationProto } from 'apla/notifications';

const EcosystemInvitedNotification: INotificationProto<{ ecosystem: string }> = {
    icon: 'o-checkround-1',
    title: (
        <FormattedMessage id="tx.error.info" defaultMessage="Information" />
    ),
    body: params => (
        <FormattedMessage id="notification.ecosystem_invited" defaultMessage="Joined ecosystem {ecosystem}" values={{ ecosystem: params.ecosystem }} />
    )
};

export default EcosystemInvitedNotification;