import React from 'react';
import amazonPay from"../../assets/images/Amazon_Pay_logo.svg.png"
import americanExpress from"../../assets/images/American Express.png"
import  masterCard from"../../assets/images/Mastercard-logo.png"
import payPal from"../../assets/images/PayPal.svg"
import appStore from"../../assets/images/download-on-the-app-store.svg"
import googlePlay from"../../assets/images/Google_Play_Store_badge_EN.svg"

const Footer = () => {
  return (
    <div className="bg-gray-100 py-10 px-6 md:px-20 mt-5">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Get the FreshCart app</h2>
          <p className="text-gray-500 mt-1 mb-4">
            We will send you a link, open it on your phone to download the app.
          </p>
          <form className="  flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="email"
              placeholder="Email .."
              className="flex-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
            >
              Share App Link
            </button>
          </form>
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-gray-600 font-medium">Payment Partners</span>
            <img src={amazonPay} alt="Amazon Pay" className="h-6" />
            <img src={americanExpress} alt="American Express" className="h-6" />
            <img src={masterCard} alt="MasterCard" className="h-6" />
            <img src={payPal} alt="PayPal" className="h-6" />
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-gray-600 font-medium">Get deliveries with FreshCart</span>
            <img src={appStore} alt="App Store" className="h-10" />
            <img src={googlePlay} alt="Google Play" className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
