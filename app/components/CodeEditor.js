
import React, { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic';
import io from 'socket.io-client';
// import { useEffect, useState } from 'react'
// import io from 'Socket.IO-client'
let socket;
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

export default function CodeEditor({ initialCode }){
    const [code, setCode] = useState(initialCode);
    // const [socket, setSocket] = useState(null);
  
    // useEffect(() => {
    //   const newSocket = io();
    //   setSocket(newSocket);
  
    //   return () => {
    //     newSocket.disconnect();
    //   };
    // }, []);
  
    // useEffect(() => {
    //   if (socket) {
    //     socket.emit('join-room', { room: 'collaborative-editor' });
    //   }
    // }, [socket]);
  
    // const handleCodeChange = (newCode) => {
    //   setCode(newCode);
  
    //   if (socket) {
    //     socket.emit('code-change', { code: newCode });
    //   }
    // };



    useEffect(() => socketInitializer(), [])

    const socketInitializer = async () => {
        // await fetch('/api/socket');
        // socket = io()
    
        // socket.on('connect', () => {
        //   console.log('connected')
        // })
    
        // socket.on('update-input', msg => {
        //   setInput(msg)
        // })
      }
    
      const onChangeHandler = (e) => {
        // setInput(e.target.value)
        // socket.emit('input-change', e.target.value)
      }





    // useEffect(() => {
    //   if (socket) {
    //     socket.on('code-changed', (data) => {
    //       setCode(data.code);
    //     });
    //   }
    // }, [socket]);
  
    return (
      <AceEditor
        mode="javascript"
        theme="monokai"
        onChange={onChangeHandler}
        value={code}
        name="collaborative-code-editor"
        // editorProps={{ $blockScrolling: true }}
        style={{ width: '100%', height: '400px' }}
      />
    );
};