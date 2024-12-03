import { useState } from "react";
const Feladatlista = () => {
  const [feladatok, setFeladatok] = useState([]);

  const [ujFeladat, setUjFeladat] = useState({ szoveg: "", kesz: false });
  const ujFeladatHozzaadasa = () => {
    setFeladatok([...feladatok, ujFeladat]);
  };



  return (
    <div className="text-center bg-red-600  min-h-screen font-bold">
      <input className="m-2  border-4 border-red-900"
        type="text" value={ujFeladat.szoveg}
        onChange={(e) => setUjFeladat({ ...ujFeladat, szoveg: e.target.value })}
      />
      <button className="bg-yellow-500 rounded mx-2 px-2"  onClick={ujFeladatHozzaadasa}>Feladat hozzáadása</button>
      <ul>
        {feladatok.map((feladat, index) => (
          <li className="border-4 border-red-900 max-w-2xl mb-4"  key={index}>{feladat.szoveg} {feladat.kesz ? "Kesz" : "Nem kesz"} <input value={feladat.kesz} onChange={(e) => setFeladatok(feladatok.map((f, i) => i === index ? { ...f, kesz: e.target.checked } : f))} type="checkbox" />  <button onClick={() => setFeladatok(feladatok.filter((_, i) => i !== index))}>Törlés</button></li>
        ))}
      </ul>
    </div>
  );
};

export default Feladatlista;
