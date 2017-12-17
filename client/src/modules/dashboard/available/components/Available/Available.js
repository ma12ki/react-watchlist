import React from 'react';

import { Card, Tree } from '../../../../shared';

const { TreeNode } = Tree;

const items = [
  { id: 1, title: 'Deadpool 2', children: [] },
  { id: 2, title: 'Rick and Morty', children: [
    { id: 1, season: 3, episode: 1 },
    { id: 2, season: 3, episode: 2 },
    { id: 3, season: 3, episode: 3 },
  ] },
  { id: 3, title: 'Kingdom', children: [
    { id: 4, season: 5, episode: 1 },
  ] },
];

const Available = () => {
  const treeNodes = items.map(item => {
    const childrenNodes = item.children.map(child => <TreeNode key={`${item.id}-${child.id}`} title={`S${child.season}E${child.episode}`} />);
    return <TreeNode key={item.id} title={item.title} isLeaf={item.children.length === 0}>{childrenNodes}</TreeNode>;
  });

  return (
    <Card title="Available Now">
      <Tree>
        {treeNodes}
      </Tree>
    </Card>
  );
};

export default Available;
