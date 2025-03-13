import React, { useState, useRef, CSSProperties } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import html2canvas from 'html2canvas';
import styles from './TextEditor.module.scss';

interface TextEditorProps {
  onSave: (content: string, image: HTMLImageElement) => void;
  initialContent: string;
  width: number;
  height: number;
}

const TextEditor: React.FC<TextEditorProps> = ({ onSave, initialContent, width, height }) => {
  const [content, setContent] = useState<string>(initialContent);
  const [isEditorVisible, setIsEditorVisible] = useState<boolean>(true);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleSave = async () => {
    setIsEditorVisible(false);

    setTimeout(async () => {
      if (editorRef.current) {
        const canvas = await html2canvas(editorRef.current, {
          backgroundColor: 'rgba(0,0,0,0)',
          width: width-20,
          height: height-20,
        });
        const img = new Image();
        img.src = canvas.toDataURL();
        img.onload = () => {
          onSave(content, img);
          setIsEditorVisible(true);
        };
      }
    }, 0);
  };

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],     
      [{ 'color': [] }, { 'background': [] }],                                  
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'color', 'background',
  ];

  return (
    <div className={styles['text-editor']}>
      <div 
      ref={editorRef} 
      className={styles['text-content']} 
      style={{ '--editor-width': `${width}px`} as CSSProperties}
    >
        {isEditorVisible ? (
          <ReactQuill 
            value={content} 
            onChange={setContent} 
            modules={modules}
            formats={formats}
          />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};
export default TextEditor;