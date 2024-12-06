import { useEffect, useState } from "react";
import { SelectFeladat } from "./Select";

const Feladatlista = () => {
  const [feladatok, setFeladatok] = useState(
    localStorage.getItem("feladatok")
      ? JSON.parse(localStorage.getItem("feladatok"))
      : []
  );

  const [feladatokFilter, setFeladatokFilter] = useState("all");

  const filteredFeladatok = feladatok.filter((feladat) => {
    return (
      feladatokFilter === "all" ||
      (feladatokFilter === "ready" && feladat.kesz) ||
      (feladatokFilter === "inProgress" && !feladat.kesz)
    );
  });

  const onValueChange = (e) => {
    setFeladatokFilter(e.target.value);
  };

  const [ujFeladat, setUjFeladat] = useState({ szoveg: "", kesz: false });

  const ujFeladatHozzaadasa = () => {
    setFeladatok([...feladatok, ujFeladat]);
    setUjFeladat({ szoveg: "", kesz: false }); // Ürítjük az inputot
  };

  useEffect(() => {
    localStorage.setItem("feladatok", JSON.stringify(feladatok));
  }, [feladatok]);

  return (
    <>
      <div className="flex justify-center items-center text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
        <div className="">
          <div className="">
            <input
              className="h-12 font-bold text-1xl  shadow-xl border-4 border-gray-900"
              type="text"
              value={ujFeladat.szoveg}
              onChange={(e) =>
                setUjFeladat({ ...ujFeladat, szoveg: e.target.value })
              }
            />
            <SelectFeladat onValueChange={onValueChange} />
            <button
              className="m-6  border-4 border-gray-900 focus:outline-none text-black bg-gradient-to-r from-pink-600  to-indigo-600  font-medium rounded-lg text-bold px-5 py-2.5 me-2 mb-2 "
              onClick={ujFeladatHozzaadasa}
            >
              Feladat hozzáadása
            </button>
          </div>
          <div className="mx-auto align-center">
            <ul>
              {filteredFeladatok.map((feladat, index) => (
                <li
                  className="block max-w-sm p-6 bg-white border  border-gray-400 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-900  dark:border-gray-400 dark:hover:bg-gray-900"
                  key={index}
                >
                  <div className="text-white font-bold mb-1  text-2xl">
                    {feladat.szoveg}{" "}
                  </div>
                  <div className="text-sm text-gray-900 dark:text-white">
                    <div
                      className={`font-bold mb-1 text-2xl ${
                        feladat.kesz ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {feladat.kesz ? "Kész" : "Nem kész"}{" "}
                    </div>
                    <div>
                      <input
                        className="w-6 h-6 border-2 mb-3 border-blue-500 rounded-sm bg-white"
                        value={feladat.kesz}
                        onChange={(e) =>
                          setFeladatok(
                            feladatok.map((f, i) =>
                              i === index
                                ? { ...f, kesz: e.target.checked }
                                : f
                            )
                          )
                        }
                        checked={feladat.kesz}
                        type="checkbox"
                      />{" "}
                    </div>
                  </div>
                  <button
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() =>
                      setFeladatok(feladatok.filter((_, i) => i !== index))
                    }
                  >
                    Törlés
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feladatlista;
