import { useState, useEffect } from 'react';

const useCountdownTimer = (handleTimerEnd) => {
    const [availableSecond, setAvailableSecond] = useState(0);

    useEffect(() => {
        let interval;

        if (availableSecond > 0) {
            interval = setInterval(() => {
                setAvailableSecond((prevSecond) => {
                    const nextSecond = prevSecond - 1;
                    if (nextSecond === 0 && handleTimerEnd) {
                        handleTimerEnd();
                    }
                    return nextSecond;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [availableSecond,handleTimerEnd]);

    const initialTimer = (seconds) => {
        setAvailableSecond(seconds);
    };

    return { availableSecond, initialTimer };
};

export default useCountdownTimer;
