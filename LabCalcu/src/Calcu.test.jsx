import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('Calculator App', () => {
    it('Suma 1 + 2 para obtener 3', () => {
        const { getByLabelText, container } = render(<App />);
        fireEvent.click(getByLabelText('1'));
        fireEvent.click(getByLabelText('add'));
        fireEvent.click(getByLabelText('2'));
        fireEvent.click(getByLabelText('equals'));
        const display = container.querySelector('.display');
        expect(display.textContent).toBe('3');
    });
      

    it('Maneja operaciones encadenadas correctamente (2 + 3) * 4', () => {
        const { getByLabelText, container } = render(<App />);
        fireEvent.click(getByLabelText('2'));
        fireEvent.click(getByLabelText('add'));
        fireEvent.click(getByLabelText('3'));
        fireEvent.click(getByLabelText('multiply'));
        fireEvent.click(getByLabelText('4'));
        fireEvent.click(getByLabelText('equals'));
        const display = container.querySelector('.display');
        expect(display.textContent).toBe('20');
      });
      

      it('Invierte el signo de la entrada correctamente', () => {
        const { getByLabelText, container } = render(<App />);
        fireEvent.click(getByLabelText('9'));
        fireEvent.click(getByLabelText('toggle sign'));
        const display = container.querySelector('.display');
        expect(display.textContent).toBe('-9');
      });
      
      it('Calcula porcentajes correctamente convirtiendo 50 a 0.5', () => {
        const { getByLabelText, container } = render(<App />);
        fireEvent.click(getByLabelText('5'));
        fireEvent.click(getByLabelText('0'));
        fireEvent.click(getByLabelText('percentage'));
        const display = container.querySelector('.display');
        expect(display.textContent).toBe('0.5');
      });

      it('Limpia todas las entradas y operaciones', () => {
        const { getByLabelText, container } = render(<App />);
        fireEvent.click(getByLabelText('9'));
        fireEvent.click(getByLabelText('add'));
        fireEvent.click(getByLabelText('1'));
        fireEvent.click(getByLabelText('equals'));
        fireEvent.click(getByLabelText('clear'));
        const display = container.querySelector('.display');
        expect(display.textContent).toBe('0');
      });
      
      
  

});
