import { useEffect, useState, useRef } from 'react';

function App() {
  const [length, setLength] = useState('8');
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null); // Create a ref for the password input

  useEffect(() => {
    const passGenerator = () => {
      let char = '';
      let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let pass = '';
      numAllowed ? (str += '0123456789') : (str += '');
      charAllowed ? (str += '~!@#$%^&*()_') : (str += '');
      for (let i = 1; i <= length; i++) {
        char = Math.floor(Math.random() * str.length);
        pass += str.charAt(char);
      }
      setPassword(pass);
    };

    passGenerator();
  }, [length, numAllowed, charAllowed]);

  // Function to highlight the password
  const handleHighlight = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
    }
  };

  return (
    <>
      <div className='flex flex-wrap flex-col 
        py-3 px-2 bg-slate-50 rounded-xl 
        mt-10 space-y-7 items-center'>
        <h1 className='text-black font-bold'>Password Generator</h1>
        <div>
          <input
            type="text"
            ref={passwordRef} // Attach ref to the input
            className='rounded-l-lg bg-slate-100 px-2 py-2 text-slate-500'
            placeholder='Password'
            size={40}
            value={password}
            name='password'
            readOnly
            onClick={handleHighlight} // Call highlight function on click
          />
          <button
            className='bg-sky-400 px-2 py-2 rounded-r-lg'
            onClick={() => {
              navigator.clipboard.writeText(password).then(() => {
                alert('Password copied to clipboard!');
              }).catch(err => {
                console.error('Failed to copy text: ', err);
              });
            }}
          >
            Copy
          </button>
        </div>
        <div className='space-x-2'>
          <input
            type="range"
            value={length}
            min={6}
            max={40}
            onChange={(e) => setLength(e.target.value)}
            id='lengthAllowed'
          />
          <label htmlFor="lengthAllowed">Length({length})</label>
          
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            id='numberAllowed'
            onChange={() => setNumAllowed((prev) => !prev)}
          />
          <label htmlFor="numberAllowed">Number</label>
          
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id='charAllowed'
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="charAllowed">Character</label>
        </div>
      </div>
    </>
  );
}

export default App;
