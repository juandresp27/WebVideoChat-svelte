import { c as create_ssr_component, o as onDestroy, v as validate_component, d as each, e as escape, b as add_attribute } from './index2-29026190.js';
import { s as socketConnection, d as devicesSelected, g as goto } from './navigation-0df9e63d.js';
import './index-db5b8b39.js';

const IncorrectJoinCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section><a href="/">Home</a>
    <h1>Go home page and join correctly</h1></section>`;
});
const IncorrectRoomCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section><a href="/">Home</a>
    <h1>The room not exist</h1></section>`;
});
const css$4 = {
  code: ".settings-card.svelte-irtccy.svelte-irtccy{height:fit-content;position:fixed;top:50%;left:46%;transform:translate(-50%, -50%)}.card.svelte-irtccy.svelte-irtccy{width:250px;height:auto;transition:all 0.2s;position:relative;cursor:pointer}.card-inner.svelte-irtccy.svelte-irtccy{padding:1rem;width:inherit;height:inherit;background:rgba(255,255,255,.05);box-shadow:0 0 10px rgba(0,0,0,0.25);backdrop-filter:blur(10px);border-radius:8px}.set.svelte-irtccy.svelte-irtccy{position:relative;color:white;display:flex;flex-direction:column;justify-content:center;margin-bottom:1rem}.buttons.svelte-irtccy.svelte-irtccy{display:flex;justify-content:center;gap:1rem}button.svelte-irtccy.svelte-irtccy{border-radius:10px;border-style:none;padding:0.5rem 1rem;background:white;cursor:pointer}button.svelte-irtccy.svelte-irtccy:first-child{background:#EBD18D}.set.svelte-irtccy select.svelte-irtccy{font-family:'Arial';display:inline-block;width:100%;cursor:pointer;padding:7px 17px;outline:0;border:0px solid #000000;border-radius:20px;background:whitesmoke;color:#000;appearance:none;-webkit-appearance:none;-moz-appearance:none}.circle.svelte-irtccy.svelte-irtccy{width:100px;height:100px;background:radial-gradient(#d9b864, #EBD18D);border-radius:50%;position:absolute;animation:svelte-irtccy-move-up6 2s ease-in infinite alternate-reverse}.circle.svelte-irtccy.svelte-irtccy:nth-child(1){top:-25px;left:-25px}.circle.svelte-irtccy.svelte-irtccy:nth-child(2){bottom:-25px;right:-58px;animation-name:svelte-irtccy-move-down1}@keyframes svelte-irtccy-move-up6{to{transform:translateY(-10px)}}@keyframes svelte-irtccy-move-down1{to{transform:translateY(10px)}}.select_arrow.svelte-irtccy.svelte-irtccy{position:absolute;top:29px;right:5px;pointer-events:none;border-style:solid;border-width:8px 5px 0px 5px;border-color:#333333b8 transparent transparent transparent}",
  map: null
};
const SettingsCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let Microphones = [];
  let VideoDevices = [];
  let SpeakerDevices = [];
  $$result.css.add(css$4);
  return `<div class="settings-card svelte-irtccy"><div class="card svelte-irtccy"><div class="circle svelte-irtccy"></div>
        <div class="circle svelte-irtccy"></div>
        <div class="card-inner svelte-irtccy"><div class="set svelte-irtccy"><label for="Microphones">Microphone:</label>
                <select name="Microphones" id="Microphones" class="svelte-irtccy">${each(Microphones, (device) => {
    return `<option${add_attribute("value", device.deviceId, 0)}>${escape(device.label)}</option>`;
  })}</select>
                <div class="select_arrow svelte-irtccy"></div></div>
            <div class="set svelte-irtccy"><label for="Webcams">Webcam:</label>
                <select name="Webcams" id="Webcams" class="svelte-irtccy">${each(VideoDevices, (device) => {
    return `<option${add_attribute("value", device.deviceId, 0)}>${escape(device.label)}</option>`;
  })}</select>
                <div class="select_arrow svelte-irtccy"></div></div>
            <div class="set svelte-irtccy"><label for="Speakers">Speakers</label>
                <select name="Speakers" id="Speakers" class="svelte-irtccy">${each(SpeakerDevices, (device) => {
    return `<option${add_attribute("value", device.deviceId, 0)}>${escape(device.label)}</option>`;
  })}</select>
                <div class="select_arrow svelte-irtccy"></div></div>
            <div class="buttons svelte-irtccy"><button class="svelte-irtccy">Join</button></div></div></div>
</div>`;
});
const css$3 = {
  code: ".video-container.svelte-mv2wpo{margin:0;width:100%;height:0;padding-bottom:56.25%;background-color:black;position:relative;border-radius:0.5rem;overflow:hidden;animation:svelte-mv2wpo-show 0.4s ease}video.svelte-mv2wpo{width:100%;height:100%;position:absolute;top:0;left:0}@keyframes svelte-mv2wpo-show{0%{opacity:0;transform:scale(0.4) translateY(20px)}100%{opacity:1;transform:scale(1) translateY(0)}}",
  map: null
};
const MediaVideo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { streamData } = $$props;
  let { id } = $$props;
  let muted;
  let video_source;
  if ($$props.streamData === void 0 && $$bindings.streamData && streamData !== void 0)
    $$bindings.streamData(streamData);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  $$result.css.add(css$3);
  return `<div class="video-container svelte-mv2wpo">${streamData ? `<video autoplay${add_attribute("id", id, 0)} class="svelte-mv2wpo"${add_attribute("this", video_source, 0)}${add_attribute("muted", muted, 1)}><track kind="captions"></video>` : ``}
</div>`;
});
const css$2 = {
  code: ".webcam.svelte-kj2w8f{margin:10px}.dish.svelte-kj2w8f{height:88svh;width:98svw;margin:2.6rem auto 0 auto;display:flex;align-content:center;flex-wrap:wrap;align-items:center;justify-content:center;vertical-align:middle;flex:1;border-radius:10px;background:rgba(0, 0, 0, 0.3)}",
  map: null
};
const margin = 10;
const StreamsZone = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { localStream } = $$props;
  let { remoteStreams } = $$props;
  let screenHeight;
  let screenWidth;
  let dishSize = { width: 0, height: 0 };
  let usersQty;
  let calculatedWidth;
  let calculatedHeight;
  const aspectRatio = 9 / 16;
  function areaF(increment) {
    let i = 0;
    let w = 0;
    let h = increment * aspectRatio + margin * 2;
    while (i < usersQty) {
      if (w + increment > dishSize.width) {
        w = 0;
        h = h + increment * aspectRatio + margin * 2;
      }
      w = w + increment + margin * 2;
      i++;
    }
    if (h > dishSize.height || increment > dishSize.width)
      return false;
    else
      return increment;
  }
  function resize() {
    let max = 0;
    let i = 1;
    while (i < 5e3) {
      let area = areaF(i);
      if (area === false) {
        max = i - 1;
        break;
      }
      i++;
    }
    max = max - margin * 2;
    return max;
  }
  if ($$props.localStream === void 0 && $$bindings.localStream && localStream !== void 0)
    $$bindings.localStream(localStream);
  if ($$props.remoteStreams === void 0 && $$bindings.remoteStreams && remoteStreams !== void 0)
    $$bindings.remoteStreams(remoteStreams);
  $$result.css.add(css$2);
  {
    {
      usersQty = remoteStreams.length + 1;
      dishSize = {
        width: Math.floor(screenWidth * 0.98),
        height: Math.floor(screenHeight * 0.87)
      };
      dishSize.width * dishSize.height;
      calculatedWidth = resize();
      calculatedHeight = calculatedWidth * aspectRatio;
    }
  }
  return `

<section class="dish svelte-kj2w8f">${localStream !== void 0 ? `<div class="webcam svelte-kj2w8f" style="${"width: " + escape(calculatedWidth, true) + "px; height: " + escape(calculatedHeight, true) + "px"}">${validate_component(MediaVideo, "MediaVideo").$$render($$result, { streamData: localStream, id: "me" }, {}, {})}</div>` : ``}
    ${each(remoteStreams, (remote) => {
    return `<div class="webcam svelte-kj2w8f" style="${"width: " + escape(calculatedWidth, true) + "px;"}">${validate_component(MediaVideo, "MediaVideo").$$render($$result, { streamData: remote.stream, id: remote.id }, {}, {})}
        </div>`;
  })}
</section>`;
});
const People = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16"><path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"></path></svg>`;
});
const Share = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16"><path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"></path></svg>`;
});
const css$1 = {
  code: ".leave-control.svelte-10s6j8w.svelte-10s6j8w{flex-grow:1;margin-left:5px;align-items:center}.leave-control.svelte-10s6j8w button.svelte-10s6j8w{height:100%;background:#cc4b41;border:none;border-radius:10px;padding:0.5rem 1rem;color:white}.cards.svelte-10s6j8w.svelte-10s6j8w{justify-content:center;margin:0 1rem}.accesibility.svelte-10s6j8w.svelte-10s6j8w{display:flex;gap:1rem;justify-content:end;margin-right:0.5rem}.show.svelte-10s6j8w.svelte-10s6j8w{border:none;border-radius:0.5rem;background:#EBD18D;color:#333;padding:0.4rem 0.6rem;justify-content:center;align-items:center}.show.svelte-10s6j8w.svelte-10s6j8w:hover{background:#f6e4b6;cursor:pointer}",
  map: null
};
const ControlsAcces = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { roomID } = $$props;
  let { usersConnected } = $$props;
  let { leaveFunc } = $$props;
  if ($$props.roomID === void 0 && $$bindings.roomID && roomID !== void 0)
    $$bindings.roomID(roomID);
  if ($$props.usersConnected === void 0 && $$bindings.usersConnected && usersConnected !== void 0)
    $$bindings.usersConnected(usersConnected);
  if ($$props.leaveFunc === void 0 && $$bindings.leaveFunc && leaveFunc !== void 0)
    $$bindings.leaveFunc(leaveFunc);
  $$result.css.add(css$1);
  return `<section class="accesibility svelte-10s6j8w"><section class="leave-control svelte-10s6j8w"><button class="svelte-10s6j8w">Leave</button></section>
    <button class="show svelte-10s6j8w">${`${validate_component(Share, "Share").$$render($$result, {}, {}, {})}`}</button>
    
    <button class="show svelte-10s6j8w">${`${validate_component(People, "People").$$render($$result, {}, {}, {})}`}</button></section>

<section class="cards svelte-10s6j8w">${``}
    
    ${``}
</section>`;
});
const css = {
  code: "header.svelte-1uocphl{position:fixed;top:0;width:100svw;background:#3c3c3c;padding:0.5rem 0;z-index:1}.Page.svelte-1uocphl{max-width:100svw;max-height:100svh;width:100svw;height:100svh}main.svelte-1uocphl{display:inline;max-height:100svh;max-width:100svw;padding:0 1rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let usersConnected = [];
  let socket;
  let socketId;
  let localStream;
  let connections = [];
  let remoteStreams = [];
  let incorretJoin = false;
  let incorretRoom = false;
  let showSettings = true;
  let devicesSelect;
  const peerConnectionConfig = {
    "iceServers": [
      { "urls": "stun:stun.services.mozilla.com" },
      { "urls": "stun:stun.l.google.com:19302" }
    ]
  };
  const unsubscribe = socketConnection.subscribe((value) => {
    socket = value;
  });
  const unsubscribeDevicesSel = devicesSelected.subscribe((value) => {
    devicesSelect = value;
  });
  const handleLeave = () => {
    socket.emit("room:leave", data.roomId);
    goto("/");
    devicesSelected.update(() => {
      return {
        microphoneId: "",
        videoId: "",
        speakerId: ""
      };
    });
  };
  const handleUserLeft = (socketID) => {
    remoteStreams = remoteStreams.filter((stream) => stream.id !== socketID);
  };
  const handleResponse = (users) => {
    usersConnected = users;
  };
  const getMyStream = async () => {
    const constraints = {
      video: {
        deviceId: { exact: devicesSelect.videoId }
      },
      audio: {
        deviceId: { exact: devicesSelect.microphoneId }
      }
    };
    try {
      if (navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          localStream = stream;
          return stream;
        } catch (err) {
          console.log(err);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const gotMessageFromServer = (fromId, message) => {
    const signal = JSON.parse(message);
    if (fromId !== socketId) {
      if (signal.sdp) {
        connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(function() {
          if (signal.sdp.type == "offer") {
            connections[fromId].createAnswer().then(function(description) {
              connections[fromId].setLocalDescription(description).then(function() {
                socket.emit("signal", fromId, JSON.stringify({
                  "sdp": connections[fromId].localDescription
                }));
              }).catch((e) => console.log(e));
            }).catch((e) => console.log(e));
          }
        }).catch((e) => console.log(e));
      }
      if (signal.ice) {
        connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch((e) => console.log(e));
      }
    }
  };
  const gotRemoteStream = (event, id) => {
    remoteStreams = [...remoteStreams, { id, stream: event.stream }];
  };
  const handleUserConnected = (id, count, clients) => {
    clients.forEach(function(socketListId) {
      if (!connections[socketListId]) {
        connections[socketListId] = new RTCPeerConnection(peerConnectionConfig);
        connections[socketListId].addStream(localStream);
        connections[socketListId].onicecandidate = function(event) {
          if (event.candidate != null) {
            console.log("SENDING ICE");
            socket.emit("signal", socketListId, JSON.stringify({ "ice": event.candidate }));
          }
        };
        connections[socketListId].onaddstream = function(event) {
          gotRemoteStream(event, socketListId);
        };
      }
    });
    if (count >= 2) {
      connections[id].createOffer().then(function(description) {
        connections[id].setLocalDescription(description).then(function() {
          socket.emit("signal", id, JSON.stringify({ "sdp": connections[id].localDescription }));
        }).catch((e) => console.log(e));
      });
    }
  };
  const handleIncorrectJoin = () => {
    incorretJoin = true;
  };
  const handleIncorrectRoom = () => {
    incorretRoom = true;
  };
  socketId = socket.id;
  onDestroy(() => {
    unsubscribe();
    unsubscribeDevicesSel();
    socket.off("join:incorrect", handleIncorrectJoin);
    socket.off("room:incorrect", handleIncorrectRoom);
    socket.off("users:response", handleResponse);
    socket.off("signal", gotMessageFromServer);
    socket.off("user:connected", handleUserConnected);
    socket.off("user:left", handleUserLeft);
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  {
    {
      if (!incorretJoin) {
        if (devicesSelect.microphoneId !== "" && devicesSelect.videoId !== "" && devicesSelect.speakerId !== "") {
          showSettings = false;
          getMyStream().then((stream) => {
          }).then(() => {
            socket.on("user:connected", handleUserConnected);
            socket.on("signal", gotMessageFromServer);
            socket.on("user:left", handleUserLeft);
            socket.emit("page:ready", data.roomId);
          });
        }
      }
    }
  }
  return `<div class="Page svelte-1uocphl">${incorretRoom ? `${validate_component(IncorrectRoomCard, "IncorrectRoomCard").$$render($$result, {}, {}, {})}` : `${incorretJoin ? `${validate_component(IncorrectJoinCard, "IncorrectJoinCard").$$render($$result, {}, {}, {})}` : `${showSettings ? `${validate_component(SettingsCard, "SettingsCard").$$render($$result, {}, {}, {})}` : `<header class="svelte-1uocphl">${validate_component(ControlsAcces, "ControlsAcces").$$render(
    $$result,
    {
      roomID: data.roomId,
      usersConnected,
      leaveFunc: handleLeave
    },
    {},
    {}
  )}</header>
            
            <main class="svelte-1uocphl">${validate_component(StreamsZone, "StreamsZone").$$render($$result, { localStream, remoteStreams }, {}, {})}</main>`}`}`}

</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-4f0290e4.js.map
