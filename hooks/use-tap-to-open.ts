import { PointerEvent, useRef } from 'react';

/**
 * Radix DropdownMenu opens its trigger on `pointerdown`, so on touch screens a
 * finger that merely starts a scroll gesture on the trigger opens the menu
 * (and the menu's scroll lock then kills the scroll).
 *
 * Spread the returned handlers onto a controlled <DropdownMenuTrigger>:
 * for touch/pen the menu opens on `click` instead — the browser does not fire
 * `click` when the gesture turns into a scroll. Mouse and keyboard keep the
 * default Radix behaviour.
 */
export const useTapToOpen = (isOpen: boolean, setOpen: (open: boolean) => void) => {
  const isTouch = useRef(false);
  const wasOpen = useRef(false);

  return {
    onPointerDown: (e: PointerEvent<HTMLElement>) => {
      isTouch.current = e.pointerType !== 'mouse';
      wasOpen.current = isOpen;
      // A prevented pointerdown makes Radix skip its own open/toggle handler.
      if (isTouch.current) e.preventDefault();
    },
    onClick: () => {
      // If the menu was already open, the tap outside its content has just
      // closed it — don't reopen it.
      if (isTouch.current && !wasOpen.current) setOpen(true);
      isTouch.current = false;
    },
  };
};
