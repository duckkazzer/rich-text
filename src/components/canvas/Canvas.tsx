import React, { useState, RefObject } from 'react';
import { Stage, Layer } from 'react-konva';
import Konva from 'konva';
import Shape from '../shape/Shape';
import styles from './Canvas.module.scss';

interface ShapeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  tool: string;
  id: number;
  text: string;
}

interface CanvasProps {
  tool: string;
  stageRef: RefObject<Konva.Stage>;
}

const Canvas: React.FC<CanvasProps> = ({ tool, stageRef}) => {
  const [shapes, setShapes] = useState<ShapeProps[]>([]);

  const handleOnClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (tool === "cursor") return;
    const stage = e.target.getStage();
    const stageOffset = stage?.absolutePosition() || { x: 0, y: 0 };
    const point = stage?.getPointerPosition() || { x: 0, y: 0 };
    setShapes((prev: ShapeProps[]) => [
      ...prev,
      {
        id: Date.now(),
        width: 100,
        height: 100,
        x: point.x - stageOffset.x,
        y: point.y - stageOffset.y,
        tool: tool,
        text: "",
      },
    ]);
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={tool === "cursor"}
      onClick={handleOnClick}
      ref={stageRef}
      className={styles.canvas}
    >
      <Layer>
        {shapes.map((shape, i) => (
          <Shape key={i} {...shape} tool={tool} />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;