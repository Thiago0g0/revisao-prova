import React, { useState } from 'react';

const Buscar = () => {
    const [cep, setCep] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCep = () => {
        setLoading(true);
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Cep ');
                }
                return response.json();
            })
            .then(data => {
                setCep(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    const handleChange = (event) => {
        setCep(event.target.value);
    };

    return (
        <div id="buscar">
            <h1>Buscar Endereço</h1>
            <label htmlFor="cep">Incira o CEP:</label>
            <input className='pesquisa'
                type="text"
                id="cep"
                value={cep}
                onChange={handleChange}
            />
            <button className="button" onClick={fetchCep}>Buscar</button>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}

            {cep && (
                <div className='cep'>
                    <p>CEP: {cep.cep}</p>
                    <p>Logradouro: {cep.logradouro}</p>
                    <p>Bairro: {cep.bairro}</p>
                    <p>Cidade: {cep.localidade}</p>
                    <p>Estado: {cep.uf}</p>
                </div>
            )}
        </div>
    );
};

export default Buscar;
