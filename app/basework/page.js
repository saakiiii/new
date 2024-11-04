// pages/index.js
"use client"
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
// import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';


const Home = () => {
  const [socket, setSocket] = useState(null);
  const [code, setCode] = useState('');
//   const socket = io('http://localhost:3001');

  useEffect(() => {
    // Connect to the WebSocket server
    // setSocket(newSocket);
    // Cleanup on component unmount
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleCodeChange = (newCode) => {
    // Update the local code state
    console.log(newCode);
    setCode(newCode);

    // Emit the 'code-change' event to the server
    fetch("/api/source/store", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"   
      },
      body:JSON.stringify({baseid:baseid, code:newCode})
    })
    if (socket) {
      socket.emit('code-change', { code: newCode });
    }
  };

  const handleJoinRoom = () => {
    // Emit the 'join-room' event to the server
    if (socket) {
        console.log(socket);
      socket.emit('join-room', { room: 'collaborative-editor' });
    }
  };

  useEffect(() => {
    // Handle the 'code-changed' event from the server
    if (socket) {
      socket.on('code-changed', ({ code }) => {
        // Update the local code state when code changes are received
        setCode(code);
      });
    }

    // Cleanup event listener on component unmount
    return () => {
      if (socket) {
        socket.off('code-changed');
      }
    };
  }, [socket]);

  return (
    // <div>
    //   <h1>Collaborative Code Editor in Next.js</h1>
    //   <button onClick={handleJoinRoom}>Join Room</button>
    //   <br/>
    //   <textarea
    //     value={code}
    //     onChange={(e) => handleCodeChange(e.target.value)}
    //     placeholder="Enter code..."
    //   />
    // </div>
    <div>
        <button onClick={handleJoinRoom}>Join Room</button>
    
<AceEditor
      mode="javascript"
      theme="monokai"
      onChange={(e) => handleCodeChange(e)}
      value={code}
      name="code-editor"
      editorProps={{ $blockScrolling: true }}
      style={{ width: '100%', height: '400px' }}
      enableBasicAutocompletion={true}
      enableLiveAutocompletion={true}
      enableSnippets={true}
      useSoftTabs={true}
      tabSize={2}
      cursorStart={1}
      showPrintMargin={false}
      highlightActiveLine={true}
      fontSize={14}
      showGutter={true}
      readOnly={false}
      wrapEnabled={true}
      setOptions={{
        fontFamily: 'Inconsolata, Monaco, monospace',
        fontSize: '14px',
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
    </div>
    );
};

export default Home;