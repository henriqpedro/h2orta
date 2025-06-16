import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

export function useScreenReaderEnabled() {
    const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);

    useEffect(() => {
        const checkScreenReader = async () => {
            const enabled = await AccessibilityInfo.isScreenReaderEnabled();
            setScreenReaderEnabled(enabled);
        };

        checkScreenReader();

        const listener = AccessibilityInfo.addEventListener(
            'screenReaderChanged',
            (enabled) => setScreenReaderEnabled(enabled)
        );

        return () => listener.remove();
    }, []);

    return screenReaderEnabled;
}