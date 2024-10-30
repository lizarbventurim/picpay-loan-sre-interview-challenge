import React, { useState, useEffect } from 'react';

function App() {
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRate, setNewRate] = useState({ name: '', description: '', rate: '' });

  const tableData = () => {
    fetch('http://localhost:8085/api/rates')
      .then((response) => response.json())
      .then((json) => {
        setList(json.data);
      });
  };

  useEffect(() => {
    tableData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRate({ ...newRate, [name]: name === 'rate' ? parseFloat(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8085/api/rates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRate),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsModalOpen(false);
        setNewRate({ name: '', description: '', rate: '' });
        tableData(); // Refresh the table data
      });
  };

  return (
    <div className="App">
      <div className="table-container">
        <h2>Rate List</h2>
        <button onClick={() => setIsModalOpen(true)}>Add New Rate</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <h2>Add New Rate</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={newRate.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  value={newRate.description}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Rate:
                <input
                  type="number"
                  step="0.01"
                  name="rate"
                  value={newRate.rate}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;