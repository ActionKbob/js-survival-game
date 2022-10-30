// Google WebRTC ice server configuration
export const ICE_SERVER_CONFIG = {
	iceServers: [
		{
			urls: "stun:stun.l.google.com:19302"
		},
		{
			urls: 'turn:numb.viagenie.ca',
			credential: 'muazkh',
			username: 'webrtc@live.com'
		},
	]
};