/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

declare module 'apla/auth' {
    import { IAccount, IKeyInfo, IRoleInfo, IEcosystemInfo } from 'apla/api';

    interface INetworkEndpoint {
        uuid: string;
        apiHost: string;
    }

    interface INetwork {
        uuid: string;
        id: number;
        name: string;
        fullNodes: string[];
        disableSync?: boolean;
        socketUrl?: string;
        activationEmail?: string;
        demoEnabled?: boolean;
        txViewerUrl?: string;
    }

    interface IWallet {
        id: string;
        encKey: string;
        publicKey: string;
    }

    interface ISaveEncKeyCall {
        id: string;
        encKey: string;
    }

    interface ISession {
        network: INetworkEndpoint;
        sessionToken: string;
    }

    interface IAccountContext {
        wallet: IAccount;
        access: IEcosystemInfo;
        role?: IRoleInfo;
    }

    interface ILoginCall {
        password: string;
    }

    interface ICreateWalletCall {
        seed: string;
        password: string
    }

    interface IImportWalletCall {
        backup: string;
        password: string;
        isDefault?: boolean
    }
}