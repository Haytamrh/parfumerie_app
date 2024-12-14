import React, { useEffect, useRef } from "react";
import aquadigio from "../Assets/aquadigio.jpg";

const datas = [
    {
        id: 1,
        nom: 'Davidoff',
        image: require('../Assets/Davidoff-Coolwater.jpg')
    },
    {
        id: 2,
        nom: 'Aqua Di gio',
        image: require('../Assets/aquadi-gio.jpg')
    },
    {
        id: 3,
        nom: 'YSL la nuit de l homme',
        image: require('../Assets/ysl-lanuit-70.jpeg')
    },
    {
        id: 4,
        nom: 'Paco rabanne Invictus',
        image: require('../Assets/invictus-52.jpg')
    },
    {
        id: 5,
        nom: 'Dior sauvage',
        image: require('../Assets/dior-sauvage.jpg')
    }
];

const Section = () => {
    const containerRef = useRef(null);
    const scrollIntervalRef = useRef(null);

    const startScrolling = () => {
        scrollIntervalRef.current = setInterval(() => {
            if (containerRef.current) {
                containerRef.current.scrollLeft += 1;
            }
        }, 20); 
    };

    const stopScrolling = () => {
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
        }
    };

    useEffect(() => {
        startScrolling();
        return () => stopScrolling();
    }, []);

    return (
        <div className="flex flex-col items-center bg-gray-100 ">
            
            
            <img src={aquadigio} alt="aquadigio" className=" bg-gray-100 object-cover w-full h-auto mb-4 
            shadow-md  " />
            <h1 className="text-3xl font-bold mb-4 color-black bg-gray-100">Les plus demandés</h1>
            <div
                ref={containerRef}
                onMouseEnter={stopScrolling}
                onMouseLeave={startScrolling}
                className="overflow-hidden whitespace-nowrap  "
            >
                {datas.map(data => (
                    <div
                        key={data.id}
                        className=" bg-gray-100 inline-block mx-2 transition-transform  duration-300 hover:scale-105"
                    >
                        <img src={data.image} alt={data.nom} className="w-80
                         h-auto rounded-lg  " />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Section