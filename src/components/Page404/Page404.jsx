import React from "react";

// React Router DOM
import { useNavigate } from "react-router-dom";

import useLoginState from "../../store/loginState";

const Page404 = () => {
  const navigate = useNavigate();
  const { loading } = useLoginState((state) => state);

  if (loading) {
    return;
  }

  return (
    <>
      <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-4 mb-8 dark:text-gray-400">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <a
              onClick={() => {
                navigate("/");
              }}
              className="px-5 py-2.5 font-semibold rounded bg-slate-300 cursor-pointer transition-all duration-200 ease-in-out hover:bg-slate-400 "
            >
              Back to homepage
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page404;
