import React, { useState,useEffect } from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { User } from "../../../types";
const PhotoAlbum = () => {
  const [myUser, setMyUser] = useState<User>();
  const [itemData, setItemData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        const id = user ? user.userId : null;
        console.log(id);
        const response = await fetch("/db.json");
        const data = await response.json();
        console.log(data);
        const userData = data.find((u:User) => {
          if (u["Patient_Details"].userId == id) return u;
        });
        setMyUser(userData);
        console.log(myUser);
        const len = userData["FamilyDetails"].length;
        console.log(len);

        const length = userData["Patient_Details"].p_pic.length;
        console.log(length);
        const flength = userData["FamilyDetails"].length;
        console.log(flength);
        let j = 0;
        while (j < 3 && j < length) {
          const item = { img: userData["Patient_Details"].p_pic[j] };
          console.log(item);
          setItemData(prevItemData => [...prevItemData, item]);
          j++;
        }
        console.log(itemData);
        for(let i=0;i<flength;i++) {
          const len=userData["FamilyDetails"][i].f_pic.length;
          let j=0;
          while(j<3 && j<len) {
            const item={img:userData["Patient_Details"].p_pic[j]};
            console.log(item);
            setItemData(prev => [...prev,item]);
            j++;
          }
        }
        console.log(itemData);
      }
      catch(err) {
        console.error("Error:",err);
      }
    }
    fetchData();
  },[]);
  function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
      src: `/static/Images/${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  return (
    <div>
      <ImageList
      sx={{ width: 500, height: 450 }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    </div>
  )
}

export default PhotoAlbum
