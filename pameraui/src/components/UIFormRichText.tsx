import React, { useState, useCallback } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Controller, Control } from 'react-hook-form';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface FormRichTextProps {
  name: string;
  control: Control<any>;
  label: string;
  defaultValue?: any;
}

const UIFormRichText: React.FC<FormRichTextProps> = ({
  name,
  control,
  label,
  defaultValue = EditorState.createEmpty(),
}) => {
  const [editorState, setEditorState] = useState(() =>
    defaultValue
      ? EditorState.createWithContent(convertFromRaw(defaultValue))
      : EditorState.createEmpty()
  );

  const onEditorStateChange = useCallback(
    (state: EditorState) => {
      setEditorState(state);
    },
    [setEditorState]
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={convertToRaw(editorState.getCurrentContent())}
      render={({ field }) => (
        <div>
          <label>{label}</label>
          <Editor
            editorState={editorState}
            onEditorStateChange={state => {
              onEditorStateChange(state);
              field.onChange(convertToRaw(state.getCurrentContent()));
            }}
            toolbar={{
              options: [
                'inline',
                'blockType',
                'fontSize',
                'list',
                'textAlign',
                'link',
                'image',
                'history',
              ],
              inline: {
                options: [
                  'bold',
                  'italic',
                  'underline',
                  'strikethrough',
                  'monospace',
                ],
              },
              list: {
                options: ['unordered', 'ordered'],
              },
              textAlign: {
                options: ['left', 'center', 'right'],
              },
              link: {
                options: ['link'],
              },
              image: {
                uploadCallback: undefined,
                previewImage: true,
                alt: { present: true, mandatory: false },
              },
            }}
            placeholder="Enter your text..."
          />
        </div>
      )}
    />
  );
};

export default UIFormRichText;
