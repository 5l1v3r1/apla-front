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
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';
import { readTextFile } from 'lib/fs';

import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import Generator from './Generator';
import Validation from 'components/Validation';
import HeadingNetwork from 'containers/Auth/HeadingNetwork';

export interface IImportProps {
    onConfirm: (params: { backup: string, password: string }) => void;
}

interface IImportState {
    backup: string;
    password: string;
}

class Import extends React.Component<IImportProps & InjectedIntlProps, IImportState> {
    private _inputFile: HTMLInputElement;

    constructor(props: IImportProps & InjectedIntlProps) {
        super(props);
        this.state = {
            backup: '',
            password: ''
        };
    }

    onSubmit = () => {
        this.props.onConfirm({
            backup: this.state.backup,
            password: this.state.password
        });
    }

    onBackupChange = (backup: string) => {
        this.setState({
            backup
        });
    }

    onPasswordChange = (password: string) => {
        this.setState({
            password
        });
    }

    onLoad = () => {
        this._inputFile.click();
    }

    onLoadSuccess = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const backup = await readTextFile(e.target.files[0]);
            this._inputFile.setAttribute('value', '');

            this.setState({
                backup
            });
        }
        catch (e) {
            // Fall back silently
        }
    }

    render() {
        return (
            <LocalizedDocumentTitle title="wallet.import" defaultTitle="Import wallet">
                <div>
                    <HeadingNetwork returnUrl="/account">
                        <FormattedMessage id="wallet.import" defaultMessage="Import account" />
                    </HeadingNetwork>
                    <input type="file" className="hidden" onChange={this.onLoadSuccess} ref={l => this._inputFile = l} />
                    <div className="text-center">
                        <Validation.components.ValidatedForm onSubmitSuccess={this.onSubmit}>
                            <Generator
                                seed={this.state.backup}
                                onLoad={this.onLoad}
                                onSeedChange={this.onBackupChange}
                                onPasswordChange={this.onPasswordChange}
                                password={this.state.password}
                                action="import"
                                descriptionValue={
                                    <FormattedMessage
                                        id="auth.import.disclaimer"
                                        defaultMessage="Please enter your account backup payload to restore access to the system"
                                    />
                                }
                            />
                            <div className="text-right">
                                <Validation.components.ValidatedSubmit bsStyle="primary">
                                    <FormattedMessage id="process.confirm" defaultMessage="Confirm" />
                                </Validation.components.ValidatedSubmit>
                            </div>
                        </Validation.components.ValidatedForm>
                    </div>
                </div>
            </LocalizedDocumentTitle>
        );
    }
}

export default injectIntl(Import);