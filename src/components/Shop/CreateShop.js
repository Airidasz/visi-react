import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import './Shop.scss';
import ShopMap from '../ShopMap';
import useApi from '../useApi';

const CreateShop = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [createLocations, setCreateLocations] = useState(false);
  const [shopID, setShopID] = useState(id);
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  const { PostRequest, PutRequest, GetRequest} = useApi();

  useEffect(() => {
    if (done) navigate('/shop/' + shopID);
  }, [done]);

  const createShop = async () => {
    const body = JSON.stringify({
      name: name,
      description: description,
    });

    const response = await PostRequest('shops', body);
    if(!response)
      return;

    const data = await response.json();

    setShopID(data.id);
    setCreateLocations(true);
  };

  const editShop = async () => {
    const body = JSON.stringify({
      name: name,
      description: description,
    });

    const response = await PutRequest(`shop/${id}`, body);
    if(!response)
      return;

    setCreateLocations(true);
  };

  useEffect(() => {
    const getShop = async () => {
      if(!id)
        return;

      const response = await GetRequest(`shop/${id}`);

      if(!response)
        return;

      const data = await response.json();

      if (data.userID != localStorage.getItem('userID')) navigate('/');

      setName(data.name);
      setDescription(data.description);
    };

    if (localStorage.getItem('userID') === null) navigate('/');
    getShop();
  }, []);

  useEffect(() => {
    if (!id) document.title = 'Kurti parduotuvę';
    else document.title = 'Redaguoti parduotuvę';
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!id) await createShop();
    else await editShop();
  };

  return (
    <div className="pageView">
      <div className="container" style={{ marginTop: '59px' }}>
        <div className="createShopGrid">
          <div>
            <form onSubmit={handleSubmit} className="form">
              <div className="formControl" style={{ marginTop: '0' }}>
                <label>Pavadinimas</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="formControl">
                <label>Aprašymas</label>

                <textarea
                  style={{ resize: 'vertical', minHeight: '120px' }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="formControl">
                <input
                  type="submit"
                  className="btn-dark"
                  value={!id ? 'Kurti parduotuvę': 'Koreguoti parduotuvę'}
                />
              </div>
            </form>
          </div>
          <div>
            <ShopMap
              id={shopID}
              createLocations={createLocations}
              setDone={setDone}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateShop;
