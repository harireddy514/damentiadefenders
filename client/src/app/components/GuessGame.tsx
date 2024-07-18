"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../../../types";

const GuessGame = () => {
  const [imageName, setImageName] = useState("");
  const router = useRouter();
  const [info, setInfo] = useState({
    name: "",
    relation: "",
  });
  const [score, setScore] = useState(0);
  const [myUser,setMyUser]=useState<User | null>(null) ;
  const [index,setIndex]=useState(0);
  useEffect(() => {
    const fetchData = async () => {
    try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const id = user ? user.userId : null;
    console.log(id);
    const response = await fetch("/db.json");
        const data = await response.json();
        console.log(data);
        const userData = data.find((u:any) => {
          if (u["Patient_Details"].userId == id) return u;
        });
        setMyUser(userData);
        console.log(userData);
        const len = userData["FamilyDetails"].length;
        console.log(len);
        setIndex(Math.floor(Math.random() * len));
        const length = userData["FamilyDetails"][index].f_pic.length;
        const ind = Math.floor(Math.random() * length);
        setImageName(userData["FamilyDetails"][index].f_pic[ind]);
        console.log(imageName);
        updateRandomImage(myUser);
      }
      catch(error) { 
      console.error("Error:", error)
      }
    }
    fetchData();
  }, []);
  const updateRandomImage = (userFound:any) => {
    const len = userFound["FamilyDetails"].length;
    const randomIndex = Math.floor(Math.random() * len);
    setIndex(randomIndex); // Save index to state
    const picLength = userFound["FamilyDetails"][randomIndex].f_pic.length;
    const picIndex = Math.floor(Math.random() * picLength);
    setImageName(userFound["FamilyDetails"][randomIndex].f_pic[picIndex]);
    console.log("imageName", userFound["FamilyDetails"][randomIndex].f_pic[picIndex]);
  };
  function onchange(ev:any) {
    const { name, value } = ev.target;
    setInfo({ ...info, [name]: value });
  }
 
  function onclick(ev:any) {
    ev.preventDefault();
    if(myUser) {
    console.log(myUser);
    console.log(info);
    console.log(myUser["FamilyDetails"][index]);
    if(info.name===myUser["FamilyDetails"][index].fname && info.relation===myUser["FamilyDetails"][index].frelation) {
      setScore((prevScore)=>{return prevScore+1; });
      updateRandomImage(myUser);
      router.refresh();
    }
    else {
      alert("Incorrect name or relation. Try again!");
    }
  }
  }
  return (
    <div>
      <h2 className="text-center">Recognize Who??</h2>
      <div>
        <h4 className="text-center">Enter the details of this person:</h4>
        <h4>Score:{score}</h4>
        <div className="flex justify-center items-center">
        <img src={`/static/Images/${imageName}`} alt={imageName} />
        </div>
      </div>
      <form className="text-center">
        <input
          type="text"
          name="name"
          onChange={onchange}
          value={info.name}
          placeholder="Name"
          className="border-black border-2 m-1"
        />
        <br />
        <input
          type="text"
          name="relation"
          onChange={onchange}
          value={info.relation}
          placeholder="Relation"
          className="border-black border-2 m-1"
        />
        <br />
        <button className="btn btn-primary" onClick={onclick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default GuessGame;
