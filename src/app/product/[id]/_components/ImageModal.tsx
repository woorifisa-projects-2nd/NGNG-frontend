import React, { useEffect } from "react";
import Image from "next/image";
import ReactPlayer from "react-player";

type ImageModalProps = {
  showModal: boolean;
  closeModal: () => void;
  data: any; // Define the type of data if possible
  currentImageIndex: number;
  goToPreviousImage: () => void;
  goToNextImage: () => void;
};

const ImageModal: React.FC<ImageModalProps> = ({
  showModal,
  closeModal,
  data,
  currentImageIndex,
  goToPreviousImage,
  goToNextImage,
}) => {
  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showModal]);

  const handleCloseModal = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 p-16 flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={handleCloseModal}
        >
          <button
            onClick={handleCloseModal}
            className="absolute right-4 top-4 p-4 bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <svg
              className="h-6 w-6 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            className="max-w-screen-lg p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {data?.images[currentImageIndex]?.contentType === "IMAGE" ? (
              <img
                src={data?.images[currentImageIndex]?.imageURL}
                alt={`reportImage_${data?.images[currentImageIndex]?.id}`}
                className="h-dvh max-h-[80vh] max-w-[80vw]"
              />
            ) : (
              <ReactPlayer
                url={data?.images[currentImageIndex]?.imageURL}
                controls={true}
                width="100%"
                height="100vh"
              />
            )}

            <div
              className="absolute top-0 start-0 z-30 flex items-center justify-center h-1/4 mt-[35%] px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev
            >
              <span
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
                onClick={goToPreviousImage}
              >
                <svg
                  className="w-4 h-4 text-black dark:text-gray-800 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </div>

            <div
              className="absolute top-0 end-0 z-30 flex items-center justify-center h-1/4 mt-[35%] px-4 cursor-pointer group focus:outline-none"
              data-carousel-next
            >
              <span
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
                onClick={goToNextImage}
              >
                <svg
                  className="w-4 h-4 text-black dark:text-gray-800 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageModal;
