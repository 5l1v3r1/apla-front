/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import Backup from 'containers/Main/Backup';
import Editor from 'containers/Main/Editor';

export interface IStaticPage {
    section: string;
    render: (props?: { [key: string]: any }) => React.ReactNode;
}

const STATIC_PAGES: { [page: string]: IStaticPage } = {
    'backup': { section: null, render: () => <Backup /> },
    'editor': { section: 'editor', render: (props: { open?: string, create?: string, name?: string, vde?: string }) => <Editor {...props} /> }
};

export {
    STATIC_PAGES
};