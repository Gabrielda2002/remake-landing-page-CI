import React, { useState, useRef, useEffect } from 'react';
import type { SelectOption } from '@/types/SelectOption';

interface SelectDropdownProps {
  isOpen: boolean;
  options: SelectOption[];
  filteredOptions: SelectOption[];
  value: string | number;
  onSelectOption: (value: string | number) => void;
  onClose: () => void;  
  id: string | number;
  children?: React.ReactNode;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  isOpen,
  filteredOptions,
  value,
  onSelectOption,
  onClose,
  id,
  children
}) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
        setHighlightedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Scroll automático
  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const highlightedElement = dropdownRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [highlightedIndex]);

  if (!isOpen) return null;

  return (
    <div ref={containerRef} className="relative">
      {children}
      <div
        ref={dropdownRef}
        id={`${id}-listbox`}
        role="listbox"
        className="absolute z-50 w-full mt-1 bg-white border border-[rgb(168,182,201)] rounded shadow-lg max-h-60 overflow-y-auto"
      >
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option, index) => (
            <div
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={`
                px-3 py-2 cursor-pointer transition-colors
                ${highlightedIndex === index ? 'bg-[rgb(0,179,160)] bg-opacity-10' : ''}
                ${option.value === value ? 'bg-gray-100 font-medium' : ''}
                hover:bg-[rgb(0,179,160)] hover:bg-opacity-20
              `}
              onClick={() => {
                onSelectOption(option.value);
                onClose();
                setHighlightedIndex(-1);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option.label}
            </div>
          ))
        ) : (
          <div className="px-3 py-2 text-gray-500 text-center">
            Sin opciones disponibles
          </div>
        )}
      </div>
    </div>
  );
};