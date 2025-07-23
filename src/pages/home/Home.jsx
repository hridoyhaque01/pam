import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { netro } from "../../assets/getAssets";
import { cn } from "../../lib/utils";
import { auth } from "../../services/store";

function Home({ className = "" }) {
  const { institute } = auth || {};
  const ref = useRef();
  const onPrint = useReactToPrint({
    contentRef: ref,
    documentTitle: `student`,
    pageStyle: `@page {
            size: A4 landscape;
            @bottom-left {
              content: "PAGE #" counter(page);
              font-size: 0.5rem;
              color: #888;
            }`,
    onBeforePrint: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      });
    },
  });
  return (
    <div className="">
      <div className="py-8 px-4 pt-20">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Invoices</h2>
          <button
            className="px-4 py-3 bg-blue-500 text-white"
            onClick={onPrint}
          >
            Download
          </button>
        </div>
        <div className="relative" ref={ref}>
          <div>
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th>
                    <div className="h-24"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="w-full">
                    <div className="w-full">
                      <div className="h-24 bg-blue-100">hello world</div>
                      <table className="w-full !rounded-none">
                        <thead className="">
                          <tr className="">
                            <th className="border-l border-y !px-1 !py-1.5 !text-left !text-xxs text-text-700 font-semibold uppercase">
                              ID
                            </th>
                            <th className="border-y !px-1 !py-1.5 !text-left !text-xxs text-text-700 font-semibold uppercase">
                              Roll
                            </th>
                            <th className="border-y !px-1 !py-1.5 !text-left !text-xxs text-text-700 font-semibold uppercase">
                              Name
                            </th>
                            <th className="border-y !px-1 !py-1.5 !text-left !text-xxs text-text-700 font-semibold uppercase">
                              Father’s name
                            </th>
                            <th className="border-y !px-1 !py-1.5 !text-left !text-xxs text-text-700 font-semibold uppercase">
                              mother’s name
                            </th>
                            <th className="border-y !px-1 !py-1.5 !text-left !text-xxs text-text-700 font-semibold uppercase">
                              Religion
                            </th>
                            <th className="border-r border-y !px-1 !py-1.5 !text-left !text-xxs text-text-700 font-semibold uppercase">
                              mobile no
                            </th>
                          </tr>
                        </thead>
                        <tbody className="table_body">
                          {Array(20)
                            .fill(1)
                            ?.map((student, index) => (
                              <tr className="table_row" key={index}>
                                <td className="border-y border-l !px-1 !py-1.5 !text-left !text-xxs !text-text-700 !rounded-none">
                                  Lorem, ipsum dolor.
                                </td>
                                <td className="border-y !px-1 !py-1.5 !text-left !text-xxs !text-text-700">
                                  Lorem, ipsum dolor.
                                </td>
                                <td className="border-y !px-1 !py-1.5 !text-left !text-xxs !text-text-700">
                                  Lorem, ipsum dolor.
                                </td>
                                <td className="border-y !px-1 !py-1.5 !text-left !text-xxs !text-text-700">
                                  Lorem, ipsum dolor.
                                </td>
                                <td className="border-y !px-1 !py-1.5 !text-left !text-xxs !text-text-700">
                                  Lorem, ipsum dolor.
                                </td>
                                <td className="border-y !px-1 !py-1.5 !text-left !text-xxs !text-text-700">
                                  Lorem, ipsum dolor.
                                </td>
                                <td className="border-y  border-r !px-1 !py-1.5 !text-left !text-xxs !text-text-700">
                                  Lorem, ipsum dolor.
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>
                    <div className="h-8"></div>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="fixed top-0 left-0 w-full flex items-start justify-between pb-7 border-b border-neutral-200 ">
            <div>
              <img
                src={institute?.institute_image}
                alt="institute_image"
                className="w-14 h-14 rounded-full object-contain"
              />
            </div>
            <div className="text-center">
              <h2 className="text-sm text-text-900 font-semibold leading-[120%]">
                {institute?.institute_name}
              </h2>
              <div className="flex flex-col items-center gap-0.5  mt-1">
                <div className="text-[0.625rem] flex items-center gap-1.5 text-text-600">
                  {/* <LocationMarkerIcon
                      className="w-2.5 h-2.5"
                      color={colors.text[700]}
                    /> */}
                  {institute?.institute_address}
                </div>
                <div className="text-[0.625rem] flex items-center gap-1.5 text-text-600">
                  {/* <PhoneIcon
                      className="w-2.5 h-2.5"
                      color={colors.text[700]}
                    /> */}
                  {institute?.institute_mobilephone}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <img
                src={institute?.institute_image}
                alt="app logo"
                className="w-5 h-auto object-contain"
              />
              <span className="text-[0.5rem] font-bold text-text-900 leading-[104%]">
                SMART <br /> PATHSHALA
              </span>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 w-full pt-2.5 border-t border-neutral-200">
            <div
              className={cn(
                "w-full flex items-center justify-between",
                className
              )}
            >
              <p className="text-[0.5rem] text-text-600">
                © 2025{" "}
                <span className="text-text-700 font-bold">
                  Smart Institute Education Management Systems(SIEMS)
                </span>
              </p>
              <div className="flex flex-row items-center justify-end gap-3">
                <p className="text-[0.5rem] font-light text-text-700">
                  Developed by
                </p>
                <div className="h-3 bg-natural-500 w-[1px]" />
                <img src={netro} className="h-auto w-14 object-contain" />
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://tailwindcss.com/_next/static/media/cover.de1997f7.png"
              alt=""
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[220px] opacity-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
