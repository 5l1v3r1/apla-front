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

export interface IDataPreloaderProps {
    data: any[];
    children: JSX.Element;
}

interface IDataPreloaderState {
    pending: boolean;
}

class DataPreloader extends React.Component<IDataPreloaderProps, IDataPreloaderState> {
    constructor(props: IDataPreloaderProps) {
        super(props);
        this.state = {
            pending: true
        };
    }

    componentDidMount() {
        this.onCheck();
    }

    componentWillReceiveProps(props: IDataPreloaderProps) {
        this.onCheck(props);
    }

    onCheck(props: IDataPreloaderProps = this.props) {
        if (0 === props.data.filter(l => !l).length) {
            this.setState({
                pending: false
            });
        }
        else {
            this.setState({
                pending: true
            });
        }
    }

    render() {
        return this.state.pending ? null : this.props.children;
    }
}

export default DataPreloader;