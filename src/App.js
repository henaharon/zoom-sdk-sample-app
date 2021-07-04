import React, { useState } from "react";
import {JoinForm, HostForm} from './Form';
import { ButtonGroup, Button } from '@material-ui/core'
import './App.css';
import { urls } from './consts'

declare var ZoomMtg

ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.6/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

const App = () => {
  var signatureEndpoint = urls.SERVER_URL
  const zoomConfig = {
    apiKey: urls.API_KEY, 
    meetingNumber: "",
    passWord: "",
    leaveUrl: urls.LEAVE_URL,
    userName: "",
    userEmail: "", 
    role: 0, // 0 for guest, 1 for host
  };

  const [config, setConfig] = useState(zoomConfig);
  const [formVisibility , setVisibility] = useState(0);

  const createMeeting = async () => {
    const res = await fetch(`${urls.SERVER_URL}/createMeeting`, {
      method: 'GET',
      headers: { 
                  'Content-Type': 'application/json', 
                },
    });
    const response = await res.json()
    getSignature(response.id, response.password)
  }


  function getSignature(meetingNumber, pass) {
    const role = config.userEmail !== "" ? 1 : 0
    fetch(signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber ? meetingNumber : config.meetingNumber,
        role: role
      })
    }).then(res => res.json())
    .then(response => {
      startMeeting(response.signature, meetingNumber, pass)
    }).catch(error => {
      console.error(error)
    })
  }

  function startMeeting(signature, meetingNumber, pass) {
    const number = meetingNumber ? meetingNumber : config.meetingNumber
    const password = pass ? pass : config.passWord
    document.getElementById('zmmtg-root').style.display = 'block'
    ZoomMtg.init({
      leaveUrl: config.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        ZoomMtg.join({
          signature: signature,
          meetingNumber: String(number),
          passWord: String(password),
          userName: config.userName,
          apiKey: config.apiKey,
          userEmail: config.userEmail,
          success: (success) => {
          },
          error: (error) => {
            console.log('error', error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  const handleChange = (e) => {
    setConfig({
      ...config,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmitJoin = (e) => {
    e.preventDefault();
    getSignature()
  };

  const handleSubmitHost = async (e) => {
    e.preventDefault();
    await createMeeting()
  };

  return (
    <div className="App">
      <main>
        <h1>Zoom WebSDK Sample React</h1>
        <ButtonGroup style={{marginTop: '100px'}} color="primary" aria-label="outlined primary button group">
          <Button onClick={() => setVisibility(0)}>Join</Button>
          <Button onClick={() => setVisibility(1)}>Host</Button>
        </ButtonGroup>
        <div className="rowStyle">
          <div className="formCard" style={formVisibility === 1  ? {display: "none" } : {}}>
            <h2>Join</h2>
            <JoinForm         
              handleSubmit={handleSubmitJoin}
              handleChange={handleChange}
              config={config}/>
          </div>
          <div className="formCard" style={formVisibility === 0 ? {display: "none" } : {}}>
            <h2>Host</h2>
            <HostForm         
              handleSubmit={handleSubmitHost}
              handleChange={handleChange}
              config={config}/>
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;
