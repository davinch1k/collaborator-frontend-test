import { useState, useLayoutEffect, useRef } from 'react';

export default function Dropdown({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [up, setUp] = useState(false);
  const triggerRef = useRef(null);
  const dropMenuRef = useRef(null);

  useLayoutEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current.getBoundingClientRect();
    const menu = dropMenuRef.current;
    const { height } = menu.getBoundingClientRect();
    const styles = window.getComputedStyle(menu);
    const gap = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);

    const spaceAbove = trigger.top;
    const spaceBelow = window.innerHeight - trigger.bottom;

    setUp(spaceBelow < height + gap && spaceAbove > spaceBelow);
  }, [open]);

  const toggle = () => setOpen((isOpen) => !isOpen);

  const closeAndFocusTrigger = () => {
    setOpen(false);
    triggerRef.current.focus();
  }

  const handleKeyDown = (e) => {
    if(e.key === "Escape" && open) {
      closeAndFocusTrigger();
    }
  }

  return (
    <div className={"dropdown"} onKeyDown={handleKeyDown}>
      <button ref={triggerRef} type="button" onClick={toggle} aria-expanded={open}>
        {value} ▾
      </button>
      {open && (
        <ul ref={dropMenuRef} className={up ? 'dropdown-menu up' : 'dropdown-menu'}>
          {options.map((v) => (
            <li key={v}>
              <button
                className="dropdown-option"
                type="button"
                onClick={() => {
                  onChange(v);
                  closeAndFocusTrigger();
                }}
              >
                {v}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
