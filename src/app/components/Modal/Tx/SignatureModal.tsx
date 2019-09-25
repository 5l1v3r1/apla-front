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

import * as React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

import Modal from '../';
import { FormattedMessage } from 'react-intl';

export interface ISignatureModalProps {
    txParams: { [key: string]: any };
    signs: {
        field: string;
        title: string;
        params: {
            name: string;
            text: string;
        }[];
    }[];
    contract: string;
}

class SignatureModal extends Modal<ISignatureModalProps, boolean> {
    onSuccess(values: { [key: string]: any }) {
        this.props.onResult(true);
    }

    render() {
        return (
            <div>
                <Modal.Header>
                    <FormattedMessage id="modal.authorization.title" defaultMessage="Authorization" />
                </Modal.Header>
                <Modal.Body>
                    {this.props.params.signs.map((sign, index) => (
                        <div key={index} className="text-left">
                            <div>{sign.title}</div>
                            <div>
                                {sign.params.map(param => (
                                    <div key={param.name}>
                                        <hr />
                                        <Row>
                                            <Col md={6}>
                                                <div>
                                                    <strong>{param.name}</strong>
                                                </div>
                                                <div className="text-muted">{param.text}</div>
                                            </Col>
                                            <Col md={6}>
                                                <div>
                                                    <strong>
                                                        <FormattedMessage id="tx.param.value" defaultMessage="Value" />
                                                    </strong>
                                                </div>
                                                <span>
                                                    {this.props.params.txParams[param.name] || '-'}
                                                </span>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer className="text-right">
                    <Button type="button" bsStyle="link" onClick={this.props.onCancel.bind(this)}>
                        <FormattedMessage id="cancel" defaultMessage="Cancel" />
                    </Button>
                    <Button bsStyle="primary" onClick={this.props.onResult.bind(null, true)}>
                        <FormattedMessage id="confirm" defaultMessage="Confirm" />
                    </Button>
                </Modal.Footer>
            </div>
        );
    }
}
export default SignatureModal;