"use client";
import Image from 'next/image';
import styles from './ImageSlider.module.css'
import React, { useEffect, useState } from 'react'
const ImageSlider = () => {
  const images = ["d1.jpg", "d2.jpg", "d3.jpg", "d4.jpg"];
  const [curr, setCurr] = useState(0);
  useEffect(() => {
    const nextIndex = curr < images.length - 1 ? curr + 1 : 0;
    const timer = setTimeout(() => setCurr(nextIndex), 3000);
    return () => clearTimeout(timer);
  }, [curr, images.length])

  return (
    <div>
      <div className='flex align-center w-full' id="slider">
        {images.map((src, index) => (
          <div key={index} style={{ display: index === curr ? 'block' : 'none' }}>
            <img src={`/static/dem_images/${src}`} object-fit='contain' alt={`Slide ${index + 1}`} className={styles.image} />
            {/* <Image src={`./static/images/${src}`} alt={`Slide ${index + 1}`} className={styles.image} height={20} width={100}  /> */}
          </div>
        ))}
      </div>
      <h1 className={styles.quote}>'Holding Hands, Sharing Hearts, Navigating Dementia Together in every Step !!'</h1>
    </div>
  );
}
export default ImageSlider
