import { useEffect, useCallback } from 'react';

type ShortcutAction = () => void;

interface ShortcutMap {
	[key: string]: ShortcutAction;
}

export function useKeyboardShortcut(shortcutMap: ShortcutMap) {
	const handleKeyPress = useCallback(
		(event: KeyboardEvent) => {
			const { key, ctrlKey, shiftKey, metaKey } = event;

			let shortcutKey = '';
			if (ctrlKey) shortcutKey += 'Ctrl+';
			if (shiftKey) shortcutKey += 'Shift+';
			if (metaKey) shortcutKey += 'Cmd+';
			shortcutKey += key.toUpperCase();

			const action = shortcutMap[shortcutKey];
			if (action) {
				event.preventDefault();
				action();
			}
		},
		[shortcutMap],
	);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [handleKeyPress]);
}
