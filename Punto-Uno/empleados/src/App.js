import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';

const EmpleadosTable = ({ empleados, startIndex }) => {
  return (
    <Table striped bordered hover variant="light" responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Identificación</th>
          <th>Nombres</th>
          <th>Fecha de Nacimiento</th>
          <th>Tiempo Contrato</th>
          <th>Valor Contrato</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {empleados.map((empleado, index) => (
          <tr key={index}>
            <td>{startIndex + index + 1}</td>
            <td>{empleado.identificacion}</td>
            <td>{empleado.nombres}</td>
            <td>{empleado.fecha_nacimiento}</td>
            <td>
              <ProgressBar now={empleado.tiempo_contrato} label={`${empleado.tiempo_contrato}%`} />
            </td>
            <td>{empleado.valor_contrato}</td>
            <td>
              {empleado.estado ? (
                <span className="badge bg-success text-white">Activo</span>
              ) : (
                <span className="badge bg-danger text-white">Inactivo</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://89.116.25.43:3500/api/empleados/listar');
        const data = await response.json();

        if (data && data.result) {
          setEmpleados(data.result);
        }
      } catch (error) {
        console.error('Error al obtener los empleados:', error);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  const itemsPerPage = 10;
  const pageCount = Math.ceil(empleados.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEmpleados = empleados.slice(startIndex, endIndex);

  return (
    <div className="container">
      <div className="text-center my-4">
        <EmpleadosTable empleados={paginatedEmpleados} startIndex={startIndex} />
      </div>

      <ReactPaginate
        previousLabel={'Anterior'}
        nextLabel={'Siguiente'}
        breakLabel={'...'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link bg-success text-white'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link bg-success text-white'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link bg-success text-white'}
        activeClassName={'active'}
        activeLinkClassName={'bg-success'}
      />
    </div>
  );
};

export default App;