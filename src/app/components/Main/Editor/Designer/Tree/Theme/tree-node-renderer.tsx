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

import React, { Children, cloneElement } from 'react';
import * as classnames from 'classnames';

interface IFileThemeTreeNodeRendererProps {
  children: any;
  listIndex: any;
  swapFrom: any;
  swapLength: any;
  swapDepth: any;
  scaffoldBlockPxWidth: any;
  lowerSiblingCounts: any;
  connectDropTarget: any;
  isOver: any;
  draggedNode: any;
  canDrop: any;
  treeIndex: any;
  treeId: any;
  getPrevRow: any;
  node: any;
  path: any;
}

const FileThemeTreeNodeRenderer: React.SFC<IFileThemeTreeNodeRendererProps> = props => {
  const {
    children,
    listIndex,
    swapFrom = null,
    swapLength = null,
    swapDepth = null,
    scaffoldBlockPxWidth,
    lowerSiblingCounts,
    connectDropTarget,
    isOver,
    draggedNode = null,
    canDrop = false,
    treeIndex,
    treeId, // Delete from otherProps
    getPrevRow, // Delete from otherProps
    node, // Delete from otherProps
    path, // Delete from otherProps
    ...otherProps
  } = props;

  const classes = classnames({
    'tree-node': true,
    'selected': node.selected
  });

  return connectDropTarget(
    <div {...otherProps} className={classes}>
      {Children.map(children, (child: any) =>
        cloneElement(child, {
          isOver,
          canDrop,
          draggedNode,
          lowerSiblingCounts,
          listIndex,
          swapFrom,
          swapLength,
          swapDepth,
        })
      )}
    </div>
  );
};

export default FileThemeTreeNodeRenderer;
