import React, { useEffect, useState, useRef } from 'react';
import Spin from './spin.svg';
import './index.css';
import { setLogin, setUpdate, setLogout} from '../../Redux/index';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from "axios";


let socket = io.connect("https://server-e79y.onrender.com/");


const Home2 = () => {
    const divReferenced6 = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setloader] = useState(true);
    const [participantsNumber, setparticipantsNumber] = useState(0);
    const [message, setmessage] = useState("");
    const [allMessage, setallMessage] = useState(null);
    const user = useSelector((state)=>state.user);
    const token = useSelector((state)=>state.token);
    const [counter,setCounter ] = useState(0);
    const [IsOnlineClicked, setIsOnlineClicked] = useState(false);
    const [isProfileClicked, setisProfileClicked] = useState(false);
    const [nameClicked, setNameClicked] = useState("kaka");
    const [imageClicked, setImgClicked] = useState(false);
    const [modifyProfile, setmodifyProfile] = useState(false);
    
    useEffect(()=>{
        divReferenced6.current?.scrollIntoView();
    },[allMessage]);
    
    function isImageURL(url) {
      return url.startsWith("https://") && (url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".png") || url.endsWith(".gif"));
    }
    
    useEffect(() => {
        socket.on('receive', () => {
          setCounter((prev) => prev + 1); // Increment the counter when 'receive' event is received.
        });
        return () => {
          socket.off('receive');  
        };  
      }, [socket]);
      function getCurrentTimeSpan(date) {
        const currentHours = date.getHours();
        const currentMinutes = date.getMinutes();
        const formattedTime = `${currentHours.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`;
        return <span>{formattedTime}</span>;
      }
      socket.on('OnlineParticipants', (count) => {
        setparticipantsNumber(count-1);
      });
      useEffect(() => {
        socket.on('ReceiveMsg', (data) => {
        setallMessage((prevMessages)=>[...prevMessages, {senderId : data.senderId ,sender : data.sender, message : data.message, picturePath : data.picturePath, fullName : data.fullName, time : data.time}]); 
      });
      return () => {
        socket.off('ReceiveMsg');
      };
    }, [socket]);
    
    useEffect(() => {
        socket.on('connect', () => {
          socket.emit('EnterRoom', {name : user.username, fullName : user.fullName, picturePath : user.picturePath, _id : user._id});
        });
      }, []);

      useEffect(() => {
        const intervalId = setInterval(() => {
          socket.emit('sendNumberOfParticipants', (count) => {
            setparticipantsNumber(count);
          });
        }, 250);
      
        // Cleanup function to clear the interval when the component unmounts
        return () => {
          clearInterval(intervalId);
        };
      }, []);
      const submitMessage = async (e)=>{
        e.preventDefault();
        const currentDate = new Date();
    
        if(message !== "" && token !== null){
          setallMessage((prevMessages)=>[...prevMessages, {sender : user.username, message : message, picturePath : data.picturePath, fullName:user.fullName, time : currentDate}]); 
          const data = {
            message : message, 
            sender : user.username, 
            senderId : user._id, 
            picturePath : user.picturePath, 
            fullName : user.fullName,
            time : currentDate
          }
          socket.emit('SendMsg', data);
          setmessage('');
          await axios.post('https://server-e79y.onrender.com/allroutes/createMessage',{
            sender : user.username, 
            senderId : user._id,
            message : message,
            picturePath : user.picturePath, 
            fullName : user.fullName,
            time : currentDate
          }, {
            headers : {
              Authorization : `Bearer ${token}`
            }
          });
        }
      }
      
      const [IsClickRENDER,setIsClickRENDER] = useState(false);


      useEffect(()=>{
        const x = async()=>{
          setloader(true);
          setallMessage(null);
          setTimeout(async()=>{
            try{
              const resp = await axios.get('https://server-e79y.onrender.com/allroutes/getAllMessages',{
                headers : {
                  Authorization : `Bearer ${token}`
                }
              });
              if(resp.status === 200){
                setallMessage(resp.data);
              }
              else{
                alert('Oops, something went wrong!');
              }
            } 
            catch(e){
            } finally{
              setloader(false);
            }
          }, 500);
        }
      
        x();  
      
      },[IsClickRENDER]);

    const [clickx,setclickx ] = useState(false);
    const [participantsInfos, setParticipantsInfos] = useState([]);


    const [isCurrent, setisCurrent]=  useState(false);


    useEffect(() => {
        setParticipantsInfos([]);
        socket.on('ParticipantsNames', (data) => {
          data.map((user) => {
            const { name, fullName, picturePath } = user;
            setParticipantsInfos((prevParticipants) => [
              ...prevParticipants,
              { name, fullName, picturePath },
            ]);
          });
          if (participantsInfos !== null) {
          }
        });
      
        return () => {
          socket.off('ParticipantsNames');
        };
      }, [socket, clickx]);
  
      


      const handleClickLogout = async()=>{
        try{
          const id = user._id;
          dispatch(
            setLogout()
          );
          //changement de isCOnnected 
          await axios.get(`https://server-e79y.onrender.com/allroutes/logout/${id}`, {
            headers : {
              Authorization : `Bearer ${token}`
            }
          });
          //simple navigation 
          
        }
        catch(e){
        }
    }



    const handleClickSeeParticipants =  ()=>{
        setIsOnlineClicked(true);
        if(participantsNumber > 0){
        socket.emit("showMeParticipants");setclickx(!clickx);setTimeout(()=>{setclickx(!clickx)},50);
       }
      }

      const [isLoading, setIsLoading] = useState(false);
      const [dataUserClicked, setdataUserClicked] = useState(null);

      const [newUrl, setNewUrl] = useState('');
      const [newFullName, setNewFullName] = useState('');
      const [newEmail, setNewEmail] = useState('');


      const [Error1, setError1] = useState(false);
      const [Error2, setError2] = useState(false);
      const [LoaderOfUpdate, setLoaderOfUpdate] = useState(false);
      const [success, setsuccess] = useState(false);

      const updateInfos = async()=>{
        setLoaderOfUpdate(true);
        if(newUrl !== "" && newFullName !== "" && newEmail !== ""){
          try{
            const resp = await axios.post(`https://server-e79y.onrender.com/updateInfos`, {
              id : user._id,
              fullName : newFullName, 
              username : newEmail, 
              picturePath : newUrl
            });
            if(resp.status === 200){
              setdataUserClicked(null);
              setdataUserClicked(resp.data);
              setsuccess(!success);
              setmodifyProfile(!modifyProfile);
            }
            else{
              setError2(true);
            }
          }
          catch(e){
            console.log(e.message);
            setError2(true);
          } finally{
            setLoaderOfUpdate(false);
          }
        }
        else{
          setError1(true);
        }
      }

    const fetchUserInformations = async (senderId)=>{
      setdataUserClicked(null);
      try{
        setIsLoading(true);
        const resp = await axios.get(`https://server-e79y.onrender.com/getInformationOfUser/${senderId}`);
        if(resp.status === 200){
          setdataUserClicked(resp.data);
          setNewUrl(resp.data.picturePath);
          setNewFullName(resp.data.fullName);
          setNewEmail(resp.data.username);
          console.log(resp.data);
        }
        else{
          setdataUserClicked(null);
          console.log(resp.data);
        }
      }
      catch(e){
        console.log(e.message);
        setdataUserClicked(null);
      } finally{
        setIsLoading(false);
      }
    }

    useEffect(()=>{
      fetchUserInformations(user._id);
    }, [success]);

    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
          // Update state to hide the popup
          setImgClicked(false);
        }
      };
  
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, []);


    const [AllUsersClicked, setAllUsersClicked] = useState(false);

    const [allUsers, setallUsers] = useState(null);
    const [loaderOfAllUsers, setloaderOfAllUsers] = useState(null);
    
      const FETCHALLUSERS = async ()=>{
        setloaderOfAllUsers(true);
        setallUsers(null);
      try{
        const resp = await axios.get(`https://server-e79y.onrender.com/getAllUsers`);
        if(resp.status === 200){
          setallUsers(resp.data);
        }
        else{
          setallUsers(null);
        }
      }
      catch(e){
        console.log(e.message);
        setallUsers(null);
      } finally{
        setloaderOfAllUsers(false);
      }
      }



  return (
    <>
    <div className={IsOnlineClicked ? " IsOnlineClicked showIsOnlineClicked " : " IsOnlineClicked"}>
        <button 
            onClick={()=>{setIsOnlineClicked(false);}}
            className="buttonCLose">
                <i className='fa-solid fa-xmark'></i>
        </button>
        <div className="containerOfTheOnlineUsers">
        
            {participantsInfos ? (
                    <> 
                      {
                        participantsInfos.length !== 0 ?
                        <>
                        {participantsInfos.map((solo, index) => (
                          <div key={index} className="soloorooww zihc">
                            {
                              solo.fullName !== user.fullName &&
                              <div className="onlineVert" />
                            }
                            {solo.fullName !== user.fullName && solo.fullName}
                          </div>
                        ))}
                        </>
                        :
                        <span className='jackijack'>
                          No one is online for the moment...
                        </span>
                      }
                    </>
                  )
                  :
                  <span className='jackijack'>
                  Loading participants list...
                  </span>
            }
        </div>
    </div>

    <div className={AllUsersClicked ? " IsOnlineClicked IsOnlineClickedocdj showIsOnlineClicked " : " IsOnlineClicked IsOnlineClickedocdj"}>
        <button 
            onClick={()=>{setAllUsersClicked(false);}}
            className="buttonCLose">
                <i className='fa-solid fa-xmark'></i>
        </button>
        <div className="containerOfTheOnlineUsers">
        
            {allUsers ? (
                    <> 
                      {
                        allUsers.length !== 0 ?
                        <>
                        <span className='zsjdcn' ><i className="fa-solid fa-lightbulb"></i>&nbsp;&nbsp;To see the user's profile, simply click on the box.</span>
                        <div className='fosdjc'>
                        {allUsers.map((solo, index) => (
                          <div 
                            onClick={()=>{
                              setAllUsersClicked(false);
                              if(solo._id === user._id){
                                setisCurrent(true);
                              }
                              setisProfileClicked(true);
                              fetchUserInformations(solo._id);
                            }}                          
                            key={index} 
                            className="soloorooww solooroowwzfiqdjnks zihc"
                          >
                            <img src={solo.picturePath}  className='zoqdjns' alt="" />
                            {solo.fullName}
                            {user._id === solo._id && <span className='you'>you</span>}
                          </div>
                        ))}
                        </div>
                        </>
                        :
                        <>
                          No one is online for the moment.
                        </>
                      }
                    </>
                  )
                :
                <span className='jackijack'>
                Loading participants list...
                </span>
            }
        </div>
    </div>




    <div className={isProfileClicked ? "IsOnlineClicked2 showIsOnlineClicked2  zjhk" : "IsOnlineClicked2"}>
        {
          !imageClicked && 
          <button 
            onClick={()=>{
                setisCurrent(false);
                setmodifyProfile(false);
                setTimeout(
                  ()=>{
                  setisProfileClicked(false);
                }, 16.7);
                setNameClicked(null);
            }}
            className="buttonCLose">
                <i className='fa-solid fa-xmark'></i>
          </button> 
        }
        <div className="containerOfTheOnlineUsers containerOfTheOnlineUsersjjj">
        
          <span className={imageClicked ? "imgKey showImgKey" : "imgKey"}>
            Click on the image or press the
            <span className='escapeKey'>
              ESC
            </span> key to exit.
          </span>
          
            <div className={imageClicked ? "imgKey2 showimgKey2" : "imgKey2"}>
              <i className='fa-solid fa-lightbulb'></i>&nbsp;&nbsp;Click on the image to toggle it.
            </div>
        {
          isLoading ? 
          <div className='loadingJJJ'>
            Loading...
          </div>
          :
          <>
          {
            (dataUserClicked !== undefined &&dataUserClicked !== null && dataUserClicked !== undefined !== "" ) && 
            <>
              <div className='firstRowOfImage'>
                <img className={!imageClicked ? "odqjnc showodqjnc" : "odqjnc"} onClick={()=>{if(imageClicked === false){setImgClicked(true)}}} src={dataUserClicked.picturePath} alt='userProfilePicture' />
                <img onClick={()=>{setImgClicked(false);}}  className={imageClicked ? " notClicked ShowImgClicked" : "notClicked"} src={dataUserClicked.picturePath} alt='userProfilePicture' />
              </div>
              
              {
                isCurrent ? 

                <>

              {
                !modifyProfile ? 
                <div className="rowsisi rowsisiFullName">
                  {dataUserClicked.fullName}
                </div>
                :
                <div className="rowsisi rowsisiFullName">
                  <input onChange={(e)=>{setError1(false);setError2(false);setNewFullName(e.target.value)}} className='inputOfName' type="text" value={newFullName} placeholder='Full Name'/>
                </div>
              }

              {
                
               modifyProfile &&
                <div className="rowsisi rowsisiFullName">
                  <input  onChange={(e)=>{setError1(false);setError2(false);setNewUrl(e.target.value)}} className='inputOfEmail' type="text" value={newUrl} placeholder='New Image URL'/>
                </div>
              }
              {
                !modifyProfile ? 
                  <div className="rowsisi rowsisiemail">
                    {dataUserClicked.username}
                  </div>
                  :
                  <div className="rowsisi rowsisiemail">
                    <input onChange={(e)=>{setError1(false);setError2(false);setNewEmail(e.target.value)}} type="text"  className='inputOfEmail' value={newEmail} placeholder='Email Address' />
                  </div>
              }
              <div className={Error1 ? "rowsisierorr showrowsisierror" : "rowsisierorr"}>
                Error : Empty fields
              </div>
              <div className={Error2 ? "rowsisierorr showrowsisierror" : "rowsisierorr"}>
                Oops, something went wrong with the server!
              </div>
                </>
                :
                <>
                <div className="rowsisi rowsisiFullName">
                  {dataUserClicked.fullName}
                </div>
                <div className="rowsisi rowsisiemail">
                  {dataUserClicked.username}
                </div>
                </>  
              }



              <div className="rowsisi rowsisizuodqu">
              {
                isCurrent && 
                <>

                {
                  modifyProfile === false ? 
                  <button className='modifyProfile' onClick={()=>{
                    if(modifyProfile === true){
                      updateInfos();
                    }
                    setmodifyProfile(!modifyProfile);
                  }}>
                    Modify Profile
                  </button>
                  :
                  <>
                  
                    <button className='modifyProfile' onClick={()=>{
                      if(modifyProfile === true){
                        setError1(false);
                        setError2(false);
                        updateInfos();
                      }
                    }}>
                      Save Changes
                    </button>
                    <button
                      className='cancelChanges'
                      onClick={()=>{
                        setError1(false);
                        setError2(false);
                        setmodifyProfile(false);
                        fetchUserInformations(user._id);
                      }}
                    >
                      Cancel
                    </button>

                </>
                }
                </>
              }
              </div>
            </>
          }
          </>
        }
        </div>
    </div>


    <div className='Home2'>    
        <div className="containerMessaging">

            <div className="ZeroRow">

                <button title='Refresh' onClick={()=>{setIsClickRENDER(!IsClickRENDER);setAllUsersClicked(false);setIsOnlineClicked(false);setisProfileClicked(false);setAllUsersClicked(false);}} className='logoox'>
                  <svg width="16" height="16" viewBox="0 0 64 64" fill="none"><path d="M39.64 40.83L33.87 56.7a1.99 1.99 0 0 1-3.74 0l-5.77-15.87a2.02 2.02 0 0 0-1.2-1.2L7.3 33.88a1.99 1.99 0 0 1 0-3.74l15.87-5.77a2.02 2.02 0 0 0 1.2-1.2L30.12 7.3a1.99 1.99 0 0 1 3.74 0l5.77 15.87a2.02 2.02 0 0 0 1.2 1.2l15.86 5.76a1.99 1.99 0 0 1 0 3.74l-15.87 5.77a2.02 2.02 0 0 0-1.2 1.2z" fill="#ff4400"></path></svg>
                  Chatify
                </button>

                <button 
                    onClick={
                      ()=>{
                        setloaderOfAllUsers(true);
                        FETCHALLUSERS();
                        setAllUsersClicked(true);
                      }
                    }
                    className='onlineX'
                >
                  All Users
                </button>
                
                <button 
                    onClick={
                      ()=>{
                        setisCurrent(true);
                        setisProfileClicked(true);
                        setIsLoading(true);
                        fetchUserInformations(`${user._id}`);
                      }
                    }
                    className='onlineX onlineXuuuu'
                >
                  My Profile
                </button>
                
                <button 
                    onClick={handleClickSeeParticipants}
                    className='onlineX'
                >
                    <i className='fa-solid fa-eye'></i>&nbsp;&nbsp;Online Users : {participantsNumber}
                </button>
                <button
                    className='logoutX'
                    onClick={handleClickLogout}
                >
                    <i className="fa-solid fa-right-from-bracket"></i>
                </button>

            </div>
            <div className="FirstRow">
            {
            
              loader === true ? (
                
                <div className="jodq">
                  <img src={Spin} alt="Loading..." />&nbsp;Loading conversations...
                </div>
              ) : (
                    <>
                    {allMessage.length !== 0 ? (
                      allMessage.map((msg, index) => {
                        const timeAsDate = new Date(msg.time);
                        return (
                          <div key={index} className={msg.sender === user.username ? 'messageRow UserCurrentMsg' : 'messageRow OtherUserMsg'}>
                            {msg.sender === user.username ? (
                                <div className="messageCon mine">
                                   
                                    <>
                                        {
                                        isImageURL(msg.message) ? 
                                        <img className='imgDansMessage' src={msg.message} alt='imageXyz' />
                                        :
                                        <>
                                          {
                                            msg.message
                                          }
                                        </> 
                                        }
                                    </>
                                    <div className="rowTime">
                                    {
                                        getCurrentTimeSpan(timeAsDate)
                                    }
                                    </div>
                                </div>
                            ) : (
                                <div className="messageCon notmine">
                                    <div
                                      onClick={()=>{
                                        
                                        setisProfileClicked(true);
                                        setIsLoading(true);
                                        fetchUserInformations(`${msg.senderId}`);
                                      }} 
                                      className="rowFullName hahakaa"
                                    >
                                      <>{msg.fullName}</>
                                    </div>
                                    <>
                                    {
                                        isImageURL(msg.message) ? 
                                        <img className='imgDansMessage' src={msg.message} alt='imageXyz' />
                                        :
                                        <>
                                          {
                                            msg.message
                                          }
                                        </>
                                    } 
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    </>
                                    <div className="rowTime">
                                    {
                                        getCurrentTimeSpan(timeAsDate)
                                    }
                                    </div>
                                </div>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="jodq">No message yet</div>
                    )}
                    <div ref={divReferenced6} />
                  </>
                )
            }
                

            </div>
            <form onSubmit={submitMessage} className="SecondeRow">
                <input value={message} onChange={(e) => { setmessage(e.target.value); }} type="text" placeholder="Enter your message..." />
                
                <button
                  className={
                    ((message!== null && message !== "" && message !== " " && message !== "  "))
                    && "addColorHovered"}
                    type='submit'
                >
                    <i className="fa-solid fa-paper-plane"></i>
                </button>
            </form>
        </div>
    </div>
    </>
  )
}
export default Home2;
