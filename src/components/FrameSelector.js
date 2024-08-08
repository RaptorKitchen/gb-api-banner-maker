import React, { useState } from 'react';

const FrameSelector = ({ images, onSelect }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    const handleChange = (event) => {
        const newImage = event.target.value;
        setSelectedImage(newImage);
        onSelect(newImage);
    };

    return (
        <div className="frame-selector">
            <select value={selectedImage} onChange={handleChange}>
                {images.map((image, index) => (
                    <option key={index} value={image}>
                        Frame {index + 1}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FrameSelector;