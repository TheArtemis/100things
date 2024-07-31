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

    const handleNext = () => {
        let newIndex = Math.min(currentThing.number + 1, unlockedCards.length - 1);
        setCurrentThing({number: newIndex, sentence: unlockedCards[newIndex]});
        console.log("click");
    };

    console.log("Current: " + currentThing.number);
    console.log("Current number: " + currentThing.sentence);

    return (
        <div className='card-container'>
            <Arrow direction="up" onClick={handlePrevious}/>
            <Card number={currentThing.number + 1} thing={currentThing.sentence} />
            <Arrow direction="down" onClick={handleNext}/>
        </div>
    );
}

export default Cards;