import { useEffect, useState } from "react";


const formatVersion = "1.0.7"

const useLocalStorage = (key: string, defaultValue: any) => {
    const [value, setValue] = useState(() => {
        let restoredValue = localStorage.getItem(key)
        if (restoredValue != null) {
            let version = JSON.parse(restoredValue).version;
            if (version === formatVersion) {
                let restoredParsedValue = JSON.parse(restoredValue);
                return restoredParsedValue;
            }
        }
        return defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify({...value, version: formatVersion}));
    }, [value, key]);
    return [value, setValue];
};

export default useLocalStorage;