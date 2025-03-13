import React, { useState } from 'react';
import { Group, Rect, Image } from 'react-konva';
import { Html } from 'react-konva-utils';
import TextEditor from '../textEditor/TextEditor';

interface ShapeProps {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  tool: string;
  text: string;
}

const Shape: React.FC<ShapeProps> = ({ x, y, width, height, tool, text, id }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(text);
  const [image, setImage] = useState<HTMLImageElement | null>(null);


  const handleClick = () => {
    if (tool === 'shape') {
      return;
    } else {
      setIsEditing((prev) => !prev);
    }
  };

  const handleSaveText = (content: string, img: HTMLImageElement) => {
    setValue(content);
    setImage(img);
    setIsEditing(false);
  };

  return (
    <>
      <Group x={x} y={y} onClick={handleClick} id={id.toString()} draggable>
        <Rect stroke={'black'} width={width} height={height} />
        {image && <Image image={image} />}
        {isEditing && (
          <Html>
            <TextEditor onSave={handleSaveText} initialContent={value} width={width} height={height} />
          </Html>
        )}
      </Group>
    </>
  );
};

export default Shape;