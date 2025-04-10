  import React from "react";

  function Test1(props) {
    return (
      
  <div className="overflow-x-auto">
    <table className="table table-zebra">
      {/* head */}
      <thead>
        <tr>
          <th></th>
          <th>Prix Ht</th>
          <th>Prix TTC</th>
          <th>Rem.Max</th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        <tr>
          <th>Prix 1</th>
        <td><input type="text" placeholder="Extra Small" className="input input-xs" /></td> 
          <td><input type="text" placeholder="Extra Small" className="input input-xs" /></td>
          <td><input type="text" placeholder="Extra Small" className="input input-xs" /></td>
        </tr>
        {/* row 2 */}
        <tr>
          <th>prix2</th>
          <td><input type="text" placeholder="Extra Small" className="input input-xs" /></td>
          <td><input type="text" placeholder="Extra Small" className="input input-xs" /></td>
          <td><input type="text" placeholder="Extra Small" className="input input-xs" /></td>

        
        </tr>
        {/* row 3 */}
        <tr>
          <th>prix 3</th>
          <td><input type="text" placeholder="Extra Small" className="input input-xs" /></td>
          <td><input type="text" placeholder="Extra Small" className="input input-xs" /></td>
        
        </tr>
        {/* row 4 */}
        <tr>
          <th>prix 4</th>
          <td><input type="text" placeholder="Extra Small" className="input input-xs" /></td>
          <td><input type="text" placeholder="Extra Small" className="input input-xs" /></td>
          <td><input type="text" placeholder="Extra Small" className="input input-xs" /></td>

        
        </tr>
        {/* row 5 */}
        <tr>
          <th>prix 1 publique</th>
         
          
        </tr>
      </tbody>
    </table>
  </div>
      
    );
  }

  export default Test1;