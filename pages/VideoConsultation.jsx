import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const VideoConsultation = () => {

  const localVideo = useRef();
  const remoteVideo = useRef();

  const peerConnection = useRef();

  const roomId = "doctor-patient-room";

  useEffect(() => {

    startVideo();

  }, []);

  const startVideo = async () => {

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    localVideo.current.srcObject = stream;

    peerConnection.current = new RTCPeerConnection();

    stream.getTracks().forEach(track => {
      peerConnection.current.addTrack(track, stream);
    });

    peerConnection.current.ontrack = (event) => {
      remoteVideo.current.srcObject = event.streams[0];
    };

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          roomId,
          candidate: event.candidate
        });
      }
    };

    socket.emit("join-room", roomId);

    socket.on("offer", async (offer) => {

      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );

      const answer = await peerConnection.current.createAnswer();

      await peerConnection.current.setLocalDescription(answer);

      socket.emit("answer", {
        roomId,
        answer
      });

    });

    socket.on("answer", async (answer) => {

      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(answer)
      );

    });

    socket.on("ice-candidate", async (candidate) => {

      try {
        await peerConnection.current.addIceCandidate(candidate);
      } catch (error) {
        console.log(error);
      }

    });

  };

  const callUser = async () => {

    const offer = await peerConnection.current.createOffer();

    await peerConnection.current.setLocalDescription(offer);

    socket.emit("offer", {
      roomId,
      offer
    });

  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Telemedicine Video Consultation</h1>

      <button onClick={callUser}>
        Start Call
      </button>

      <div style={{
        display: "flex",
        gap: "20px",
        marginTop: "20px"
      }}>

        <video
          ref={localVideo}
          autoPlay
          playsInline
          muted
          width="300"
        />

        <video
          ref={remoteVideo}
          autoPlay
          playsInline
          width="300"
        />

      </div>

    </div>
  );
};

export default VideoConsultation;