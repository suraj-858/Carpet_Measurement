
import { useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(null)
  const [width, setwidth] = useState(null)
  const [price, setPrice] = useState(null)
  const [bestFitMedium, setBestFitMedium] = useState("");
  const [totalPrice, setTotalPrice] = useState(null);
  const [TotalCarpetRequired, setTotalCarpetRequired] = useState(null);
  const [carpetWaste, setCarpetWaste] = useState(null);
  const standardCarpetWidth = 6.5;


  const calculateFromLength = (length, width, standardCarpetWidth) => {

    const requiredCarpetStrips = length % standardCarpetWidth;

    if (requiredCarpetStrips > 0) {
      const quotient = Math.floor(length / standardCarpetWidth) + 1;
      const actualRequiredCarpet = (length / standardCarpetWidth) * width;
      const recordedCarpet = quotient * width;
      const actualCarpetWaste = recordedCarpet - actualRequiredCarpet
      setCarpetWaste(actualCarpetWaste);

      return recordedCarpet;
    }
    else {
      const quotient = length / standardCarpetWidth;
      const actualMeasurement = quotient * width;
      return actualMeasurement;
    }
  }


  const calculateEngine = (length, width, price, standardCarpetWidth) => {

    //calculating from length 
    const widthCalculation = calculateFromLength(length, width, standardCarpetWidth);

    //calculating from width
    const lengthCalculation = calculateFromLength(width, length, standardCarpetWidth);

    if (widthCalculation > lengthCalculation) {
      setTotalCarpetRequired(lengthCalculation.toFixed(2))
      const calculatedPrice = lengthCalculation / 3.28 * price;

      setTotalPrice(calculatedPrice.toFixed(2));
      setBestFitMedium("Length");
      const cropCarpet = (width / standardCarpetWidth) - Math.floor(width / standardCarpetWidth);
      console.log(cropCarpet);

      if (cropCarpet > 0) {
        const minimumWaste = (standardCarpetWidth ) - (cropCarpet * standardCarpetWidth );
        setCarpetWaste(minimumWaste.toFixed(2) )
      } else{
        setCarpetWaste(0);
      }

    }
    else {
      setTotalCarpetRequired(widthCalculation.toFixed(2))
      const calculatedPrice = widthCalculation/3.28 * price;
      setTotalPrice( calculatedPrice.toFixed(2));
      setBestFitMedium("Width");
      const cropCarpet = (length / standardCarpetWidth) - Math.floor(length / standardCarpetWidth);
      console.log(cropCarpet)
      if(cropCarpet > 0){
        const minimumWaste = (standardCarpetWidth  ) - (cropCarpet * standardCarpetWidth );
        setCarpetWaste(minimumWaste.toFixed(2))
      }else{
        setCarpetWaste(0)
      }
    }
  }
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <h1 className='mb-10 md:text-4xl text-2xl font-bold'>Carpet Master</h1>
      <div className=' w-[90%] md:w-[60%] sm:w-[80%] max-w-[900px] bg-gray-100 flex flex-col p-2  justify-center items-center flex-wrap min-h-[400px] mx-2'>
        <h2 className='mt-4 text-2xl'>Enter the Measurement</h2>
        <div className='md:block flex justify-center items-center flex-col mx-auto '>
          <input className='h-10 p-2 m-3 border-4 border-blue-400 rounded-md outline-blue-700' src='text' placeholder='Enter Length' onChange={e => {
            e.preventDefault();
            setLength(e.target.value)
          }} />
          <input className='h-10 p-2 m-3 border-4 border-blue-400 rounded-md outline-blue-700' src='text' placeholder='Enter Width' onChange={e => {
            e.preventDefault();
            setwidth(e.target.value)
          }} />
          <input className='h-10 p-2 m-3 border-4 border-blue-400 rounded-md outline-blue-700' src='text' placeholder='Enter Carpet Price' onChange={e => {
            e.preventDefault();
            setPrice(e.target.value)
          }} />
        </div>
        <button className='rounded-lg px-4 py-2 font-semibold text-white bg-blue-500 mx-auto' onClick={(e) => {
          e.preventDefault();
          calculateEngine(length, width, price, standardCarpetWidth)
        }}>Calculate</button>

        <hr className='h-[2px] my-3  w-full bg-red-600' />
        <div>
        </div>
        <div className='h-[200px] flex justify-center font-semibold flex-col md:items-center items-start pl-2 w-full bg-slate-200 rounded-md'>
          <h3>Total Amount:- {totalPrice ? "Rs " + totalPrice : ""} </h3>
          <h3>Total Length:- {TotalCarpetRequired ? TotalCarpetRequired + "ft or " + (TotalCarpetRequired / 3.28).toFixed(2) + " Mtr" : ""} </h3>
          <h3>Carpet Waste:- {carpetWaste ? carpetWaste + " ft" : "0 ft"}</h3>
          <h3 className=''>Installastion Recommended:- {bestFitMedium ? bestFitMedium + " Wise" : ""}</h3>

        </div>

      </div>
    </div>
  );
}

export default App;
