/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import TxInfo from 'containers/StaticPages/TxInfo';

export interface IStaticPage<T = {}, TSubParams = {}> {
    section: string;
    renderSubstitute?: (props?: T) => {
        name: string;
        params: TSubParams;
    };
    render: (section: string, props?: T) => React.ReactNode;
}

const STATIC_PAGES: { [page: string]: IStaticPage<any, any> } = {
    'txinfo': {
        section: null,
        renderSubstitute: props => ({
            name: props.page,
            params: {
                txhashes: props.txhashes
            }
        }),
        render: (section, props) => <TxInfo section={section} {...props} />
    }
};

export {
    STATIC_PAGES
};