import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

function Home() {
  const users = Array(26).fill(1);
  const ref = useRef();
  const onPrint = useReactToPrint({
    contentRef: ref,
    documentTitle: `student`,
    pageStyle: `@page {
          @bottom-left {
            content: "PAGE #" counter(page);
            font-size: 0.5rem;
            color: #888;
          }`,
    onBeforePrint: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 900);
      });
    },
  });

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Invoices</h2>
          <button
            className="px-4 py-3 bg-blue-500 text-white"
            onClick={onPrint}
          >
            Download
          </button>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div ref={ref}>
            <div className="">
              <div>hellow rold</div>
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th>
                      <div className="h-10"></div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="w-full">
                      <div className="w-full">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Client / Invoice
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Amount
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Issued / Due
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {users?.map((_, index) => (
                              <tr key={index}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <div className="flex">
                                    <div className="flex-shrink-0 w-10 h-10">
                                      <img
                                        className="w-full h-full rounded-full"
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                        alt=""
                                      />
                                    </div>
                                    <div className="ml-3">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        Molly Sanders
                                      </p>
                                      <p className="text-gray-600 whitespace-no-wrap">
                                        000004
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    $20,000
                                  </p>
                                  <p className="text-gray-600 whitespace-no-wrap">
                                    USD
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    Sept 28, 2019
                                  </p>
                                  <p className="text-gray-600 whitespace-no-wrap">
                                    Due in 3 days
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                    <span
                                      aria-hidden
                                      className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                    ></span>
                                    <span className="relative">Paid</span>
                                  </span>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                  <button
                                    type="button"
                                    className="inline-block text-gray-500 hover:text-gray-700"
                                  >
                                    <svg
                                      className="inline-block h-6 w-6 fill-current"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                                    </svg>
                                  </button>
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
                      <div className="h-10"></div>
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="fixed top-0 left-0 w-full">Im The Header</div>
            <div className="fixed bottom-0 left-0 w-full">Im The Footer</div>
            <div>
              <img
                src="https://tailwindcss.com/_next/static/media/cover.de1997f7.png"
                alt=""
                className="fixed top-1/2 left-1/2 w-full max-w-[220px] opacity-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
