
export const SelectFeladat = ({onValueChange}) => {
    return (
      <>
      <select className="ml-12 mr-2 border-4 border-gray-900 focus:outline-none text-black bg-gradient-to-r from-pink-600  to-indigo-600  font-medium rounded-lg text-bold " name="selectFeladat" id="selectFeladat" onChange={onValueChange}>
          <option value="all">Összes</option>
          <option value="ready">Kész</option>
          <option value="inProgress">Folyamatban</option>
      </select>
      </>
    )
  }
  