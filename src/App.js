import './App.css';
import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { SketchPicker } from 'react-color';

function App() {
  const [penColor, setPenColor] = useState('black');
  const [open, setOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const sigCanvas = useRef();

  const clear = () => {
    sigCanvas.current.clear();
  };

  const save = () => {
    setImgUrl(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
  };

  return (
    <div className="w-full max-w-xs md:max-w-md lg:max-w-lg mx-auto flex flex-col items-center justify-center p-4">
      <h1 className="text-xl md:text-2xl lg:text-3xl my-2 text-zinc-600 font-semibold text-center">
        E-signer
      </h1>
      <div className="border-2 m-2 w-full">
        <div className="border-2 m-2 w-full">
          <SignatureCanvas
            ref={sigCanvas}
            penColor={penColor}
            canvasProps={{
              width: window.innerWidth < 768 ? window.innerWidth - 40 : 500,
              height: 200,
              className: 'sigCanvas',
            }}
          />
        </div>
        <div className="flex justify-center space-x-2">
          <button onClick={clear} className="m-2 p-1 px-4 border-2 border-red-400 hover:bg-red-400 hover:text-white rounded-lg">
            Clear
          </button>
          <button onClick={save} className="m-2 p-1 px-4 border-2 border-green-400 hover:bg-green-400 hover:text-white rounded-lg">
            Save
          </button>
        </div>
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="m-2 px-4 py-2 border-2 border-blue-400 hover:bg-blue-400 hover:text-white rounded-lg"
      >
        Select color
      </button>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center justify-center p-2 w-full">
          <SketchPicker
            color={penColor}
            onChange={(color) => setPenColor(color.hex)}
          />
          <button
            onClick={() => setOpen(false)}
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg"
          >
            Ok
          </button>
        </div>
      </div>
      {imgUrl.length > 0 && (
        <div className="border-2 p-2 m-2 flex flex-col items-center justify-center w-full">
          <img src={imgUrl} alt="signature" className="m-4 border-2 p-2 max-w-full" />
          <div className="flex space-x-2">
            <a
              href={imgUrl}
              download
              className="m-2 border-2 p-1 hover:bg-gray-600 hover:text-white rounded-lg"
            >
              Download
            </a>
            <button className="m-2 border-2 p-1 hover:bg-gray-600 hover:text-white rounded-lg" onClick={() => setImgUrl('')}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
