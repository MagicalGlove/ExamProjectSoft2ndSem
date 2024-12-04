import { useState } from 'react';
import monster4Image from '../other/monster_4.png';
import monster4CloseUp from '../other/monster_4_CloseUp.png';

const ImageDisplay = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{
                width: '400px',
                height: '300px',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#1a1a1a',
                position: 'relative',
                cursor: 'pointer',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={monster4Image}
                alt="Monster display"
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    opacity: isHovered ? 0 : 1,
                }}
            />
            <img
                src={monster4CloseUp} // Replace with your second image
                alt="Alternate monster display"
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    opacity: isHovered ? 1 : 0,
                }}
            />
        </div>
    );
};

export default ImageDisplay;
