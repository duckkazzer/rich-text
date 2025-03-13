import React, { useState, useRef } from 'react';
import Konva from 'konva';
import Canvas from './components/canvas/Canvas';
import Control from './components/control/Control';
import './styles/styles.scss';

const App: React.FC = () => {
  const [tool, setTool] = useState<string>('cursor');
  const stageRef = useRef<Konva.Stage | null>(null);

  return (
    <div className="canvas-container">
      <Canvas tool={tool} stageRef={stageRef} />
      <Control setTool={setTool} />
    </div>
  );
};

export default App;