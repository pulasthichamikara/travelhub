import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { HiOutlineArrowLeft } from 'react-icons/hi2';

import { Link, useNavigate, useParams } from 'react-router-dom';
import FormWrapper from '../FormWrapper';
import Facilities from './Facilities';
import ImageUploader from './ImageUploader';
import useLoading from '../utils/useLoading';
import { countries } from '../../assests/constans';

export default function AddEditAccomadation() {
  const [LoadBul, setLoading] = useLoading();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const [perks, setperks] = useState([]);
  const [description, setDescription] = useState('');
  const [checkin, setCheckin] = useState('8 am');
  const [checkOut, setCheckOut] = useState('6 pm');
  const [maxGuests, setMaxGuests] = useState('');
  const [perPrice, setPerPrice] = useState('');
  const [rooms, setRooms] = useState('');
  const [bed, setBed] = useState('');
  const [bath, setBath] = useState('');

  const [country, setCountry] = useState('');
  const [uploaderdImgs, setUploaderdImgs] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      address,
      perks,
      description,
      checkin,
      checkOut,
      maxGuests,
      uploaderdImgs,
      perPrice,
      deletedImages,
      rooms,
      bed,
      bath,
      country,
    };
    if (id) {
      setLoading(true);
      await axios
        .put(`/location/${id}`, data)
        .then((res) => {
          setLoading(false);
          navigate('/account/accomadations/');
        })
        .catch((err) => {
          setLoading(false);
          console.log('err', err);
        });
    } else {
      await axios
        .post('/location', data)
        .then((res) => {
          navigate('/account/accomadations/');
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`/location/${id}`)
        .then((response) => {
          const { location } = response.data;
          setName(location.name);
          setAddress(location.address);
          setperks(location.perks);
          setDescription(location.description);
          setCheckin(location.checkin);
          setCheckOut(location.checkOut);
          setMaxGuests(location.maxGuests);
          setUploaderdImgs(location.images);
          setPerPrice(location.perPrice);
          setCountry(location.country);
          setRooms(location.rooms);
          setBed(location.bed);
          setBath(location.bath);

          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [id, setLoading]);

  return (
    <div className="container">
      <LoadBul />
      <div className="flex w-full justify-between mt-4 border-b pb-4">
        <Link to="/account/accomadations/">
          <div className="btn inline-flex btn-primary ">
            <div className="flex justify-center items-center gap-4 ">
              <HiOutlineArrowLeft className="bg-white rounded-full p1 text-black " />
              Accomadations
            </div>
          </div>
        </Link>
        <h2 className="text-2xl">Add Accomadation</h2>
        <div></div>
      </div>

      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <div className="formgroup">
            <label>Title</label>
            <input
              type="text"
              placeholder="title, for example: my lovely apartment"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="formgroup">
            <label>Address</label>
            <input
              type="text"
              placeholder="address of the accomadation"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="formgroup">
            <label>Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* image uploader */}
          <ImageUploader
            uploaderdImgs={uploaderdImgs}
            deletedImages={deletedImages}
            setUploaderdImgs={setUploaderdImgs}
            setDeletedImages={setDeletedImages}
          />

          {/* description */}
          <div className="formgroup">
            <textarea
              className="rounded h-40"
              placeholder="Say somthing about accomadeation"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/*   <RichText
              description={description}
              setDescription={setDescription}
              className="border border-2 px-3 py-2 rounded-full w-full border-gray-300"
            /> */}
          </div>

          <Facilities onChange={setperks} perks={perks} />

          <div className="formgroup grid grid-cols-2 gap-4">
            <div>
              <label>Chek in time </label>
              <input
                type="text"
                placeholder="4.53"
                value={checkin}
                onChange={(e) => setCheckin(e.target.value)}
              />
            </div>
            <div>
              <label>Chek out time </label>
              <input
                type="text"
                placeholder="4.53"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div>
              <label>Max number of guests </label>
              <input
                type="number"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
              />
            </div>
            <div>
              <label>Price per person </label>
              <input
                type="number"
                value={perPrice}
                onChange={(e) => setPerPrice(e.target.value)}
              />
            </div>
            <div>
              <label>Rooms </label>
              <input
                type="number"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
              />
            </div>
            <div>
              <label>Beds </label>
              <input
                type="number"
                value={bed}
                onChange={(e) => setBed(e.target.value)}
              />
            </div>
            <div>
              <label>Bath </label>
              <input
                type="number"
                value={bath}
                onChange={(e) => setBath(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full my-4">
            Submit
          </button>
        </form>
      </FormWrapper>
    </div>
  );
}
