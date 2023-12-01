import React, { Fragment, useState } from "react";
import Styles from "./ShippingPage.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ShippingInfoType } from "../../redux/cart/cart";
import { Country, State } from "country-state-city";
import { BiSolidLock } from "react-icons/bi";
import { FaAddressCard } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { FaCity } from "react-icons/fa";
import { TbMapPinCode } from "react-icons/tb";
import { FaMapLocation } from "react-icons/fa6";

export default function ShippingPage() {
  const { isAuthenticated, loading } = useSelector((state: RootState) => {
    return state.login;
  });

  const { shippingInfo } = useSelector((state: RootState) => state.cart);

  const [state, setState] = useState(shippingInfo.state);
  const [city, setCity] = useState(shippingInfo.city);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [address, setAddress] = useState(shippingInfo.address);
  const [country, setCountry] = useState(shippingInfo.country);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("submited");
  };
  return (
    <Fragment>
      {isAuthenticated ? (
        <div className={Styles.container}>
          <div className={Styles.containerCard}>
            <h1>Form </h1>
            <form className={Styles.formCard} onSubmit={onSubmit}>
              <div>
                <FaAddressCard size={"1.5vmax"} />
                <input
                  required
                  type="input"
                  value={address}
                  placeholder="Address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <FaPhone size={"1.5vmax"} />
                <input
                  type="input"
                  required
                  value={phoneNo}
                  placeholder={"Phone Number"}
                  onChange={(e) => {
                    setPhoneNo(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <FaCity size={"1.5vmax"} />
                <input
                  required
                  type="input"
                  value={city}
                  placeholder={"City"}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <TbMapPinCode size={"1.5vmax"} />
                <input
                  required
                  type="input"
                  value={pinCode}
                  placeholder={"Pin Code"}
                  onChange={(e) => {
                    setPinCode(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <FaMapLocation size={"1.5vmax"} />
                <select
                  required
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setState("");
                  }}
                >
                  <option value={""}>Country</option>
                  {Country &&
                    Country.getAllCountries().map((item) => {
                      return (
                        <option value={item.isoCode} key={item.isoCode}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>

              {country && (
                <div>
                  <FaMapLocation size={"1.5vmax"} />
                  <select
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value={""}>State</option>
                    {State &&
                      State.getStatesOfCountry(country).map((item) => {
                        return (
                          <option value={item.isoCode} key={item.isoCode}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              )}

              <button>Submit</button>
            </form>
          </div>
        </div>
      ) : (
        <>Redirect to login</>
      )}
    </Fragment>
  );
}
