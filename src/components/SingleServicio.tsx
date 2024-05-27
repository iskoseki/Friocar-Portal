import { useParams } from "react-router-dom";
import useServices, { Servicio } from "../hooks/useServices";
import Carrousel from "./Carrousel";
import Cta from "./Cta";
import { EffectCube, Pagination } from "swiper/modules";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import AnimateDiv from "./AnimateDiv";
interface Gallery {
  id: number;
  url: string;
}
export default function SingleServicio() {
  const { id } = useParams();
  const { data, error } = useServices();

  const serviceById = data?.find((x: Servicio) => x.id == Number(id));

  return (
    <>
      {serviceById ? (
        <section
          key={serviceById.id}
          className="text-gray-600 body-font overflow-hidden"
        >
          <section className="text-gray-600 body-font mt-12">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
              <div className="animate__animated animate__fadeInLeft lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                  {serviceById.title}
                </h1>
                <p className="mb-8 leading-relaxed">
                  {serviceById.description}
                </p>
                <div className="flex justify-center">
                  <a
                    target="_blank"
                    href="https://wa.me/5493417076172"
                    className="inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
                  >
                    Escribinos
                  </a>
                  <a
                    href="/servicios"
                    className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                  >
                    Más servicios
                  </a>
                </div>
              </div>

              <div className="animate__animated animate__fadeInRightBig lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                {serviceById && (
                  <img
                    alt="hero"
                    width={720}
                    height={600}
                    src={`${serviceById.cover}`}
                  />
                )}
              </div>
            </div>
          </section>
          <section className="text-gray-600 body-font">
            <AnimateDiv>
              <div className="container px-5 py-24 mx-auto flex flex-wrap">
                <div className="flex w-full mb-20 flex-wrap">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">
                    En nuestro taller
                  </h1>
                  <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">
                    {serviceById.secundaryDescription}
                  </p>
                </div>

                <div className="flex flex-wrap md:-m-2 -m-1">
                  {serviceById.gallery &&
                    serviceById.fotos.map(
                      (x: { id: number; url: string }, index: number) => {
                        let containerClass = "md:p-2 p-1 w-1/2";
                        if (index % 6 === 2) {
                          containerClass = "md:p-2 p-1 w-full";
                        }
                        return (
                          <div key={x.id} className={containerClass}>
                            <img
                              alt="gallery"
                              className="w-full object-cover h-full object-center block"
                              src={x.url}
                            />
                          </div>
                        );
                      }
                    )}
                </div>
              </div>
            </AnimateDiv>
          </section>
          <div className="text-center -mb-4">
            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
              Ver mas servicios 👇
            </h1>
          </div>
          <Carrousel />
          <Cta />
        </section>
      ) : (
        <p>Ocurrió un error al cargar el servicio. "Error: {error?.message}"</p>
      )}
    </>
  );
}
