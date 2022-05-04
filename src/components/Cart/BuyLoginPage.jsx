import React, { useEffect } from 'react';
import './CartStyles.scss';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../Auth/Login';
import { useState } from 'react';
import { useCart } from '../useCart';
import { useAuth } from '../useAuth';
import useApi from '../useApi';

const BuyLoginPage = () => {
  const navigate = useNavigate();

  const { PostRequest } = useApi();
  const { auth } = useAuth();
  const { order, setOrder, getStep } = useCart();

  const [showEmail, setShowEmail] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
  });

  useEffect(() => {
    if (getStep() < 1) navigate('/pirkti/krepselis', { replace: true });
  }, []);

  useEffect(() => {
    if (auth.user.isSet) {
      navigate('/pirkti/siuntimas', { replace: true });
    }
  }, [auth.user.isSet]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const body = JSON.stringify({ email: userInfo.email, temporary: true });

    const response = await PostRequest('checkmail', body, false);
    if (!response) return;

    order.user.email = userInfo.email;
    order.user.temporary = true;
    setOrder({ ...order });
    navigate('/pirkti/siuntimas', { replace: true });
  };

  return (
    <>
      <div className="label">Prisijungti</div>
      <div className="user-page">
        <div>
          <div className="label-2">Prisijungti</div>
          <Login />
        </div>
        <div>
          <div className="label-2">Neturite paskyros?</div>
          <div className="register-buttons">
            <Link
              to="/registruotis?ref=/pirkti/siuntimas"
              className="btn btn-dark w-full"
            >
              Registruotis
            </Link>
            <button
              type="button"
              className="btn btn-dark-reverse w-full"
              onClick={() => setShowEmail(!showEmail)}
            >
              Pirkti be registracijos
            </button>

            {showEmail && (
              <form
                className="form modal"
                onClick={() => setShowEmail(false)}
                onSubmit={handleSubmit}
              >
                <div
                  className="form-control card-style-1 p-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <label htmlFor="email">Elektroninis paštas</label>
                  <input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                    required
                  />
                  <input
                    type="submit"
                    className="btn btn-dark w-full mt-4"
                    value="Pirkti be registracijos"
                  />
                  <button
                    type="button"
                    className="btn btn-dark-reverse w-full mt-1"
                    onClick={() => setShowEmail(false)}
                  >
                    Atšaukti
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyLoginPage;
