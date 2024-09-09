import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';

function Meet() {
  const [roomName, setRoomName] = useState('');
  const [identity, setIdentity] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [room, setRoom] = useState(null);
  const [isVideoOn, setIsVideoOn] = useState(false);  // Video state
  const [isAudioOn, setIsAudioOn] = useState(false);  // Audio state
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);

  // Function to create a room
  const createRoom = async () => {
    try {
      const response = await fetch('https://nvdqwpdb-8000.inc1.devtunnels.ms/twilio/create-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resp = await response.json();
      const roomSid = resp.roomSid;
      const generatedLink = `${window.location.origin}/join/${roomSid}`;

      setMeetingLink(generatedLink);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  // Function to join the room
  const joinRoom = async () => {
    try {
      const response = await fetch('https://nvdqwpdb-8000.inc1.devtunnels.ms/twilio/get-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity, roomName }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const resp = await response.json();
      const token = resp.token;
  
      // Connect to the Twilio Video room
      const room = await Video.connect(token, { name: roomName });
      setRoom(room);
  
      // Save the local tracks (video and audio)
      const localParticipant = room.localParticipant;
      const videoTrack = Array.from(localParticipant.videoTracks.values())[0]?.track;
      const audioTrack = Array.from(localParticipant.audioTracks.values())[0]?.track;
  
      setLocalVideoTrack(videoTrack);
      setLocalAudioTrack(audioTrack);

      if(localVideoTrack){
        localVideoTrack.disable();
      }
      if(localAudioTrack){
        localAudioTrack.disable();
      }
  
      // Attach local tracks
      localParticipant.tracks.forEach((publication) => {
        if (publication.track) {
          document.getElementById('local-media').appendChild(publication.track.attach());
        }
      });
  
      // Attach existing participants' tracks when joining the room
      room.participants.forEach((participant) => {
        participant.tracks.forEach((publication) => {
          if (publication.isSubscribed) {
            updateTrackUI(publication.track, participant.sid, publication.track.kind === 'video');
          }
        });
  
        // Listen for any new tracks from existing participants
        participant.on('trackSubscribed', (track) => {
          updateTrackUI(track, participant.sid, track.kind === 'video');
        });
  
        participant.on('trackUnsubscribed', (track) => {
          const remoteMedia = document.getElementById('remote-media');
          remoteMedia.querySelectorAll(`[data-participant-id="${participant.sid}"]`).forEach(trackElement => trackElement.remove());
        });
      });
  
      // Listen for new participants joining
      room.on('participantConnected', (participant) => {
        participant.on('trackSubscribed', (track) => {
          updateTrackUI(track, participant.sid, track.kind === 'video');
        });
  
        participant.on('trackUnsubscribed', (track) => {
          const remoteMedia = document.getElementById('remote-media');
          remoteMedia.querySelectorAll(`[data-participant-id="${participant.sid}"]`).forEach(trackElement => trackElement.remove());
        });
  
        // Attach existing tracks for the participant
        participant.tracks.forEach((publication) => {
          if (publication.track) {
            updateTrackUI(publication.track, participant.sid, publication.track.kind === 'video');
          }
        });
      });
  
      // Handle participants disconnecting
      room.on('participantDisconnected', (participant) => {
        const remoteMedia = document.getElementById('remote-media');
        remoteMedia.querySelectorAll(`[data-participant-id="${participant.sid}"]`).forEach(trackElement => trackElement.remove());
      });
  
      // Helper function to update track UI
      const updateTrackUI = (track, participantId, isVideo) => {
        const trackElement = track.attach();
        const remoteMedia = document.getElementById('remote-media');
  
        if (isVideo) {
          if (track.isEnabled) {
            trackElement.classList.remove('video-off');
            trackElement.classList.add('video-on');
            trackElement.querySelector('.video-off-message')?.remove();
          } else {
            trackElement.classList.add('video-off');
            trackElement.classList.remove('video-on');
            let messageElement = trackElement.querySelector('.video-off-message');
            if (!messageElement) {
              messageElement = document.createElement('div');
              messageElement.className = 'video-off-message';
              messageElement.textContent = 'Video is off';
              trackElement.appendChild(messageElement);
            }
          }
        } else {
          // Handle audio track if needed
        }
  
        trackElement.dataset.participantId = participantId;
        remoteMedia.appendChild(trackElement);
      };
  
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };
  

  // Toggle video on/off
  const toggleVideo = () => {
    if (localVideoTrack) {
      if (isVideoOn) {
        localVideoTrack.disable();
      } else {
        localVideoTrack.enable();
      }
      setIsVideoOn(!isVideoOn);  // Toggle video state
    }
  };

  // Toggle audio on/off
  const toggleAudio = () => {
    if (localAudioTrack) {
      if (isAudioOn) {
        localAudioTrack.disable();
      } else {
        localAudioTrack.enable();
      }
      setIsAudioOn(!isAudioOn);  // Toggle audio state
    }
  };

  // Cleanup: Disconnect room on unmount
  useEffect(() => {
    return () => {
      if (room) {
        room.disconnect();
        console.log('Disconnected from room');
      }
    };
  }, [room]);

  return (
    <div className="container px-72 p-4 text-white">
      <h1 className="text-2xl font-bold mb-4 flex justify-center">Create or Join a Video Room</h1>

      <div className="mb-4">
        <label className="block mb-2">Room Name:</label>
        <input
          type="text"
          className="border border-gray-300 p-2 rounded w-full text-black"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Your Name:</label>
        <input
          type="text"
          className="border border-gray-300 p-2 rounded w-full text-black"
          value={identity}
          onChange={(e) => setIdentity(e.target.value)}
        />
      </div>

      <button
        onClick={createRoom}
        className="bg-blue-500 text-white p-2 rounded mr-4"
      >
        Create Room
      </button>

      <button
        onClick={joinRoom}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Join Room
      </button>

      {meetingLink && (
        <div className="mt-4">
          <p className="text-xl font-bold">Meeting Link:</p>
          <div className="text-blue-400 cursor-pointer" onClick={joinRoom}>{meetingLink}</div>
        </div>
      )}

      {room && (
        <div className="mt-4">
          <button
            onClick={toggleVideo}
            className="bg-green-500 text-white p-2 rounded mr-4"
          >
            {isVideoOn ? 'Turn Video Off' : 'Turn Video On'}
          </button>

          <button
            onClick={toggleAudio}
            className="bg-green-500 text-white p-2 rounded"
          >
            {isAudioOn ? 'Turn Audio Off' : 'Turn Audio On'}
          </button>
        </div>
      )}

      <div id="local-media" className="mt-4"></div>
      <div id="remote-media" className="mt-4 mb-4"></div>
    </div>
  );
}

export default Meet;
