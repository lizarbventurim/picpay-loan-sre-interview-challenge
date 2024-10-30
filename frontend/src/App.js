import React, { useState, useEffect } from 'react';

function App() {
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRate, setNewRate] = useState({ id: null, name: '', description: '', rate: '' });

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
    const method = newRate.id ? 'PUT' : 'POST';
    const url = newRate.id ? `http://localhost:8085/api/rates/${newRate.id}` : 'http://localhost:8085/api/rates';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRate),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsModalOpen(false);
        setNewRate({ id: null, name: '', description: '', rate: '' });
        tableData(); // Refresh the table data
      });
  };

  const handleEdit = (item) => {
    setNewRate(item);
    setIsModalOpen(true);
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.rate}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                </td>
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
            <h2>{newRate.id ? 'Edit Rate' : 'Add New Rate'}</h2>
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
              <button type="submit">{newRate.id ? 'Update' : 'Submit'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;