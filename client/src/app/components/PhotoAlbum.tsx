"use client"
import React, { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { User } from "../../../types";

type ItemData = {
  img: string;
  title?: string;
  rows?: number;
  cols?: number;
};

const PhotoAlbum: React.FC = () => {
  const [myUser, setMyUser] = useState<User | null>(null);
  const [itemData, setItemData] = useState<ItemData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        const id = user ? user.userId : null;
        console.log(id);
        const response = await fetch("/db.json");
        const data: User[] = await response.json();
        console.log(data);
        const userData = data.find((u: User) => u.Patient_Details.userId === id);
        setMyUser(userData || null);

        if (userData) {
          console.log(userData);

          const newItems: ItemData[] = [];

          // Adding patient pictures
          userData.Patient_Details.p_pic.slice(0, 3).forEach((pic) => {
            newItems.push({ img: pic, title: userData.Patient_Details.pname });
          });

          // Adding family pictures
          userData.FamilyDetails.forEach((familyMember) => {
            familyMember.f_pic.slice(0, 3).forEach((pic) => {
              newItems.push({ img: pic, title: familyMember.fname });
            });
          });

          setItemData(newItems);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchData();
  }, []);

  function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
      src: `/static/Images/${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `/static/Images/${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Photo Album
      </Typography>
      <ImageList
        sx={{ width: 800, height: 600 }}
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
            <ImageListItemBar
              title={item.title}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default PhotoAlbum;