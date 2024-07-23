import { Component, ElementRef, ViewChild } from '@angular/core';
import { SocketServiceService } from 'src/app/services/SocketService/socket-service.service';
import { PeerServiceService } from 'src/app/services/peerervice/peer-service.service';
import { ActivatedRoute,Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import Swal from 'sweetalert2';


const mediaConstraints = {
  audio: true,
  //video: true
  video: {
    width: 720,
    height: 540,
  }
};
@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.css']
})


export class VideocallComponent {

  remoteSocketId!: string;

  myStream!: MediaStream;
  remoteStream!: MediaStream;
  @ViewChild('myVideo') myVideo!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;
  myVideoActive: boolean = false;
  callActive: boolean = false;
  muted: boolean = true;
  accepted: boolean = false;
  value!: string | null;
  appId!:string;
  myPeerConnection!: RTCPeerConnection | null;

  constructor(
    private route: ActivatedRoute,
    private socketService:SocketServiceService,
    private peerService:PeerServiceService,
    private router:Router,
    private doctorService:DoctorService

  ){}
  


  ngOnInit(): void {
debugger;
    this.value = history.state.value;
    this.appId = history.state.appointmentId;
    console.log('value is :', this.value,this.appId,33333333333333333);
    this.socketService.onUserJoined().subscribe((data) => {
      console.log(100000000000000000000)
      this.remoteSocketId = data;
      
      console.log('remote id is:  ', this.remoteSocketId,"idddddddddddddddddddddddddddd");
    });

    this.socketService.onIncomingCall().subscribe(async (data) => {
      const { from, offer } = data;
      console.log(data,5555555555555)
      this.remoteSocketId = from;
      console.log(this.remoteSocketId,'Idddddddddddddddddddddddonincoming calll')
     
      console.log('Incoming call from', from, 'and offer ', offer);

      // const ans = await this.peerService.getAnswer(offer);
      // console.log("ok answer is",ans);
      
      // this.socketService.emitCallAccepted({ to: from, ans: ans });

      try {
        const ans = await this.peerService.getAnswer(offer);
        console.log("Generated answer:", ans);

        // Send the answer back to the caller
        this.socketService.emitCallAccepted({ to: from, ans: ans });
    } catch (error) {
        console.error("Error in handling incoming call:", error);
        // Handle error gracefully
    }
    })
     // Listening acceptance
    this.socketService.listenCallAccepted().subscribe(async (data) => {
      const { from, ans } = data;
      console.log(6333,data.ans);
      this.peerService.setLocalDescription(data.ans);
      console.log("call accepted!!!");
      this.sendStreams();
    })
 // Set remote stream
    this.peerService.peer.addEventListener('track',async (ev)=>{
      console.log('GOT TRACKSS!!!');
      
       this.remoteStream = ev.streams[0] ; // ev.streams
       this.remoteVideo.nativeElement.srcObject = this.remoteStream;
    })

    this.peerService.peer.addEventListener('negotiationneeded',async ()=>{
      const offer = await this.peerService.getOffer();
      this.socketService.emitNegoNeeded({offer,to:this.remoteSocketId});
    })

    this.socketService.listenToNegoNeeded().subscribe(async (data)=>{
      const {from,offer} = data;
      console.log(83,from,offer);
      const ans = await this.peerService.getAnswer(offer);
      this.socketService.emitNegoDone({to:from,ans})
      
    })

    this.socketService.listenToNegoFinal().subscribe(async (data)=>{
      const {from,ans} = data;
      await this.peerService.setLocalDescription(ans)
    })

    // this.socketService.listenDisconnect().subscribe(() => {
    //   console.log();
      
    //   this.afterDisconnect();
    // });
  }
  ngAfterViewInit(): void {
    this.requestMediaDevices();
    if (!this.myVideoActive) {
      this.startLocalVideo();
    }
  }

  private async requestMediaDevices(): Promise<void> {
    try {
      this.myStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
      this.myVideo.nativeElement.srcObject = this.myStream;
      this.pauseLocalVideo(); // pause all tracks
  
      console.log('Media stream acquired successfully');
    } catch (e: any) {
      console.error('getUserMedia() error:', e, e.message,"helloooooo");
      
      if (e.name === 'NotAllowedError') {
        alert('Permission to access camera/microphone denied.');
      } else if (e.name === 'NotReadableError' || e.name === 'OverconstrainedError') {
        alert('Error accessing camera/microphone. Please check device availability.');
      } else {
        alert(`getUserMedia() error: ${e.name}`);
      }
    }
  }

  
  pauseLocalVideo(): void {
    if (this.myStream) {
      this.myStream.getTracks().forEach(track => {
        track.enabled = false;
      });
      this.myVideo.nativeElement.srcObject = undefined;

      this.myVideoActive = false;
    }
  }
  startLocalVideo(): void {
    console.log('starting local stream');
    if (this.myStream) {
      console.log("checking stream")
      this.myStream.getTracks().forEach(track => {
        track.enabled = true;
      });
      this.myVideo.nativeElement.srcObject = this.myStream;

      this.myVideoActive = true;
    }
  }
  async handleCallUser() {
    try {
      console.log("handlecalluser")
      const offer = await this.peerService.getOffer();
      this.socketService.emitUserCall({ to: this.remoteSocketId, offer: offer });
      console.log('Call offer sent successfully');
    } catch (error) {
      console.error('Error handling call:', error);
    }
  }


ngOnDestroy(): void {
  // Release the media stream tracks
  if (this.myStream) {
    this.myStream.getTracks().forEach(track => track.stop());
  }
}

 handleMute() {
    this.muted = !this.muted;
  }

  disConnectCall():void{
    this.peerService.peer.close();
    this.myStream.getTracks().forEach(track => track.stop());
    this.myVideo.nativeElement.srcObject = null;
    this.remoteVideo.nativeElement.srcObject = null;
    this.accepted = false;
    this.callActive = false;
   // Emit a disconnect event to notify the other party
    this.socketService.emitDisconnect({ to: this.remoteSocketId });
    this.afterDisconnect();
  }

  afterDisconnect(){
    console.log('after disconnection');
    
    Swal.fire('Call Disconnected','Close');
    if(this.value === 'user'){
      this.router.navigateByUrl('dashboard/appointmentDetails');
      Swal.fire('Appointment Completed','Close');
      }else if(this.value === 'doctor'){
      this.router.navigateByUrl('doctor/dashboard/appointment');
      console.log('appointmnt id is',this.appId);
      this.doctorService.endAppointment(this.appId).subscribe({
        next:(res)=>{
          console.log(res,"response from endpoint")
          Swal.fire('Appointment Completed','Close');
  
        },error:(err)=>{
          Swal.fire('error updating appointment',err);

        }
      })
    }
    }

  sendStreams(): void {
    this.accepted = true;
    for(const track of this.myStream.getTracks()){
      this.peerService.peer.addTrack(track,this.myStream);
    }
  }
}
