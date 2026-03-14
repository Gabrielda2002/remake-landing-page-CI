import React, { useRef, useEffect } from 'react';
import type { SelectOption } from '@/types/SelectOption';

interface SelectDropdownProps {
  isOpen: boolean;
  filteredOptions: SelectOption[];
  value: string | number;
  highlightedIndex: number;
  onSelectOption: (value: string | number) => void;
  onHighlightChange: (index: number) => void;
  onClose: () => void;
  id: string | number;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  isOpen,
  filteredOptions,
  value,
  highlightedIndex,
  onSelectOption,
  onHighlightChange,
  onClose,
  id,
  dropdownRef
}) => {
  // Referencia al contenedor principal para detectar clicks fuera
  const containerRef = useRef<HTMLDivElement>(null);

  // Cierra el dropdown cuando se hace click fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
        onHighlightChange(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, onHighlightChange]);

  //scroll automático para mostrar la opción resaltada se ejecuta cuando cambia highlightedIndex
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
  }, [highlightedIndex, dropdownRef]);

  if (!isOpen) return null;

  return (
    <div ref={containerRef} className="relative">
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
                onHighlightChange(-1);
              }}
              onMouseEnter={() => onHighlightChange(index)}
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