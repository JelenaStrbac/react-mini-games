import { useState } from "react";

const useModal = () => {
  const [isShowingResultsModal, setIsShowingResultsModal] = useState(false);

  const toggleTwo = () => {
    setIsShowingResultsModal(!isShowingResultsModal);
  };

  return {
    isShowingResultsModal,
    toggleTwo,
  };
};

export default useModal;
