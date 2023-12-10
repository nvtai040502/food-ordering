import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
};

function Editor({
  onChange,
  value
}: EditorProps
) {
  return <ReactQuill theme="snow" value={value} onChange={onChange} />;
}
export default Editor
