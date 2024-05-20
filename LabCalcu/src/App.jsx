import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [input, setInput] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [activeKey, setActiveKey] = useState('');

  const handleClick = (value) => {
    setActiveKey(value);
    if (value === '.' && (input === '0' || input === '' || waitingForOperand)) {
      setInput('0.');
      setWaitingForOperand(false);
    } else if (waitingForOperand) {
      setInput(value === '.' ? '0.' : value);
      setWaitingForOperand(false);
    } else {
      if (!(value === '.' && input.includes('.'))) {
        setInput(input === '0' && value !== '.' ? value : input + value);
      }
    }
  };

  const handleOperation = (op) => {
    setActiveKey(op);
    if (input === '0' && op === '-') {
      setInput(op);
    } else {
      const currentValue = parseFloat(input);
      if (previousValue == null) {
        setPreviousValue(currentValue);
      } else if (operator) {
        const newValue = calculate(previousValue, currentValue, operator);
        setInput(String(newValue));
        setPreviousValue(newValue);
      }
      setOperator(op);
      setWaitingForOperand(true);
    }
  };

  const calculate = (prev, current, op) => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '*':
        return prev * current;
      case '/':
        return prev / current;
      default:
        return current;
    }
  };

  const calculateResult = () => {
    setActiveKey('=');
    if (operator && previousValue != null) {
      const currentValue = parseFloat(input);
      const newValue = calculate(previousValue, currentValue, operator);
      setInput(String(newValue));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setActiveKey('AC');
    setInput('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setActiveKey('+/−');
    setInput((parseFloat(input) * -1).toString());
  };

  const percentage = () => {
    setActiveKey('%');
    setInput((parseFloat(input) / 100).toString());
  };

  const handleKeyPress = (event) => {
    const keyMap = {
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
      '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
      '+': '+', '-': '-', '*': '*', '/': '/', '.': '.',
      'Enter': '=', 'Escape': 'AC'
    };
    const key = keyMap[event.key];
    if (key) {
      if (['/', '*', '-', '+', '='].includes(key)) {
        if (key === '=') {
          calculateResult();
        } else {
          handleOperation(key);
        }
      } else {
        handleClick(key);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [input, previousValue, operator, waitingForOperand]);

  return (
    <div className="calculator">
      <div className="display">{input}</div>
      <div className="row">
        <button onClick={clear} aria-label="clear" className={activeKey === 'AC' ? 'button-active' : ''}>AC</button>
        <button onClick={toggleSign} aria-label="toggle sign" className={activeKey === '+/−' ? 'button-active' : ''}>+/-</button>
        <button onClick={percentage} aria-label="percentage" className={activeKey === '%' ? 'button-active' : ''}>%</button>
        <button onClick={() => handleOperation('/')} aria-label="divide" className={`operator ${operator === '/' || activeKey === '/' ? 'button-active' : ''}`}>÷</button>
      </div>
      <div className="row">
        <button onClick={() => handleClick('7')} aria-label="7">7</button>
        <button onClick={() => handleClick('8')} aria-label="8">8</button>
        <button onClick={() => handleClick('9')} aria-label="9">9</button>
        <button onClick={() => handleOperation('*')} aria-label="multiply" className={`operator ${operator === '*' || activeKey === '*' ? 'button-active' : ''}`}>×</button>
      </div>
      <div className="row">
        <button onClick={() => handleClick('4')} aria-label="4">4</button>
        <button onClick={() => handleClick('5')} aria-label="5">5</button>
        <button onClick={() => handleClick('6')} aria-label="6">6</button>
        <button onClick={() => handleOperation('-')} aria-label="subtract" className={`operator ${operator === '-' || activeKey === '-' ? 'button-active' : ''}`}>−</button>
      </div>
      <div className="row">
        <button onClick={() => handleClick('1')} aria-label="1">1</button>
        <button onClick={() => handleClick('2')} aria-label="2">2</button>
        <button onClick={() => handleClick('3')} aria-label="3">3</button>
        <button onClick={() => handleOperation('+')} aria-label="add" className={`operator ${operator === '+' || activeKey === '+' ? 'button-active' : ''}`}>+</button>
      </div>
      <div className="row">
        <button onClick={() => handleClick('0')} aria-label="0" className="zero">0</button>
        <button onClick={() => handleClick('.')} aria-label="decimal">.</button>
        <button onClick={calculateResult} aria-label="equals" className={`operator ${activeKey === '=' ? 'button-active' : ''}`}>=</button>
      </div>
    </div>
  );
}

export default App;
