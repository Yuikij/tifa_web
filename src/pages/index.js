import styles from './index.css';
import BasicDemo from '@/component/richText';
import React, { useState } from 'react';
import { Button, Upload, Input ,message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import request from '@/utils/request';

export default function() {
  const [dotaId, setDotaId] = useState("");

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
  // let socket = new WebSocket('ws://localhost:8081/websocket/123');
  //打开事件
  //打开事件
  // socket.onopen = function() {
  //   console.log('Socket 已打开');
  //   socket.send('这是来自客户端的消息' + window.location.href + new Date());
  // };
  // //获得消息事件
  // socket.onmessage = function(msg) {
  //   console.log(msg.data);
  //   //发现消息进入    开始处理前端触发逻辑
  // };
  // //关闭事件
  // socket.onclose = function() {
  //   console.log('Socket已关闭');
  // };
  // //发生了错误事件
  // socket.onerror = function() {
  //   alert('Socket发生了错误');
  //   //此时可以尝试刷新页面
  // };

  const clickId = () => {
    let data = new FormData();
    data.append('task', "share_like");
    data.append('user_id', dotaId);
    setInterval(()=>{ request("https://act.dota2.com.cn/heavenandhell", {
      method: 'POST',
      // headers: {
      //   'token': token(),
      // },
      // headers: {'Content-Type': 'multipart/form-data'},
      body: data,
    }).then(e=>{
    });
    // message.info("点击一次")
    },5000);

  };

  return (
    <div className={styles.normal}>
      <Upload {...props} >
        <Button>
          <UploadOutlined/> Click to Upload
        </Button>
      </Upload>
      <Input onChange={(e)=>{
        setDotaId(e.target.value)}} style={{width:"20%"}} addonBefore="id:" addonAfter={<Button onClick={clickId}>确定</Button>}/>
      <BasicDemo/>
    </div>
  );
}
