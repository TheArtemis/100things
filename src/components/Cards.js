import '../styles/card-container.css';
import Arrow from './Arrow';
import Card from './Card';
import { useState, useEffect, useCallback } from 'react';

function Cards({ startDate, things }) {
    const [unlockedCards, setUnlockedCards] = useState([]);
    const [currentThing, setCurrentThing] = useState({ number: null, sentence: null });    

    // Memoize functions to avoid re-creating them on every render
    const getThingForToday = useCallback((startDate, things) => {
        const today = new Date();
        const diffTime = Math.abs(today - new Date(startDate));
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        return (diffDays < things.length) ? things[diffDays] : null;
    }, []);

    const getNumberForToday = useCallback((startDate, things) => {
        const today = new Date();
        const diffTime = Math.abs(today - new Date(startDate));
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        return (diffDays < things.length) ? (diffDays) : null;
    }, []);

    // Effect to update unlockedCards
    useEffect(() => {
        const today = new Date();
        const diffTime = Math.abs(today - new Date(startDate));
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const unlockedThings = things.slice(0, diffDays + 1);
        
        setUnlockedCards(unlockedThings);

        console.log(things);
        console.log(unlockedThings);

    }, [startDate, things]);

    // Effect to update currentThing
    useEffect(() => {
        if (unlockedCards.length > 0) {
            const newNumber = getNumberForToday(startDate, unlockedCards);
            const newSentence = getThingForToday(startDate, unlockedCards);
            setCurrentThing({
                number: newNumber,
                sentence: newSentence
            });
        }
    }, [unlockedCards, startDate, getNumberForToday, getThingForToday]);

    const handlePrevious = () => {
        let newIndex = Math.max(currentThing.number - 1, 0);
        setCurrentThing({number: newIndex, sentence: unlockedCards[newIndex]});
        console.log(currentThing);
    };
     // 6   6 items
    const handleNext = () => {
        let desiredIndex = currentThing.number + 1;
        let lastIndex = unlockedCards.length - 1;
        let newIndex = 0        

        if (desiredIndex === lastIndex + 1) {            
            setCurrentThing({number: desiredIndex, sentence: "..."});
            return;
        }
        
        if (desiredIndex > lastIndex + 1)
            return;
        
        newIndex = Math.min(currentThing.number + 1, unlockedCards.length - 1);
        setCurrentThing({number: newIndex, sentence: unlockedCards[newIndex]});
        console.log("click");
    };

    const calculateTimeLeft = () => {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setHours(24, 0, 0, 0);
        const timeLeft = tomorrow - now.getTime();
        let time = {};
        if (timeLeft > 0) {
            time = {
                days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
                hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
            };
        } else {
            time = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        return time;
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        console.log(timeLeft);

        return () => clearInterval(timer);
    }, []);

    /* console.log("Current: " + currentThing.number);
    console.log("Current number: " + currentThing.sentence); */
    /* Comment! */

    return (
        <div className='card-container'>
            <Arrow direction="up" onClick={handlePrevious}/>
            <Card number={currentThing.number + 1} thing={currentThing.number === unlockedCards.length ? formatCountdown(timeLeft) : currentThing.sentence} />
            <Arrow direction="down" onClick={handleNext}/>
        </div>
    );
}

const formatCountdown = (time) => {
        const format = (num) => (num < 10 ? `0${num}` : num);
        return `The next thing will be revealed in: ${format(time.days)}:${format(time.hours)}:${format(time.minutes)}:${format(time.seconds)}`;
    };

export default Cards;