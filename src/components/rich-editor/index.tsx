import React, { useState, useEffect } from 'react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css

interface Props {
  onChange: (content: string) => void;
  html: string;
}

export default function RichEditor({ html, onChange }: Props): JSX.Element {
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法

  const toolbarConfig: Partial<IToolbarConfig> = {}; // TS 语法

  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
  };

  // 及时销毁 editor
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode='default'
          style={{ borderBottom: '1px solid #ccc', background: '#f5f5f5' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => onChange(editor.getHtml())}
          mode='default'
          style={{ height: '390px', overflowY: 'hidden' }}
        />
      </div>
    </>
  );
}
