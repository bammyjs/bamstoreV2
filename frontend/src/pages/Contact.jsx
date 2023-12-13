import React from "react";
import BreadCrumb from "../componets/BreadCrumb";
import { Meta } from "../componets/Meta";
// import { TEInput, TERipple } from "tw-elements-react";

function Contact() {
  return (
    <>
      <Meta title={"Contact Us"} />
      <section className="flex flex-col gap-6 items-center  md:mt-24">
        <BreadCrumb title="Contact Us" />
        <h3 className="text-dark text-center text-lg md:text-3xl md:my-10  font-bold">
          Contact Us
        </h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.913911960699!2d5.1871185758496665!3d7.250638364284851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10478f9c061d7827%3A0xc550ed134a7985a1!2sST%20THOMAS&#39;%20ANGLICAN%20CHURCH%2C%20340110%2C%20Akure%2C%20Ondo!5e0!3m2!1sen!2sng!4v1693995367901!5m2!1sen!2sng"
          width="100%"
          height="450"
          className="bordered max-w-7xl"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          frameborder="0"
        ></iframe>

        <div className="flex container max-w-7xl justify-center items-center ">
          {/* <!-- COMPONENT CODE --> */}
          <div className="container text-base-100 mx-auto my-4 px-4 lg:px-20">
            <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
              <div className="flex">
                <h1 className="font-bold uppercase text-3xl md:text-4xl">
                  Reach Support
                </h1>
              </div>
              <form className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                <input
                  className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  type="text"
                  placeholder="First Name*"
                />
                <input
                  className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  type="text"
                  placeholder="Last Name*"
                />
                <input
                  className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  type="email"
                  placeholder="Email*"
                />
                <input
                  className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  type="number"
                  placeholder="Phone*"
                />
                <textarea
                  placeholder="Message*"
                  className="w-full h-32 md:col-span-2 rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                ></textarea>
                <button type="button" className="btn btn-primary">
                  Send
                </button>
              </form>
              <div className="my-4"></div>
            </div>

            <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-pry-color rounded-2xl">
              <div className="flex flex-col text-white">
                <h1 className="font-bold uppercase text-4xl my-4">
                  Drop in our office
                </h1>
                <p className="text-gray-bk">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam tincidunt arcu diam, eu feugiat felis fermentum id.
                  Curabitur vitae nibh viverra, auctor turpis sed, scelerisque
                  ex.
                </p>

                <div className="flex my-4 w-2/3 lg:w-1/2">
                  <div className="flex flex-col">
                    <i className="fas fa-map-marker-alt pt-2 pr-2" />
                  </div>
                  <div className="flex flex-col ">
                    <h2 className="text-2xl font-bold">Main Office</h2>
                    <p className="text-gray-bk">
                      No. 12 Car Street Junction, Arakale, Akure, Ondo State,
                      Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex my-4 w-2/3 lg:w-1/2">
                  <div className="flex flex-col font-bold">
                    <i className="fas fa-phone-alt pt-2 pr-2" />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-bold">Call Us</h2>
                    <p className="text-gray-bk">Tel: +234 9063897173</p>
                    <p className="text-gray-bk">E-Mail: Support@bamstore.ng</p>
                  </div>
                </div>

                <div className="flex my-4 w-2/3 lg:w-1/2">
                  <a
                    href="https://www.facebook.com/ENLIGHTENEERING/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1"
                  >
                    <i className="fab fa-facebook-f text-blue-900" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/enlighteneering-inc-"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1"
                  >
                    <i className="fab fa-linkedin-in text-blue-900" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- COMPONENT CODE --> */}
        </div>
      </section>
    </>
  );
}

export default Contact;
