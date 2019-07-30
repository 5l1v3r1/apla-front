/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from 'modules/socket';
import { IAccountContext } from 'apla/auth';

const findNotifications = (state: State, session: IAccountContext) => {
    if (!session) {
        return [];
    }

    if (!session.access) {
        return [];
    }

    return state.notifications.filter(notification =>
        notification.id === session.wallet.id &&
        notification.ecosystem === session.access.ecosystem &&
        (notification.role === session.role.id || notification.role === '0')
    );
};

export default findNotifications;