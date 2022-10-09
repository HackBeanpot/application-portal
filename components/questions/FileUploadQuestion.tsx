import React, { FC, useState } from 'react';
import { FileUpload, QuestionResponse } from '../../common/types';
import { Button, Form, FormInstance, Upload } from 'antd';
import type { UploadProps } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';

interface FileUploadProps {
  disabled: boolean;
  question: FileUpload;
  form: FormInstance<Record<string, QuestionResponse>>;
}

const FileUploadQuestion: FC<FileUploadProps> = ({ disabled, question, form }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleUpload: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-question.limit);
    form.setFieldsValue({ [question.id]: newFileList.toString() });
    setFileList(newFileList);
  };

  return (
    <Form.Item
      className="question"
      name={question.id}
      label={<div>{question.content}</div>}
      rules={[{ required: question.required, message: 'This question is required' }]}
    >
      <Upload
        accept={question.accept}
        listType="picture"
        multiple={question.multiple}
        onChange={handleUpload}
        fileList={fileList}
      >
        <Button disabled={disabled} icon={<UploadOutlined />}>
          Upload
        </Button>
      </Upload>
    </Form.Item>
  );
};

export default FileUploadQuestion;
