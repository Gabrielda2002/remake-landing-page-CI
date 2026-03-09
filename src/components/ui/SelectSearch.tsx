import React, { useState, useRef, useEffect } from 'react';

export interface SelectOption {
    value: string | number;
    label: string;
}

// Omitimos las propiedades que manejamos de forma personalizada para evitar conflictos
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

  // Props HTML nativas
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
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filtrar opciones basado en la búsqueda
  const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtener la etiqueta de la opción seleccionada
  const selectedOption = options.find((option) => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : '';

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll automático al elemento resaltado
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
        if (isOpen && highlightedIndex >= 0) {
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

  const handleSelectOption = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div
      className={`flex flex-col ${className}`}
      ref={containerRef}
      // Aplicamos atributos HTML adicionales al contenedor (data-*, aria-*, etc.)
      {...(restHtmlAttributes as React.HTMLAttributes<HTMLDivElement>)}
    >
      {label && (
        <label htmlFor={id} className="text-[rgb(0,179,160)] mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
      {/* Input oculto para mantener compatibilidad con formularios HTML nativos */}
        <input
          type="hidden"
          id={id}
          name={name}
          value={value}
        />

        {/* Input principal para interacción */}
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
                {/* Botón limpiar */}
                {value && !disabled && (
                  <button
                      type="button"
                      onClick={handleClear}
                      className="text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                  </button>
                )}

                {/* Flecha */}
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''
                      }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
          </div>

          {/* Dropdown */}
          {isOpen && (
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
                          ${highlightedIndex === index
                            ? 'bg-[rgb(0,179,160)] bg-opacity-10'
                            : ''
                        }
                          ${option.value === value ? 'bg-gray-100 font-medium' : ''}
                          hover:bg-[rgb(0,179,160)] hover:bg-opacity-20
                        `}
                          onClick={() => handleSelectOption(option.value)}
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
            )}
        </div>

        {/* Error message */}
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};
