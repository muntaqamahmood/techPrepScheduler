
import 'reactflow/dist/style.css';
import ReactFlow, { Background, Controls } from 'reactflow';
import { useState, useCallback } from 'react';
import { applyEdgeChanges, applyNodeChanges } from 'reactflow';


const InitialNodes = [
    {
      id: '1',
      data: { label: 'Hello' },
      position: { x: 0, y: 0 },
      type: 'input',
    },
    {
      id: '2',
      data: { label: 'World' },
      position: { x: 100, y: 100 },
    },
  ];
  
  const InitialEdges = [{ id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' }];


const Whiteboard = () => {
    const [nodes, setNodes] = useState(InitialNodes);
    const [edges, setEdges] = useState(InitialEdges);
  
    const onNodesChange = useCallback(
      (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
      []
    );
    const onEdgesChange = useCallback(
      (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
      []
    );
  
    return (
      <div style={{ height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    );
}

export default Whiteboard
