import React , {Component,Fragment, useState} from 'react';
import '../css/storeshoes.css'
import Card from '../Card'
import Top from '../Top'
import $ from 'jquery'
import Bot from '../Bottom'
import axios from 'axios';

import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage,ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA-I9UUk6wLzqPtb-YIy1Jqh1_cvVRIK58",
    authDomain: "shoes-b9857.firebaseapp.com",
    projectId: "shoes-b9857",
    storageBucket: "shoes-b9857.appspot.com",
    messagingSenderId: "1010851631188",
    appId: "1:1010851631188:web:cdefa38af9041c2ff11dc1",
    measurementId: "G-7YEP8CD91L"
  };

const ShoeForm = () => {
    // State variables to store input values
    const [shoeName, setShoeName] = useState('');
    const [shoePicture, setShoePicture] = useState('');
    const [shoeDescription,setShoeDescription] = useState('');
    const [shoeSizes , setshoesizes] = useState([])
    const [shoesType,setShoeType] = useState("AJ1");
    // Function to handle form submission
    const collectionSizes=(e)=>{
        const data = e.target.value;
        // setshoesizes(data.split(","));
        const SizePrice = data.split(",")
        function asyncOperation(strings){
            return new Promise( (res,rej)=>{
                try {
                    const jsonArray = strings.map((str) => {
                      const [size, price] = str.split(':');
                      return { size, price };
                    });
              
                    res(jsonArray);
                  } catch (error) {
                    rej(error);
                  }
            })
        }
        asyncOperation(SizePrice)
        .then((jsonArray)=>{
            setshoesizes(jsonArray);
        }).catch((error)=>{
            console.error(error);
        })
    }
    const handleShoeType=(e)=>{
        setShoeType(e.target.value);
    }
    const handleShoeName=(e)=>{
        setShoeName(e.target.value);
    }
    const handleShoeDescription=(e)=>{
        setShoeDescription(e.target.value);
    }

    const handleImage = e =>{
        if(e.target.files[0]){
            setShoePicture(e.target.files[0]);
        }
    }
    function getCurrentDateTime() {
        const now = new Date();
      
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const date = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
      
        const formattedDateTime = `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`;
        return formattedDateTime;
      }
    const handleSubmit = async(e) => {
      e.preventDefault();
        const data = sessionStorage.getItem("userdata")
        const ParseData = JSON.parse(data);

        const firebaseApp = initializeApp(firebaseConfig);
        // Get Firebase Storage instance
        const storage = getStorage(firebaseApp); 
        const storageRef = ref(storage, shoeName);
        
      // You can perform actions with the input values here, e.g., send to a server
        try{
            
            await uploadBytes(storageRef,shoePicture).then((snapshot)=>{
                console.log("snapshot"+snapshot)
                getDownloadURL(storageRef).then((url)=>{
                    axios.post("http://127.0.0.1:8085/storeShoes",{shoename:shoeName,
                                                            shoeDescription:shoeDescription,
                                                            sizes:shoeSizes,
                                                            shoetype:shoesType,
                                                            time:getCurrentDateTime(),
                                                            imgurl:url,
                                                            poster:ParseData["_id"]})
                        .then(response=>{
                            console.log(response);
                        }).catch((err)=>{
                            console.log(err);
                        })
                }).catch((error)=>{
                    console.error("error getting downloaded file")
                })
                
            })
            
        }catch(err){    
            console.log(err);
        }
      // Reset form after submission
      setShoeName('');
      setShoePicture('');
      setShoeDescription('')
    };
  
    return (
        <Fragment>
            <Top/>
            
            <div id ="storeForm">
                <form  id = "storeForm">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Shoe Name</label>
                        <input type="email" onChange={handleShoeName} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name"/>
                    </div>

                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Description</label>
                        <textarea class="form-control" onChange={handleShoeDescription} id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Enter Sizes</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1"  onChange={collectionSizes}></textarea>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Example select</label>
                        <select class="form-control" id="exampleFormControlSelect1" onChange={handleShoeType}>
                        <option>AJ1</option>
                        <option>AJ2</option>
                        <option>AJ3</option>
                        <option>AJ4</option>
                        <option>AJ5</option>
                        <option>Nike</option>
                        <option>Adidas</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlFile1">Choose Image</label>
                        <input type="file" class="form-control-file" id="exampleFormControlFile1" onChange={handleImage}/>
                    </div>
                    
                    <div class = "form-group">
                        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
            <Bot/>
      </Fragment>

    );
  };export default ShoeForm;