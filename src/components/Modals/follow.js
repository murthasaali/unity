import React, { useEffect } from "react";

function Follow({ data, users, fun }) {
  console.log(users);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fun();
        console.log(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <button
        className="h-8 w-8 flex justify-center items-center rounded-full bg-slate-800"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        {data}
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box ">
          <h1 className="text-white">hello</h1>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h1 className="text-white">hello</h1>
          <h1 className="text-white">hello</h1>
          <div className="w-full  h-56   overflow-y-scroll  flex flex-col">
            {users &&
              users.map((item, index) => (
                <div className="text-white font-thin p-2 flex" key={index}>
                  <h1 className="text-white">hello</h1>
                  <div className="h-10 w-10 rounded-full bg-slate-700"></div>
                </div>
              ))}
          </div>
        </div>
      </dialog>
      {/* Button to trigger the function */}
    </div>
  );
}

export default Follow;
