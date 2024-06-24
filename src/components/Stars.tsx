import { useState } from 'react';

type StarsProps = {
    numberOfStars: number;
    editable?: boolean;
    onRatingChange?: (rating: number) => void;
}

export default function Stars({ numberOfStars, editable = false, onRatingChange }: StarsProps) {
    const [hoverStars, setHoverStars] = useState<number | null>(null);
    const stars = hoverStars !== null ? hoverStars : numberOfStars;

    const handleMouseEnter = (starNumber: number) => {
        if (editable) setHoverStars(starNumber);
    };

    const handleMouseLeave = () => {
        if (editable) setHoverStars(null);
    };

    const handleClick = (starNumber: number) => {
        if (editable && onRatingChange) onRatingChange(starNumber);
    };

    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
                const starNumber = index + 1;
                let className = editable ? 'cursor-pointer' : '';
                className += starNumber <= stars ? ' text-yellow-500' : ' text-gray-400'
                return (
                    <span
                        key={starNumber}
                        className={className}
                        onMouseEnter={() => handleMouseEnter(starNumber)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(starNumber)}
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
}
