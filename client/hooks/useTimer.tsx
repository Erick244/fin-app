"use client";

import { useEffect, useState } from "react";

export function useTimer(initialTime: number, finishTime: number) {
    const [time, setTime] = useState<number>(initialTime);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    const invertTime = initialTime > finishTime ? true : false;

    useEffect(() => {
        const interval = setInterval(() => {
            if (time !== finishTime) {
                invertTime ? decrementTime() : incrementTime();
            } else {
                setIsCompleted(true);
                clearInterval(interval);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [time]);

    const incrementTime = () => {
        setTime(time + 1);
    };

    const decrementTime = () => {
        setTime(time - 1);
    };

    function resetTimer() {
        setTime(initialTime);
        setIsCompleted(false);
    }

    return {
        time,
        isCompleted,
        resetTimer,
    };
}
