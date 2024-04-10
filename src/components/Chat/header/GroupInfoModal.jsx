import React from "react";

const GroupInfoModal = ({ showModal, setShowModal, groupMembers }) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-3 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-[1px_3px_11px_0px_rgba(247,242,247,1)] relative flex flex-col w-full bg-gray-900 text-white outline-none focus:outline-none transform scale-105">
                {/*header*/}
                <div className="flex items-start justify-between p-3 border-b border-solid border-gray-700 rounded-t">
                  <h3 className="text-2xl font-semibold">Group Members</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-white opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto max-h-72 overflow-y-auto">
                  {/* Set max height and allow overflow */}
                  {groupMembers.map((member) => (
                    <div
                      key={member._id}
                      className="flex items-center gap-x-4 mb-3"
                    >
                      <div
                        className={`relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden`}
                      >
                        <img
                          src={member.picture}
                          alt="picture"
                          className="w-full h-full object-cover "
                        />
                      </div>
                      <div className="w-full flex flex-col">
                        {/*Conversation name*/}
                        <h1 className="font-bold flex items-center gap-x-2">
                          {member.name}
                        </h1>
                      </div>
                    </div>
                  ))}
                </div>
                {/*footer*/}
                {/* <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          {/* Add shadow */}
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default GroupInfoModal;
