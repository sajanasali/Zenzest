import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeerServiceService {
peer!:RTCPeerConnection;
  constructor() { 
debugger;
    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    })
  }
  // async setLocalDescription(ans:any){
  //   if(this.peer){
  //     console.log(399,ans);
      
  //     try{
  //       console.log("remote des started");
  //       await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
  //       console.log("remote des success");
        
  //       }catch(error){
  //         console.log('errro in setting remotedes',error);
          
  //     }
  //   }else{
  //     console.log("peer connection not available");
      
  //   }
  // }

  
  async setLocalDescription(ans: RTCSessionDescriptionInit) {
    if (this.peer) {
        try {
            console.log("Setting remote description with:", ans);
            const remoteDescription = new RTCSessionDescription(ans);
            await this.peer.setRemoteDescription(remoteDescription);
            console.log("Remote description set successfully.");
        } catch (error) {
            console.error("Error in setting remote description:", error);
        }
    } else {
        console.log("Peer connection not available.");
    }
}



//get offer
  async getOffer(): Promise<RTCSessionDescriptionInit | undefined> {
    if (this.peer) {
      try {
        const offer = await this.peer.createOffer();
        console.log(offer,"offerrrrrrrrrrrrrrrrrrrrrr")
        console.log("inside the peeerrrrr")
        await this.peer.setLocalDescription(new RTCSessionDescription(offer));
        return offer;
      } catch (error) {
        console.error('Error creating offer:', error);
        return undefined;
      }
    }

    return undefined;
}



//Get answer
// async getAnswer(offer:any):Promise<RTCSessionDescriptionInit | undefined>{
//   if(this.peer){
//     const pcState = this.peer.connectionState;
//     console.log(pcState,"pcstateeeeeeeeeee")
//     console.log("inside the peer getanswer")
//       await this.peer.setRemoteDescription(offer)
//       console.log("inside getanswer 11111111111")
//       const ans = await this.peer.createAnswer()
//       console.log(ans,"answerrrrrrrrrrrr")
//       await this.peer.setLocalDescription(new RTCSessionDescription(ans));
//       return ans;
//    }else{
//     return undefined;
//    }
// }

async getAnswer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit | undefined> {
  if (this.peer) {
    debugger;
      console.log("Current peer connection state:", this.peer.connectionState);

      try {
          await this.peer.setRemoteDescription(offer);
          console.log("Remote description set successfully.");

          const answer = await this.peer.createAnswer();
          console.log("Created answer:", answer);

          await this.peer.setLocalDescription(answer);
          console.log("Local description set successfully.");

          return answer;
      } catch (error) {
          console.error("Error in getAnswer:", error);
          return undefined;
      }
  } else {
      console.error("Peer connection is not initialized.");
      return undefined;
  }
}






}

