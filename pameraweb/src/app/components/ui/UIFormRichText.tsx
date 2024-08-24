import React, { useEffect } from 'react';
import { Control, Controller } from 'react-hook-form';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface FormRichTextProps {
  name: string;
  control: Control<any>;
  label: string;
  defaultValue?: string;
}

const UIFormRichText: React.FC<FormRichTextProps> = ({
  name,
  control,
  label,
  defaultValue = '',
}) => {
  const convertToEditorState = (value: string) => {
    return value
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
      : EditorState.createEmpty();
  };

  const convertFromEditorState = (editorState: EditorState) => {
    return JSON.stringify(convertToRaw(editorState.getCurrentContent()));
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={convertToEditorState(defaultValue)}
      render={({ field }) => (
        <div>
          <label>{label}</label>
          <Editor
            editorState={field.value}
            onEditorStateChange={(editorState) =>
              field.onChange(convertFromEditorState(editorState))
            }
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
          />
        </div>
      )}
    />
  );
};

export default UIFormRichText;
