import React, { useState, useRef } from 'react';
import { SelectArrow } from './SelectArrow';
import { SelectDropdown } from './SelectDropdown'; 
import type { SelectOption } from '@/types/SelectOption';

export interface SelectSearchProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'value' | 'onChange' | 'onBlur' | 'size'
> {
  options: SelectOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  label?: string;
}

export const SelectSearch: React.FC<SelectSearchProps> = ({
  options,
  value,
  onChange,
  onBlur,
  placeholder = 'Seleccione una opción',
  error,
  label,
  id,
  name,
  required = false,
  disabled = false,
  className = '',
  ...restHtmlAttributes
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filtra opciones según el texto de búsqueda
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Busca la opción cuyo valor coincide con el valor seleccionado
  const selectedOption = options.find((option) => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : '';

  // Manejar teclas de navegación
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelectOption(filteredOptions[highlightedIndex].value);
        } else {
          setIsOpen(true);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
        break;
      case 'Tab':
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
        break;
    }
  };

  // Ejecuta onChange, cierra dropdown, limpia búsqueda y quita foco al seleccionar
  const handleSelectOption = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  // Abre/cierra dropdown al hacer clic y enfoca input si se abre
  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setHighlightedIndex(-1);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }
  };

  // Limpia selección, búsqueda y cierra dropdown sin propagar el evento
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setSearchTerm('');
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  // Cierra dropdown y limpia búsqueda
  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm('');
    setHighlightedIndex(-1);
  };

  return (
    <div
      className={`flex flex-col ${className}`}
      {...(restHtmlAttributes as React.HTMLAttributes<HTMLDivElement>)}
    >
      {label && (
        <label htmlFor={id} className="text-[rgb(0,179,160)] mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input type="hidden" id={id} name={name} value={value} />

        <div
          className={`
            w-full border p-2 border-[rgb(168,182,201)] rounded 
            flex items-center justify-between cursor-pointer
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            ${isOpen ? 'border-[rgb(0,179,160)]' : ''}
            ${error ? 'border-red-500' : ''}
          `}
          onClick={handleInputClick}
        >
          <input
            ref={inputRef}
            type="text"
            value={isOpen ? searchTerm : displayValue}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={`
              flex-1 outline-none bg-transparent
              ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
            autoComplete="off"
            readOnly={!isOpen}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={`${id}-listbox`}
            role="combobox"
          />

          <div className="flex items-center gap-2">
            {value && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <SelectArrow isOpen={isOpen} />
          </div>
        </div>

        <SelectDropdown
          isOpen={isOpen}
          filteredOptions={filteredOptions}
          value={value}
          highlightedIndex={highlightedIndex}
          onSelectOption={handleSelectOption}
          onHighlightChange={setHighlightedIndex}
          onClose={handleClose}
          id={id || 'select'}
          dropdownRef={dropdownRef}
        />
      </div>

      {error && <span className="text-red-500 text-sm mt-1 font-medium">{error}</span>}
    </div>
  );
};