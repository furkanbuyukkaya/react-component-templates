import React, { useRef } from "react";

const items = Array.from({ length: 12 }, (_, i) => i + 1); // Example items array

const GridComponent = () => {
  const containerRef = useRef(null);
  const isDown = useRef(false);
  const startY = useRef(0);
  const scrollTop = useRef(0);

  const handleMouseDown = (e) => {
    isDown.current = true;
    startY.current = e.pageY - containerRef.current.offsetTop;
    scrollTop.current = containerRef.current.scrollTop;
    containerRef.current.style.cursor = "grabbing";
    containerRef.current.style.userSelect = "none";
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    containerRef.current.style.cursor = "grab";
    containerRef.current.style.removeProperty("user-select");
  };

  const handleMouseUp = () => {
    isDown.current = false;
    containerRef.current.style.cursor = "grab";
    containerRef.current.style.removeProperty("user-select");
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const y = e.pageY - containerRef.current.offsetTop;
    const walk = (y - startY.current) * 2; // scroll-fast
    containerRef.current.scrollTop = scrollTop.current - walk;
  };

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].pageY - containerRef.current.offsetTop;
    scrollTop.current = containerRef.current.scrollTop;
    containerRef.current.style.userSelect = "none";
  };

  const handleTouchEnd = () => {
    containerRef.current.style.removeProperty("user-select");
  };

  const handleTouchMove = (e) => {
    if (e.touches.length !== 1) return;
    const y = e.touches[0].pageY - containerRef.current.offsetTop;
    const walk = (y - startY.current) * 2; // scroll-fast
    containerRef.current.scrollTop = scrollTop.current - walk;
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        className="flex flex-wrap hide-scroll"
        style={{
          maxHeight: "600px",
          overflowY: "auto",
          width: "100%",
          maxWidth: "600px",
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* Internet Explorer 10+ */,
          cursor: "grab",
        }}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <style>
          {`
            /* Hide scrollbar for Chrome, Safari and Opera */
            .hide-scroll::-webkit-scrollbar {
              display: none;
            }
            /* Hide scrollbar for IE, Edge and Firefox */
            .hide-scroll {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
            }
          `}
        </style>
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-center items-center border border-gray-300"
            style={{
              height: "200px",
              flexBasis: "calc(50% - 16px)",
              margin: "8px",
            }}
          >
            <div className="flex justify-center items-center bg-blue-200 w-full h-full">
              Item {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridComponent;
