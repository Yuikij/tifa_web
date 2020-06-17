import styles from './index.css';
import BasicDemo from '@/component/richText';
import React from 'react';
import {Button,Upload} from  'antd'
import { UploadOutlined } from '@ant-design/icons';

export default function() {
  const props = {
    name: 'file',
    action: 'http://192.168.1.178:8081/inputImg',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
      } else if (info.file.status === 'error') {
      }
    },
  };
  return (
    <div className={styles.normal}>
      <Upload {...props} >
        <Button>
          <UploadOutlined /> Click to Upload
        </Button>
      </Upload>
        <BasicDemo/>
    </div>
  );
}
