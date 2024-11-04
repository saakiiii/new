// pages/index.js
"use client"
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
// import React from 'react';
import AceEditor from 'react-ace';
import Link from 'next/link';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import "ace-builds/src-noconflict/theme-twilight";
import { useRouter } from 'next/navigation';
import Spinner from '@/app/components/Spinner';
import $ from 'jquery';
import Participants from '@/app/components/Participants';

const Home = ({params}) => {
  const [socket, setSocket] = useState(null);
  const [code, setCode] = useState('');
  const [filename, setFilename] = useState('');
  const [accesstype, setAccesstype] = useState('');
  const [language, setLanguage] = useState('');
  const [gemini, setGemini] = useState(false);
  const [running, setRunning] = useState(false);
  const [gemLoading, setgemLoading] = useState(false);
  const router = useRouter();
  const [participants, setParticipants] = useState([]);
  const [currentusername, setCurrentusername] = useState('');
  const [myConnId, setConnId] = useState('');
//   const socket = io('http://localhost:3001');
  const baseid = params.baseid;
  console.log(baseid);

  useEffect(()=>{
    fetch("/api/check/access", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"   
      },
      body:JSON.stringify({baseid:baseid})
    }).then(x=>x.json()).then(x=>{
      console.log("msg", x);
      setFilename(x.msg.basename);
      setAccesstype(x.msg["accesstype"])
      setLanguage(x.msg["language"])
      setCurrentusername(x.msg["currentusername"])
      if(x.msg["accesstype"] == "Private" || x.msg["accesstype"] == "Invite only"){
        if(x.msg["usernamevalid"]){
          setcode();
        }else{
          console.log();
          router.push("/noaccess");
        }
      // }else if(x.msg["accesstype"] == "Invite only"){
      //   // if(x.msg["usernamevalid"])
      // }
      }
      else{
        setcode();
      }
    })
  }, [])
  useEffect(() => {
    // Connect to the WebSocket server
    // setSocket(newSocket);
    // Cleanup on component unmount
    const newSocket = io('http://192.168.132.145:3003');
    newSocket.emit('join-room', { room: baseid});
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);
  useEffect(()=>{
    if(socket){
      console.log("this area running...1");
      fetch("/api/user/get").then(x=>x.json()).then(x=>{console.log("user", x.user)
      if(x.user == "none"){
        router.push('/auth/signin');
      }else{
        // router.push('/main/bases')
      console.log("this area 1,", x.user, baseid);
        MyApp._init(x.user, baseid);
      }
    }) 
    }
  }, [socket])

  function setcode(){
    fetch("/api/source/get", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"   
      },
      body:JSON.stringify({baseid:baseid})
    }).then(x=>x.json()).then(x=>{
      console.log(x);
      setCode(x.code);
    })
  }
  // useEffect(()=>{
  //   if(socket)  
  //     socket.emit('join-room', { room: baseid});
  // }, [socket])
  const onrun = () => {
    console.log('run');
    setRunning(true);
    var tempstdin = document.getElementById("stdin-tarea");
    console.log("test stdin is here :",tempstdin.value.split());
    fetch("/api/run", {
      method:"POST",
      body:JSON.stringify({
        code:code,
        language:language,
        stdin:tempstdin.value,
        basename:filename
      })
    }).then(x=>x.json()).then(x=>{
      console.log(x);
      var temp = JSON.parse(x.res);
      console.log(temp);
      if(temp.stdout){
        document.getElementById("stdout-main").innerText = temp.stdout;
        document.getElementById("stderr-main").innerText = "";

      }
      if(temp.stderr){
        document.getElementById("stderr-main").innerText = temp.stderr;
        document.getElementById("stdout-main").innerText = "";
      }
    setRunning(false);
    })
  }

  const handleCodeChange = (newCode) => {
    // Update the local code state

    console.log("new code wasdf", newCode);
    setCode(newCode);

    fetch("/api/source/store", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"   
      },
      body:JSON.stringify({baseid:baseid, code:newCode})
    })
    // Emit the 'code-change' event to the server
    if (socket) {
      socket.emit('code-change', { code: newCode, room: baseid });
    }
  };

  const handleJoinRoom = () => {
    // Emit the 'join-room' event to the server
    if (socket) {
        console.log(socket);
      socket.emit('join-room', { room: baseid});
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


  // useEffect(() => {
  //   // Handle the 'code-changed' event from the server
  //   if (socket) {
  //     socket.on('cursor-change-1', ({left, top, username }) => {
  //       // Update the local code state when code changes are received
  //       console.log("safdasdfasdfasfd",username + "  "+ top +"  "+ left);
  //       document.getElementById("cur_"+username).style.left = left+"px";
  //       document.getElementById("cur_"+username).style.top = top+"px";
  //     // });
  //     })
  //   }

  //   // Cleanup event listener on component unmount
  //   return () => {
  //     if (socket) {
  //       socket.off('cursor-change-1');
  //     }
  //   };
  // }, [socket]);

  function opengemini(){
    if (gemini){
      setGemini(false);
    }else{
      setGemini(true);
    }
  }

  function getairesponse(){
    setgemLoading(true);
    console.log
    var prompt = document.getElementById('promptarea');
    var promptres = document.getElementById("promptres")
    fetch("/api/ai", {
      method:"POST",
      body:JSON.stringify({prompt:prompt.value})
    }).then(x=>x.json()).then(x=>{
      document.getElementById("intro-gem").style.display = "none";
      document.getElementById("promptres").style.display = "block";
      var temp = document.createElement("div");
      temp.setAttribute("class", "query_gem");
      temp.innerHTML = prompt.value;
      promptres.appendChild(temp);
      var temp1 = document.createElement("div");
      temp1.setAttribute("class", "response_gem");
      temp1.innerText = x.res;
      promptres.appendChild(temp1);
      prompt.value = '';
      setgemLoading(false);

    })
  }
  

  // start code for audio
    var AppProcess = (function () {
      var peers_connection_ids = [];
      var peers_connection = [];
      var remote_vid_stream = [];
      var remote_aud_stream = [];
      var local_div;
      var serverProcess;
      var audio;
      var isAudioMute = true;
      var rtp_aud_senders = [];
      var video_states = {
        None: 0,
        Camera: 1,
        ScreenShare: 2,
      };
      var video_st = video_states.None;
      var videoCamTrack;
      var rtp_vid_senders = [];
      async function _init(SDP_function, my_connid) {
        serverProcess = SDP_function;
        // my_connection_id = my_connid;
        eventProcess();
        // local_div = document.getElementById("current_audio");
      }
      function eventProcess() {
        // $("#miceMuteUnmute").on("click", async function () {
        //   if (!audio) {
        //     await loadAudio();
        //   }
        //   if (!audio) {
        //     alert("Audio permission has not granted");
        //     return;
        //   }
        //   if (isAudioMute) {
        //     audio.enabled = true;
        //     $(this).html(
        //       "<span class='material-icons' style='width:100%;'>mic</span>"
        //     );
        //     updateMediaSenders(audio, rtp_aud_senders);
        //     console.log(rtp_aud_senders);
        //   } else {
        //     audio.enabled = false;
        //     $(this).html(
        //       "<span class='material-icons' style='width:100%;'>mic_off</span>"
        //     );
        //     removeMediaSenders(rtp_aud_senders);
        //     audio.stop();
        //     console.log(rtp_aud_senders);
        //   }
        //   isAudioMute = !isAudioMute;
        // });
        // $("#onoffaudio").on("click", async function () {
        //   if (video_st == video_states.Camera) {
        //     await videoProcess(video_states.None);
        //   } else {
        //     await videoProcess(video_states.Camera);
        //   }
        // });
        console.log(document.getElementById("onoffaudio"));
        document.getElementById("onoffaudio").onclick = async function () {
          if (video_st == video_states.Camera) {
            await videoProcess(video_states.None);
          } else {
            await videoProcess(video_states.Camera);
          }
        }
    
        // $("#ScreenShareOnOf").on("click", async function () {
        //   if (video_st == video_states.ScreenShare) {
        //     await videoProcess(video_states.None);
        //   } else {
        //     await videoProcess(video_states.ScreenShare);
        //   }
        // });
      }
      // async function loadAudio() {
      //   try {
      //     var astream = await navigator.mediaDevices.getUserMedia({
      //       video: false,
      //       audio: true,
      //     });
      //     audio = astream.getAudioTracks()[0];
      //     audio.enabled = false;
      //   } catch (e) {
      //     console.log(e);
      //   }
      // }
    
      function connection_status(connection) {
        if (
          connection &&
          (connection.connectionState == "new" ||
            connection.connectionState == "connecting" ||
            connection.connectionState == "connected")
        ) {
          return true;
        } else {
          return false;
        }
      }
      async function updateMediaSenders(track, rtp_senders) {
        for (var con_id in peers_connection_ids) {
          if (connection_status(peers_connection[con_id])) {
            if (rtp_senders[con_id] && rtp_senders[con_id].track) {
              rtp_senders[con_id].replaceTrack(track);
            } else {
              rtp_senders[con_id] = peers_connection[con_id].addTrack(track);
            }
          }
        }
      }
      function removeMediaSenders(rtp_senders) {
        console.log("rtp_senders :", rtp_senders);
        for (var con_id in peers_connection_ids) {
          if (rtp_senders[con_id] && connection_status(peers_connection[con_id])) {
            peers_connection[con_id].removeTrack(rtp_senders[con_id]);
            rtp_senders[con_id] = null;
          }
        }
      }
      function removeVideoStream(rtp_vid_senders) {
        if (videoCamTrack) {
          videoCamTrack.stop();
          videoCamTrack = null;
          // local_div.srcObject = null;
          removeMediaSenders(rtp_vid_senders);
        }
      }
      async function videoProcess(newVideoState) {
        if (newVideoState == video_states.None) {
          // $("#onoffaudio").html(
            // "<span class='material-icons w-[100%]  text-white'>mic_off</span>"
          // );
          document.getElementById("mic-toggle").innerHTML = 'mic_off';

          // $("#ScreenShareOnOf").html(
          //   '<span class="material-icons">present_to_all</span><div>Present Now</div>'
          // );
          video_st = newVideoState;
    
          removeVideoStream(rtp_vid_senders);
          console.log("rtp_vid_senders", rtp_vid_senders);
          // Video_switch_off
          serverProcess(
            JSON.stringify({
              Video_switch_off: "Video_switch_off",
            }),
            rtp_vid_senders
          );
          // Video_switch_off
          return;
        }
        if (newVideoState == video_states.Camera) {
          // $("#onoffaudio").html(
          //   "<span class='material-icons w-[100%]  text-white'>mic</span>"
          // );
          document.getElementById("mic-toggle").innerHTML = 'mic';

        }
        try {
          var vstream = null;
          if (newVideoState == video_states.Camera) {
            console.log("video");
            vstream = await navigator.mediaDevices.getUserMedia({
              video: false,
              audio: true,
            });
          }
          if (vstream && vstream.getAudioTracks().length > 0) {
            videoCamTrack = vstream.getAudioTracks()[0];
            if (videoCamTrack) {
              // local_div.srcObject = new MediaStream([videoCamTrack]);
              updateMediaSenders(videoCamTrack, rtp_vid_senders);
            }
          }
        } catch (e) {
          console.log(e);
          return;
        }
        video_st = newVideoState;
        if (newVideoState == video_states.Camera) {
          // $("#onoffaudio").html(
          //   "<span class='material-icons w-[100%]  text-white'>mic</span>"
          // );
          document.getElementById("mic-toggle").innerHTML = 'mic';
          $("#ScreenShareOnOf").html(
            '<span class="material-icons ">present_to_all</span><div >Present Now</div>'
          );
        } else if (newVideoState == video_states.ScreenShare) {
          // $("#onoffaudio").html(
          //   "<span class='material-icons w-[100%]  text-white'>mic_off</span>"
          // );
          document.getElementById("mic-toggle").innerHTML = 'mic_off';
          $("#ScreenShareOnOf").html(
            '<span class="material-icons text-success">present_to_all</span><div class="text-success">Stop Present Now</div>'
          );
        }
      }
      var iceConfiguration = {
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
          {
            urls: "stun:stun1.l.google.com:19302",
          },
        ],
      };
    
      async function setConnection(connid) {
        var connection = new RTCPeerConnection(iceConfiguration);
    
        connection.onnegotiationneeded = async function (event) {
          await setOffer(connid);
        };
        connection.onicecandidate = function (event) {
          if (event.candidate) {
            serverProcess(
              JSON.stringify({ icecandidate: event.candidate }),
              connid
            );
          }
        };
        connection.ontrack = function (event) {
          if (!remote_vid_stream[connid]) {
            remote_vid_stream[connid] = new MediaStream();
          }
          if (!remote_aud_stream[connid]) {
            remote_aud_stream[connid] = new MediaStream();
          }
    
          if (event.track.kind == "video") {
            remote_vid_stream[connid]
              .getVideoTracks()
              .forEach((t) => remote_vid_stream[connid].removeTrack(t));
            remote_vid_stream[connid].addTrack(event.track);
            var remoteVideoPlayer = document.getElementById("a_" + connid);
            remoteVideoPlayer.srcObject = null;
            remoteVideoPlayer.srcObject = remote_vid_stream[connid];
            remoteVideoPlayer.load();
          } else if (event.track.kind == "audio") {
            console.log("kind", "audio");
            remote_vid_stream[connid]
              .getAudioTracks()
              .forEach((t) => remote_vid_stream[connid].removeTrack(t));
            remote_vid_stream[connid].addTrack(event.track);
            var remoteAudioPlayer = document.getElementById("a_" + connid);
            remoteAudioPlayer.srcObject = null;
            remoteAudioPlayer.srcObject = remote_vid_stream[connid];
            remoteAudioPlayer.load();
          }
        };
        peers_connection_ids[connid] = connid;
        peers_connection[connid] = connection;
    
        if (
          video_st == video_states.Camera ||
          video_st == video_states.ScreenShare
        ) {
          if (videoCamTrack) {
            updateMediaSenders(videoCamTrack, rtp_vid_senders);
          }
        }
    
        return connection;
      }
    
      async function setOffer(connid) {
        var connection = peers_connection[connid];
        var offer = await connection.createOffer();
        await connection.setLocalDescription(offer);
        serverProcess(
          JSON.stringify({
            offer: connection.localDescription,
          }),
          connid
        );
      }
      async function SDPProcess(message, from_connid) {
        message = JSON.parse(message);
        if (message.answer) {
          await peers_connection[from_connid].setRemoteDescription(
            new RTCSessionDescription(message.answer)
          );
        } else if (message.offer) {
          if (!peers_connection[from_connid]) {
            await setConnection(from_connid);
          }
          await peers_connection[from_connid].setRemoteDescription(
            new RTCSessionDescription(message.offer)
          );
          var answer = await peers_connection[from_connid].createAnswer();
          await peers_connection[from_connid].setLocalDescription(answer);
          serverProcess(
            JSON.stringify({
              answer: answer,
            }),
            from_connid
          );
        } else if (message.icecandidate) {
          if (!peers_connection[from_connid]) {
            await setConnection(from_connid);
          }
          try {
            await peers_connection[from_connid].addIceCandidate(
              message.icecandidate
            );
          } catch (e) {
            console.log(e);
          }
        } else if (message.Video_switch_off) {
          document.querySelector("#a_" + from_connid + "").srcObject = null;
        }
      }
      async function closeConnection(connid) {
        peers_connection_ids[connid] = null;
        if (peers_connection[connid]) {
          peers_connection[connid].close();
          peers_connection[connid] = null;
        }
        if (remote_aud_stream[connid]) {
          remote_aud_stream[connid].getTracks().forEach((t) => {
            if (t.stop) t.stop();
          });
          remote_aud_stream[connid] = null;
        }
        if (remote_vid_stream[connid]) {
          remote_vid_stream[connid].getTracks().forEach((t) => {
            if (t.stop) t.stop();
          });
          remote_vid_stream[connid] = null;
        }
      }
      return {
        setNewConnection: async function (connid) {
          await setConnection(connid);
        },
        init: async function (SDP_function, my_connid) {
          setConnId(my_connid);
          await _init(SDP_function, my_connid);
        },
        processClientFunc: async function (data, from_connid) {
          await SDPProcess(data, from_connid);
        },
        closeConnectionCall: async function (connid) {
          await closeConnection(connid);
        },
      };
    })();
    var MyApp = (function () {
      // var socket = null;
      var user_id = "";
      var meeting_id = "";
      function init(uid, mid) {
        user_id = uid;
        meeting_id = mid;
        // $("#meetingContainer").show();
        // $("#me h2").text(user_id + "(Me)");
        document.title = user_id;
        event_process_for_signaling_server();
        eventHandeling();
      }
    
      function event_process_for_signaling_server() {
        // socket = io.connect();
    
        var SDP_function = function (data, to_connid) {
          socket.emit("SDPProcess", {
            message: data,
            to_connid: to_connid,
          });
        };
        // socket.on("connect", () => {
          // if (socket.connected) {
          if(socket){
            AppProcess.init(SDP_function, socket.id);
            console.log('this area is running...2');

            if (user_id != "" && meeting_id != "") {
              console.log('this area is running...3');
              socket.emit("userconnect", {
                displayName: user_id,
                meetingid: meeting_id,
              });
            }
          }
        // });
        socket.on("inform_other_about_disconnected_user", function (data) {
          $("#" + data.connId).remove();
          $("#a_" + data.connId).remove();
          // $(".participant-count").text(data.uNumber);
          // $("#participant_" + data.connId + "").remove();
          AppProcess.closeConnectionCall(data.connId);
        });
        // <!-- .....................HandRaise .................-->
    
        // socket.on("HandRaise_info_for_others", function (data) {
        //   if (data.handRaise) {
        //     $("#hand_" + data.connId).show();
        //   } else {
        //     $("#hand_" + data.connId).hide();
        //   }
        // });
        // <!-- .....................HandRaise .................-->
    
        socket.on("inform_others_about_me", function (data) {
          addUser(data.other_user_id, data.connId, data.userNumber, currentusername);
    
          AppProcess.setNewConnection(data.connId);
        });
        // socket.on("showFileMessage", function (data) {
        //   var num_of_att = $(".left-align").length;
        //   var added_mar = num_of_att * 10;
        //   var mar_top = "-" + (135 + added_mar);
        //   $(".g-details").css({ "margin-top": mar_top });
    
        //   var time = new Date();
        //   var lTime = time.toLocaleString("en-US", {
        //     hour: "numeric",
        //     minute: "numeric",
        //     hour12: true,
        //   });
        //   var attachFileAreaForOther = document.querySelector(".show-attach-file");
    
        //   attachFileAreaForOther.innerHTML +=
        //     "<div class='left-align' style='display:flex; align-items:center;'><img src='public/assets/images/other.jpg' style='height:40px;width:40px;' class='caller-image circle'><div style='font-weight:600;margin:0 5px;'>" +
        //     data.username +
        //     "</div>:<div><a style='color:#007bff;' href='" +
        //     data.filePath +
        //     "' download>" +
        //     data.fileName +
        //     "</a></div></div><br/>";
        // });
        socket.on("inform_me_about_other_user", function (other_users) {
          var userNumber = other_users.length;
          var userNumb = userNumber + 1;
          if (other_users) {
            for (var i = 0; i < other_users.length; i++) {
              addUser(
                other_users[i].user_id,
                other_users[i].connectionId,
                userNumb,
                currentusername
              );
              AppProcess.setNewConnection(other_users[i].connectionId);
            }
          }
        });
        socket.on("SDPProcess", async function (data) {
          await AppProcess.processClientFunc(data.message, data.from_connid);
        });
        // socket.on("showChatMessage", function (data) {
        //   var time = new Date();
        //   var lTime = time.toLocaleString("en-US", {
        //     hour: "numeric",
        //     minute: "numeric",
        //     hour12: true,
        //   });
        //   var div = $("<div>").html(
        //     "<span class='font-weight-bold mr-3' style='color:black'>" +
        //       data.from +
        //       "</span>" +
        //       lTime +
        //       "</br>" +
        //       data.message
        //   );
        //   $("#messages").append(div);
        // });
      }
      function eventHandeling() {
        // <!-- ......................HandRaise ...............-->
        // var handRaise = false;
        // $("#handRaiseAction").on("click", async function () {
        //   if (!handRaise) {
        //     $("img.handRaise").show();
        //     handRaise = true;
        //     socket.emit("sendHandRaise", handRaise);
        //   } else {
        //     $("img.handRaise").hide();
        //     handRaise = false;
        //     socket.emit("sendHandRaise", handRaise);
        //   }
        // });
        // <!-- ......................HandRaise ...............-->
        // $("#btnsend").on("click", function () {
        //   var msgData = $("#msgbox").val();
        //   socket.emit("sendMessage", msgData);
        //   var time = new Date();
        //   var lTime = time.toLocaleString("en-US", {
        //     hour: "numeric",
        //     minute: "numeric",
        //     hour12: true,
        //   });
        //   var div = $("<div>").html(
        //     "<span class='font-weight-bold mr-3' style='color:black'>" +
        //       user_id +
        //       "</span>" +
        //       lTime +
        //       "</br>" +
        //       msgData
        //   );
        //   $("#messages").append(div);
        //   $("#msgbox").val("");
        // });
    
        // var url = window.location.href;
        // $(".meeting_url").text(url);
    
        // $("#con-users").on("dblclick", "video", function () {
        //   this.requestFullscreen();
        // });
      }
    
      function addUser(other_user_id, connId, userNum, username) {
        // var newDivId = $("#otherTemplate").clone();
        // newDivId = newDivId.attr("id", connId).addClass("other");
        // newDivId.find("h2").text(other_user_id);
        // newDivId.find("video").attr("id", "v_" + connId);
        // newDivId.find("audio").attr("id", "a_" + connId);
        // // <!-- .....................HandRaise .................-->
        // newDivId.find("img").attr("id", "hand_" + connId);
        // // <!-- .....................HandRaise .................-->
        // newDivId.show();
        // console.log("running user new div");
        // var newdiv = document.createElement('div');
      //   var newele= `
      //   <div className='flex items-center justify-center pt-2 pb-2' id="${connId}">
      //   <div className='w-[80%] text-white text-lg pl-2'>${other_user_id}</div>
      //   <audio autoplay controls style="display:none" id='a_${connId}'></audio>
      //   <button id="onoffaudio" className='w-[20%] text-center'>
      //     <span id="mic-toggle" class="material-icons w-[100%] text-white" style={{lineHeight:"inherit"}}>mic_off</span>
      //   </button>
      // </div>

      //   `
    //   var newele = `<div className='flex items-center justify-center pt-2 pb-2' id={connid}>
    //   <div className='w-[80%] text-white text-lg pl-2'>{username}</div>
    //   {foraudio?<audio autoplay controls style="display:none" id={"a_"+connid}></audio>:<></>}
    //   <button id="onoffaudio" className='w-[20%] text-center'>
    //     <span id="mic-toggle" class="material-icons w-[100%] text-white" style={{lineHeight:"inherit"}}>mic_off</span>
    //   </button>
    // </div>`
        // $("#con-users").append(newele);
        // newdiv.innerHTML = newele;
        // console.log(newele);
        // // document.getElementById("con-users").append(<Participants username={other_user_id} connid={connId} foraudio={true} />);
        // document.getElementById("con-users").append(newdiv);
        var audioele = document.createElement('div');
        audioele.innerHTML = `<audio autoplay controls style="display:none" id=${"a_"+connId}></audio>`
        document.getElementById("audios").appendChild(audioele);
        // participants.push({username:other_user_id, connid:connId});
        // setParticipants(participants);
        var audioname = document.createElement('div');
        audioname.setAttribute("id", connId);
        audioname.innerHTML = `<div style="font-size:18px; font-weight:600;">${other_user_id}</div>`;
        document.getElementById("audio-audio").appendChild(audioname);

        // var div_ = document.createElement("div"); 
        // div_.classList.add("bg-blue-700");
        // div_.classList.add("absolute");
        // div_.classList.add("w-4");
        // div_.classList.add("h-4");
        // div_.classList.add("z-50");
        // div_.classList.add("rounded");
        // div_.setAttribute('id', "cur_"+connId);
        // document.getElementById("cursors").appendChild(div_);
        // $(".in-call-wrap-up").append(
        //   '<div class="in-call-wrap d-flex justify-content-between align-items-center mb-3" id="participant_' +
        //     connId +
        //     '"> <div class="participant-img-name-wrap display-center cursor-pointer"> <div class="participant-img"> <img src="public/Assets/images/other.jpg" alt="" class="border border-secondary" style="height: 40px;width: 40px;border-radius: 50%;"> </div> <div class="participant-name ml-2"> ' +
        //     other_user_id +
        //     '</div> </div> <div class="participant-action-wrap display-center"> <div class="participant-action-dot display-center mr-2 cursor-pointer"> <span class="material-icons"> more_vert </span> </div> <div class="participant-action-pin display-center mr-2 cursor-pointer"> <span class="material-icons"> push_pin </span> </div> </div> </div>'
        // );
        // $(".participant-count").text(userNum);
      }
      // $(document).on("click", ".people-heading", function () {
      //   $(".in-call-wrap-up").show(300);
      //   $(".chat-show-wrap").hide(300);
      //   $(this).addClass("active");
      //   $(".chat-heading").removeClass("active");
      // });
      // $(document).on("click", ".chat-heading", function () {
      //   $(".in-call-wrap-up").hide(300);
      //   $(".chat-show-wrap").show(300);
      //   $(this).addClass("active");
      //   $(".people-heading").removeClass("active");
      // });
      // $(document).on("click", ".meeting-heading-cross", function () {
      //   $(".g-right-details-wrap").hide(300);
      // });
      // $(document).on("click", ".top-left-participant-wrap", function () {
      //   $(".people-heading").addClass("active");
      //   $(".chat-heading").removeClass("active");
      //   $(".g-right-details-wrap").show(300);
      //   $(".in-call-wrap-up").show(300);
      //   $(".chat-show-wrap").hide(300);
      // });
      // $(document).on("click", ".top-left-chat-wrap", function () {
      //   $(".people-heading").removeClass("active");
      //   $(".chat-heading").addClass("active");
      //   $(".g-right-details-wrap").show(300);
      //   $(".in-call-wrap-up").hide(300);
      //   $(".chat-show-wrap").show(300);
      // });
      // $(document).on("click", ".end-call-wrap", function () {
      //   $(".top-box-show")
      //     .css({
      //       display: "block",
      //     })
      //     .html(
      //       '<div class="top-box align-vertical-middle profile-dialogue-show"> <h4 class="mt-3" style="text-align:center;color:white;">Leave Meeting</h4> <hr> <div class="call-leave-cancel-action d-flex justify-content-center align-items-center w-100"> <a href="/action.html"><button class="call-leave-action btn btn-danger mr-5">Leave</button></a> <button class="call-cancel-action btn btn-secondary">Cancel</button> </div> </div>'
      //     );
      // });
      // $(document).mouseup(function (e) {
      //   var container = new Array();
      //   container.push($(".top-box-show"));
      //   $.each(container, function (key, value) {
      //     if (!$(value).is(e.target) && $(value).has(e.target).length == 0) {
      //       $(value).empty();
      //     }
      //   });
      // });
      // $(document).mouseup(function (e) {
      //   var container = new Array();
      //   container.push($(".g-details"));
      //   container.push($(".g-right-details-wrap"));
      //   $.each(container, function (key, value) {
      //     if (!$(value).is(e.target) && $(value).has(e.target).length == 0) {
      //       $(value).hide(300);
      //     }
      //   });
      // });
      // $(document).on("click", ".call-cancel-action", function () {
      //   $(".top-box-show").html("");
      // });
      // $(document).on("click", ".copy_info", function () {
      //   var $temp = $("<input>");
      //   $("body").append($temp);
      //   $temp.val($(".meeting_url").text()).select();
      //   document.execCommand("copy");
      //   $temp.remove();
      //   $(".link-conf").show();
      //   setTimeout(function () {
      //     $(".link-conf").hide();
      //   }, 3000);
      // });
      // $(document).on("click", ".meeting-details-button", function () {
      //   $(".g-details").slideDown(300);
      // });
      // $(document).on("click", ".g-details-heading-attachment", function () {
      //   $(".g-details-heading-show").hide();
      //   $(".g-details-heading-show-attachment").show();
      //   $(this).addClass("active");
      //   $(".g-details-heading-detail").removeClass("active");
      // });
      // $(document).on("click", ".g-details-heading-detail", function () {
      //   $(".g-details-heading-show").show();
      //   $(".g-details-heading-show-attachment").hide();
      //   $(this).addClass("active");
      //   $(".g-details-heading-attachment").removeClass("active");
      // });
      // var base_url = window.location.origin;
    
      // $(document).on("change", ".custom-file-input", function () {
      //   var fileName = $(this).val().split("\\").pop();
      //   $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
      // });
    
      // $(document).on("click", ".share-attach", function (e) {
      //   e.preventDefault();
      //   var att_img = $("#customFile").prop("files")[0];
      //   var formData = new FormData();
      //   formData.append("zipfile", att_img);
      //   formData.append("meeting_id", meeting_id);
      //   formData.append("username", user_id);
      //   console.log(formData);
      //   $.ajax({
      //     url: base_url + "/attachimg",
      //     type: "POST",
      //     data: formData,
      //     contentType: false,
      //     processData: false,
      //     success: function (response) {
      //       console.log(response);
      //     },
      //     error: function () {
      //       console.log("error");
      //     },
      //   });
    
      //   var attachFileArea = document.querySelector(".show-attach-file");
      //   var attachFileName = $("#customFile").val().split("\\").pop();
      //   var attachFilePath =
      //     "public/attachment/" + meeting_id + "/" + attachFileName;
      //   attachFileArea.innerHTML +=
      //     "<div class='left-align' style='display:flex; align-items:center;'><img src='public/assets/images/other.jpg' style='height:40px;width:40px;' class='caller-image circle'><div style='font-weight:600;margin:0 5px;'>" +
      //     user_id +
      //     "</div>:<div><a style='color:#007bff;' href='" +
      //     attachFilePath +
      //     "' download>" +
      //     attachFileName +
      //     "</a></div></div><br/>";
      //   $("label.custom-file-label").text("");
      //   socket.emit("fileTransferToOther", {
      //     username: user_id,
      //     meetingid: meeting_id,
      //     filePath: attachFilePath,
      //     fileName: attachFileName,
      //   });
      // });
      // $(document).on("click", ".option-icon", function () {
      //   $(".recording-show").toggle(300);
      // });
    
      // $(document).on("click", ".start-record", function () {
      //   $(this)
      //     .removeClass()
      //     .addClass("stop-record btn-danger text-dark")
      //     .text("Stop Recording");
      //   startRecording();
      // });
      // $(document).on("click", ".stop-record", function () {
      //   $(this)
      //     .removeClass()
      //     .addClass("start-record btn-dark text-danger")
      //     .text("Start Recording");
      //   mediaRecorder.stop();
      // });
    
      // var mediaRecorder;
      // var chunks = [];
      // async function captureScreen(
      //   mediaContraints = {
      //     video: true,
      //   }
      // ) {
      //   const screenStream = await navigator.mediaDevices.getDisplayMedia(
      //     mediaContraints
      //   );
      //   return screenStream;
      // }
      // async function captureAudio(
      //   mediaContraints = {
      //     video: false,
      //     audio: true,
      //   }
      // ) {
      //   const audioStream = await navigator.mediaDevices.getUserMedia(
      //     mediaContraints
      //   );
      //   return audioStream;
      // }
      // async function startRecording() {
      //   const screenStream = await captureScreen();
      //   const audioStream = await captureAudio();
      //   const stream = new MediaStream([
      //     ...screenStream.getTracks(),
      //     ...audioStream.getTracks(),
      //   ]);
      //   mediaRecorder = new MediaRecorder(stream);
      //   mediaRecorder.start();
      //   mediaRecorder.onstop = function (e) {
      //     var clipName = prompt("Enter a name for your recording");
      //     stream.getTracks().forEach((track) => track.stop());
      //     const blob = new Blob(chunks, {
      //       type: "video/webm",
      //     });
      //     const url = window.URL.createObjectURL(blob);
      //     const a = document.createElement("a");
      //     a.style.display = "none";
      //     a.href = url;
      //     a.download = clipName + ".webm";
      //     document.body.appendChild(a);
      //     a.click();
      //     setTimeout(() => {
      //       document.body.removeChild(a);
      //       window.URL.revokeObjectURL(url);
      //     }, 100);
      //   };
      //   mediaRecorder.ondataavailable = function (e) {
      //     chunks.push(e.data);
      //   };
      // }
    
      return {
        _init: function (uid, mid) {
          init(uid, mid);
        },
      };
    })();
    // useEffect(()=>{
    //   MyApp._init(currentusername, baseid);
    // }, [])

    function copylink(link){
      navigator.clipboard.writeText(link);
    }

    // function handleCursor(e){
    //   console.log(e);
    //   // console.log("cursor change :",e.cursor.row, e.cursor.column);
    //   // var cursorPosition = e.cursor;
    //   var editor = ace.edit("code-editor"); // Replace with your actual editor instance
    //   var position = editor.renderer.textToScreenCoordinates(e.cursor.row, e.cursor.column);
    //   console.log("change of cursor :", position);

    //   socket.emit('cursor-change-1', { room:baseid, left:position.pageX, top:position.pageY, username: myConnId});
    //   // e.session.insert(20, "mhasd");
    //   // var editorElement = e.renderer.scroller;
    //   // var offset = $(editorElement).offset(); // jQuery used here for brevity; use equivalent for your framework

    //   // // Calculate position relative to document
    //   // var docX = offset.left + e.session.getScrollLeft();
    //   // var docY = offset.top + e.session.getScrollTop();

    //   // // Adjust for editor-specific offset within the editor
    //   // var x = docX + e.renderer.characterWidth * cursorPosition.column;
    //   // var y = docY + e.renderer.lineHeight * cursorPosition.row;

    // }
  // end code for audio
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
    <>
    {gemini?<div className='w-[50%] bg-[#0c0b0d] absolute z-20 right-1 top-16 rounded-lg overflow-hidden shadow-md duration-100'>
      <div className=' w-[100%] h-[100%] flex flex-col justify-center items-center'>
        <div className='w-[100%] h-72'>
          <div className='w-[100%] h-[100%] flex flex-col items-center justify-center text-white' id="intro-gem">
            <h2 className='font-bold'>Ask Gemini</h2>
            <p>Get ideas, solve errors with the help of Google AI</p>
          </div>
          <div className='w-[100%] h-[100%] p-2 font-bold text-md overflow-y-scroll' id="promptres" style={{display:"none"}}>
            {/* <h2 className='font-bold'>Ask Gemini</h2>
            <p>Get ideas, solve errors with the help of Google AI</p> */}
          </div>
        </div>
        <div className='w-[100%] relative flex bg-black'>
        {/* m-0 w-full resize-none border-0 bg-transparent focus:ring-0 focus-visible:ring-0 dark:bg-transparent py-[10px] pr-10 md:py-3.5 md:pr-12 max-h-[25dvh] max-h-52 placeholder-black/50 dark:placeholder-white/50 pl-4 md:pl-6 */}
          <textarea className='w-[100%] h-[100px] bg-transparent text-white rounded pt-2 pb-2 resize-none outline-none pl-2 pr-2 border-none' id='promptarea'></textarea>
          <div className='flex items-center justify-center cursor-pointer w-8 h-[50px] pr-2' onClick={()=>{getairesponse()}}>
          {gemLoading?<Spinner colour={"white"}/>:
                  // <svg className='w-4 h-4 text-white' class="svg-inline--fa fa-play absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path></svg>
          <svg className="w-[100%] h-[100%]" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" ><g><path fill="white" d="M22.101 10.562 2.753 1.123A1.219 1.219 0 0 0 1 2.22v.035a2 2 0 0 0 .06.485l1.856 7.424a.5.5 0 0 0 .43.375l8.157.907a.559.559 0 0 1 0 1.11l-8.157.907a.5.5 0 0 0-.43.375L1.06 21.261a2 2 0 0 0-.06.485v.035a1.219 1.219 0 0 0 1.753 1.096L22.1 13.438a1.6 1.6 0 0 0 0-2.876z" opacity="1"></path></g></svg>                                 
          }
          </div>
        </div>
      </div>
    </div>:<></>}
    <div className=' w-[100%] h-[100vh] flex flex-col justify-start items-center bg-black'>
        {/* <button onClick={handleJoinRoom}>Join Room</button> */}
        <div className="w-[100%]  flex justify-between items-center  pl-4 pr-4 top-0 z-10 pt-2 pb-2">
            <div className=" w-[33%] flex items-center justify-start">
              

                <div className=" flex bg-white rounded p-1 pr-2 pl-2 justify-center items-center space-x-1">
                  <Link href="/main/bases">
                    <h3 className="text-[1.5rem] font-bold text-black">
                      {filename}
                    </h3>
                  </Link>
                    <div onClick={()=>{copylink("http://localhost:3000/"+"/basework/"+baseid)}} className=' cursor-pointer'>
                        <img src="https://cdn-icons-png.flaticon.com/512/88/88026.png " className="w-[1.5rem] h-[1.5rem]" title="Copy link"/>
                    </div>
                </div>
              <div className='flex'>
                <div className="pl-3">
                    <h3 className="text-[1.0rem] text-green-600 bg-gray-800 rounded-l border-r-2 border-black p-1">{accesstype}</h3>
                </div>
                <div className="">
                    {/* <div className=' animate-pulse flex'> */}
                      <p className='  text-green-600 bg-gray-800 p-1 border-r-2 border-black'><span>{language}</span></p>
                    {/* </div> */}
                </div>
                <div className="">
                    {/* <div className=' animate-pulse flex'> */}
                      <p className='  text-green-600 bg-gray-800 rounded-r p-1 '><span className=" animate-pulse">Auto save</span></p>
                    {/* </div> */}
                </div>
              </div>
            </div>
              <div className=' w-[33%] flex items-center justify-center'>
                <div className=' bg-slate-800 flex justify-center items-center p-2 space-x-2 rounded cursor-pointer' onClick={()=>{onrun()}}>
                  {running?<Spinner colour={"white"}/>:
                  // <svg className='w-4 h-4 text-white' class="svg-inline--fa fa-play absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path></svg>
                  <svg viewBox="0 0 163.861 163.861"  className='w-4 h-4 text-white'><g><path d="M34.857 3.613C20.084-4.861 8.107 2.081 8.107 19.106v125.637c0 17.042 11.977 23.975 26.75 15.509L144.67 97.275c14.778-8.477 14.778-22.211 0-30.686L34.857 3.613z" fill="white" opacity="1"  class=""></path></g></svg>
                  }
                  <span className=' text-white'>Run</span>
                </div>
              </div>
              <div className=' w-[33%] flex items-center justify-end space-x-3'>
                <div className='flex items-center justify-center space-x-1 bg-slate-700 p-1 pl-2 pr-2 rounded cursor-pointer' title="Ask Gemini" onClick={()=>{opengemini()}}>
                  <div className=' text-white'>Gemini</div>
                  
                                       <svg className='w-10 h-10' fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z" fill="url(#prefix__paint0_radial_980_20147)"/><defs><radialGradient id="prefix__paint0_radial_980_20147" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"><stop offset=".067" stop-color="#9168C0"/><stop offset=".343" stop-color="#5684D1"/><stop offset=".672" stop-color="#1BA1E3"/></radialGradient></defs></svg>               

                </div>
                {/* <div className=' text-white'>Profile</div> */}
              </div>
        </div>
      {/* <div className='mt-1'> */}
      <div className='w-[98%] h-[100%] flex space-x-2'>
        <AceEditor className=''
              mode="javascript"
              theme="twilight"
              onChange={(e) => handleCodeChange(e)}
              value={code}
              name="code-editor"
              editorProps={{ $blockScrolling: true }}
              style={{ width: '55%', height: '98%', borderRadius:"10px"}}
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
        <div className='flex flex-col w-[45%] h-[98%] justify-between'>
          <div className=' w-[100%] h-[49%] rounded overflow-y-scroll' style={{background:"rgb(20 20 20)"}}>
            <div className='p-1'><span className='text-md text-gray-400'>{filename}@ output{'>'}</span></div>
            <div id="stdout-main" className=' text-white p-1 pl-2'></div>
            <div id="stderr-main" className=' text-white p-1 pl-2'></div>
          </div>

          <textarea id="stdin-tarea" style={{background:"#232323"}} className='w-[100%] h-[8%] p-1 overflow-y-scroll resize-none outline-none rounded-br rounded-bl text-white' placeholder='Standard input goes here(stdin)'></textarea>
          
          {/* users div */}
          <div style ={{background:"rgb(14 21 39)"}} className='-[100%] h-[42%] mt-2 rounded overflow-y-scroll'>
            <div id="con-users">
            {/* <div id="cursors">
              <div className=' bg-green-500 rounded w-4 h-4'></div>
            </div> */}
            <h1 className='text-xl text-white p-3 font-bold' id={"cur_"+myConnId}>Collaborators</h1>

              <div id="audios"></div>
              {/* <div className='flex items-center justify-center pt-2 pb-2'>
                <div className='w-[80%] text-white text-lg pl-2'>{currentusername}</div>
                <button id="onoffaudio" className='w-[20%] text-center'>
                  <span id="mic-toggle" class="material-icons w-[100%] text-white" style={{lineHeight:"inherit"}}>mic_off</span>
                </button>
              </div> */}
              {/* <h2 className='p-1 text-gray-300'>Participants</h2> */}
              <Participants username={currentusername} ismain={true}/>
              <div id="audio-audio" className='pl-4 space-y-3 text-white'></div>
              {/* {onmic()} */}
              {/* {participants.map(x=><Participants username={x.username} connid={x.connId} foraudio={true}/>)} */}
            </div>
          </div>
        </div>
      </div>
        {/* <div className=' w-[40%]'></div> */}
      {/* </div> */}
          
          </div>
    </>


    );
};

export default Home;