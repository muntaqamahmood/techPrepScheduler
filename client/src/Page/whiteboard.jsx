
import 'reactflow/dist/style.css';
import ReactFlow, { Background, Controls } from 'reactflow';

const nodes = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: { label: 'Hello' },
        type: 'input',
      },
      {
        id: '2',
        position: { x: 100, y: 100 },
        data: { label: 'World' },
      },
  ];
  
const whiteboard = () => {
  return (
    <div style={{height: '100vh'}}>
        <ReactFlow nodes={nodes}>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
  )
}

export default whiteboard
