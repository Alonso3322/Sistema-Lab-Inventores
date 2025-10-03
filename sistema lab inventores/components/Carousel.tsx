// src/components/Carousel.js
'use client';
import { useState, useEffect, SetStateAction } from 'react';

const carouselImages = [
  'https://icaro.inventores.org/build/assets/images/imagenLab2.jpg',
  'https://imgs.search.brave.com/D_oBGekOST9LL54gNdndb0Pe265ABvGvj9lu6jlhEMM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9kM3Qw/dGJtbGllMjgxZS5j/bG91ZGZyb250Lm5l/dC9pZ2kvdm9yb24v/M0VrNGpSQkhRTVNN/b1BSUi5tZWRpdW0',
  'https://icaro.inventores.org/build/assets/images/_labMedia1.jpg',
  'https://imgs.search.brave.com/vX5xLjUB3YhkLGCPmJi8JwrFYKIKAgp2b4etYvZMkDw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9raW5n/cm9vbi5jb20vY2Ru/L3Nob3AvZmlsZXMv/S0xQMU1BSU4uanBn/P3Y9MTcxNzIzNjky/NiZ3aWR0aD0xOTQ2',
  'https://imgs.search.brave.com/IltnLEx1_pnO7Gokm0PlJM_5Efffjkt-zIBoUt7zoJ4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLmFs/bDNkcC5jb20vd29y/a2Vycy9pbWFnZXMv/Zml0PXNjYWxlLWRv/d24sdz0xMjAwLGg9/NjY3LGdyYXZpdHk9/MC41eDAuNSxmb3Jt/YXQ9YXV0by93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMy8wOS8x/NDE0MDMxOC9jYW1l/cmEtdGltZWxhcHNl/LXNjYWxlZC5qcGc'
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (e: { pageX: number; currentTarget: { offsetLeft: number; scrollLeft: SetStateAction<number>; }; }) => {
    setIsDragging(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: { preventDefault: () => void; pageX: number; currentTarget: { offsetLeft: number; scrollLeft: number; }; }) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 2;
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="py-12 px-5 bg-white">
      <div className="container mx-auto">
        <div 
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-4 py-4"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {carouselImages.map((image, index) => (
            <div 
              key={index}
              className="flex-shrink-0 w-80 h-56 md:w-96 md:h-64 bg-gray-200 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 snap-start"
              style={{ 
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}